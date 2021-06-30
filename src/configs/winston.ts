import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';
import { moment as momentObj, Moment } from '.';


// logs 디렉토리 하위에 로그파일을 저장
const logDir = 'logs';
const { combine, printf } = winston.format;


/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */


class logger_base {
	public static readonly MAX_FILES_SIZE: number = 1024 * 1024 * 1024; // 100MB
	public static readonly MAX_NUM_FILES: number = 100; // 로그파일 최대 100개
	public static readonly LOG_DIR: string = 'logs';
	public static readonly PRJ_ROOT_PATH: string = path.join(__dirname, '..');
	// 파일 이름만 출력할 경우 false, 경로까지 출력할 경우 true
	public static readonly USE_RELATIVE_PATH: boolean = true;
	
	
	private readonly writer: winston.Logger;
	private readonly moment: Moment = momentObj;
	private logFormat: any;
	
	
	constructor(){
		if (!fs.existsSync(logger_base.LOG_DIR)){
			this.makeLoggerFolder();
		}
		
		this.writer = this.getLogger();
	}
	
	private makeLoggerFolder(){
		fs.mkdirSync(logger_base.LOG_DIR);
	}
	
	private getLogger(){
		if (this.writer != undefined)
			return this.writer;
		
		this.setLogFormat();
		

		
		const logger = winston.createLogger({
			format: combine(this.logFormat),
			transports: [
				// info 레벨 로그를 저장할 파일 선택
				new winstonDaily({
					level: 'info',
					dirname: logger_base.LOG_DIR,
					filename: '%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxFiles: '1d'
				}),
				// error 레벨 로그를 저장할 파일 선택
				new winstonDaily({
					level: 'error',
					dirname: path.join(logger_base.LOG_DIR, 'error'),
					filename: '%DATE%.error.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true,
					maxFiles: '1d'
				}),
			]
		});
		
		// Production 환경이 아닌 경우
		if (process.env.NODE_ENV !== 'production'){
			// 콘솔로 바로 출력하도록 지정.
			logger.add(new winston.transports.Console({
				format: combine(
					winston.format.colorize(), // 색깔 넣어서 출력
					winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
				)
			}))
		};
		
		return logger;
	}
	
	private setLogFormat(){
		this.logFormat = printf(info => {
			return `${this.getTimeStamp()} ${info.level} ${info.message}`;
		});
	}
	
	private getTimeStamp(): string {
		return this.moment.getTimeStamp();
	}
	
	
	public info(...args: any[]){
		const logString: string = this.getLogString(args);
		const finalMessage: string = this.createFinalMessage(logString);
		this.writer.info(finalMessage);
	}
	public error(...args: any[]){
		const logString: string = this.getLogString(args);
		const finalMessage: string = this.createFinalMessage(logString);
		this.writer.error(finalMessage);
	}
	public debug(...args: any[]){
		const logString: string = this.getLogString(args);
		const finalMessage: string = this.createFinalMessage(logString);
		this.writer.debug(finalMessage);
	}
	
	private getLogString(args: any[]): string{
		let resultStr: string = '';
		
		for(let i = 0; i < args.length; i++){
			// args[i]가 객체 타입인 경우
			if (typeof(args[i]) === 'object'){
				resultStr += JSON.stringify(args[i]) + '\t';
			}
			else{
				resultStr += args[i] + '\t';
			}
		}
		
		return resultStr;
	}
	
	private createFinalMessage(message: string){
		let stackInfo = this.getStackInfo(1);
		
		let filenameInfo: string;
		if (logger_base.USE_RELATIVE_PATH)
			filenameInfo = stackInfo?.relativePath as string;
		else
			filenameInfo = stackInfo?.file as string;
			
		let finalMessage: string = `[${filenameInfo}:${stackInfo?.line}] ${message}`;
		
		return finalMessage;
	}
	
	
	private getStackInfo(stackIndex: number){
		// get call stack, and analyze it
		// get all file, method, and line numbers
		let stackList = (new Error(undefined)).stack?.split('\n').slice(3);
		
		// stack trace format
		// http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
		// do not remove the regex expresses to outside of this method (due to a BUG in node.js)
		let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
		let stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;
		
		let s = stackList?.[stackIndex] || stackList?.[0];
		if (s === undefined){
			throw new Error();
		}
		s = s.toString();
		let sp = stackReg.exec(s) || stackReg2.exec(s);
		
		if (sp && sp.length === 5){
			return {
				method: sp[1],
				relativePath: path.relative(logger_base.PRJ_ROOT_PATH, sp[2]),
				line: sp[3],
				pos: sp[4],
				file: path.basename(sp[2]),
				stack: stackList?.join('\n')
			}
		}
	}
}

const loggerBase: logger_base = new logger_base();

export default loggerBase;
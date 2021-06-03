import {createLogger, format, transports, info} from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';
import Moment from './Moment';


const moment = new Moment();

// logs 디렉토리 하위에 로그파일을 저장
const logDir = 'logs';
const { combine, printf } = format;


// Define log format
const logFormat = printf(info => {
	return `${moment.getTimeStamp()} ${info.level} ${info.message}`;
});


// 로그 정보를 저장할 파일 설정



/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
if (!fs.existsSync(logDir)){
	fs.mkdirSync(logDir);
}


const logger = createLogger({
	format: combine(logFormat),
	transports: [
		// info 레벨 로그를 저장할 파일 선택
		new winstonDaily({
			level: 'info',
			dirname: logDir,
			filename: '%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxFiles: '7d'
		}),
		// error 레벨 로그를 저장할 파일 선택
		new winstonDaily({
			level: 'error',
			dirname: path.join(logDir, 'error'),
			filename: '%DATE%.error.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxFiles: '7d'
		}),
		
	]
});


// Production 환경이 아닌 경우
if (process.env.NODE_ENV !== 'production'){
	logger.add(new transports.Console({
		format: combine(
			format.colorize(), // 색깔 넣어서 출력
			format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
		)
	}))
}

export default logger;
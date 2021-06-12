import express, { Request, Response, NextFunction } from "express";
import { logger, passportConfig } from "./configs";
import { homeRouter, postRouter, userRouter } from "./routes";
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';

class App {
	private app: express.Application;
	
	constructor(){
		this.app = express();
		this.setMiddleWares();
		this.setRouter();
		this.setErrorHandler();
		
	}
	
	private setMiddleWares(){
		// view 관련
		this.app.set('views', path.join(__dirname, 'views'));
		this.app.set('view engine', 'ejs'); 
		this.app.use(expressEjsLayouts);
		this.app.set('layout', 'layouts/layout');
		this.app.set("layout extractScripts", true);
		this.app.set("layout extractStyles", true);
		
		// bodyparser 세팅
		this.app.use(express.json());
		this.app.use(express.urlencoded({extended: true}));
		
		// methodOverride 설정
		this.app.use(methodOverride('_method'));
		
		// session 설정
		this.app.use(session({secret:'MySecret', resave:false, saveUninitialized:true}));
		
		// passport 설정.
		passportConfig.init();
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		
		this.app.use((req, res, next) => {
			res.locals.isAuthenticated = req.isAuthenticated(); 
			res.locals.currentUser = req.user;
			next();
		})
	}
	
	private setRouter() {
		this.app.use('/', homeRouter);
		this.app.use('/post', postRouter);
		this.app.use('/user', userRouter);
	}
	
	private setErrorHandler(){
		/* Error Handling */
		this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
			err.status = err.status || 500;
			
			logger.error(`error on request ${req.method} | ${req.url} | ${err.status}`);
			logger.error(err.stack || `${err.message}`);
			
			err.message = err.status == 500 ? 'Something bad happened.' : err.message;
			res.status(err.status).send(err.message);
		})
	}
	
	public getApplication(): express.Application{
		return this.app;
	}
}


export default App;
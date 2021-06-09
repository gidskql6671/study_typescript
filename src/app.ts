import express, { Request, Response, NextFunction } from "express";
import { logger } from "./configs";
import { homeRouter, postRouter } from "./routes";

class App {
	private app: express.Application;
	
	constructor(){
		this.app = express();
		this.router();
		this.setErrorHandler();
		
	}
	
	private router(): void {
		this.app.use('/', homeRouter);
		this.app.use('/post', postRouter);
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
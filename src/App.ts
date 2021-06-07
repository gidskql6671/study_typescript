import express, { Request, Response } from "express";
import { logger } from "./configs";
import { homeRouter, boardRouter } from "./routes";

class App {
	private app: express.Application;
	
	constructor(){
		this.app = express();
		this.router();
		
		/* Error Handling */
		this.app.use((err: any, req: Request, res: Response) => {
			err.status = err.status || 500;
			
			logger.error(`error on request ${req.method} | ${req.url} | ${err.status}`);
			logger.error(err.stack || `${err.message}`);
			
			err.message = err.status == 500 ? 'Something bad happened.' : err.message;
			res.status(err.status).send(err.message);
		})
	}
	
	private router(): void {
		this.app.use('/', homeRouter);
		this.app.use('/board', homeRouter);
	}
	
	public getApplication(): express.Application{
		return this.app;
	}
}


export default App;
import express, { Request, Response } from "express";

class App {
	private application: express.Application;
	
	constructor(){
		this.application = express();
		this.router();
	}
	
	public getApplication(): express.Application{
		return this.application;
	}
	
	private router(): void {
		this.application.get('/', (req: Request, res: Response) => {
			res.send("start");
		})
	}
}


export default App;
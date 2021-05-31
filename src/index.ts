import express, { Request, Response } from "express";

class App {
	private application: express.Application;
	
	constructor(){
		this.application = express();
	}
	
	public getApplication(): express.Application{
		return this.application;
	}
}

const app = new App().getApplication();

app.get("/", (req: Request, res: Response) => {
	res.send("start");
})

app.listen(80, () => console.log("start"));
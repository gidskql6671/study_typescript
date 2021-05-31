import express, { Request, Response } from "express";

class App {
	public application: express.Application;
	
	constructor(){
		this.application = express();
	}
}

const app = new App().application;

app.get("/", (req: Request, res: Response) => {
	res.send("start");
})

app.listen(80, () => console.log("start"));
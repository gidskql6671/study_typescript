import App from './App';
import { logger } from './configs';
import { getDbLink, getServerPort } from "./properties";
import mongoose from 'mongoose';


const app = new App().getApplication();
const port: number = getServerPort();
const dbLink: string = getDbLink();


mongoose.connect(dbLink, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
.then(() => {
	app.listen(port, () => {
		logger.info(`Server listening on Port ${port}`);
	});
})
.catch(err => logger.error(err));

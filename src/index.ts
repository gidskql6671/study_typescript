import App from './App';
import logger from './config/winston';


const app = new App().getApplication();
const port: number = 80;

app.listen(port, () => {
	logger.info(`Server listening on Port ${port}`);
	
	
});
import App from './App';
import logger from './config/Winston';


const app = new App().getApplication();
const port: number = 80;

app.listen(port, () => {
	logger.info(`Server listening on Port ${port}`);
	
	
});
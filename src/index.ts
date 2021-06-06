import App from './App';
import { Moment, MomentImpl} from './config/Moment';
import logger from './config/winston';


const app = new App().getApplication();
const port: number = 80;
const moment: Moment = new MomentImpl('YYYY-MM-DD HH:mm:ss');

app.listen(port, () => {
	logger.info(`Server listening on Port ${port}`);
	
	
});
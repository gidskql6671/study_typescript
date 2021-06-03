import App from './App';
import Moment from './config/Moment';

const app = new App().getApplication();
const port = 80;
const moment = new Moment();

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	console.log(`Current : ${moment.getTimeStamp()}`);
});
import moment from 'moment';
import 'moment-timezone';


interface Moment {
	getTimeStamp(): string;
}

class MomentImpl implements Moment{
	constructor(){
		moment.tz.setDefault('Asia/Seoul');
	}
	
	getTimeStamp(): string{
		return moment().format('YYYY-MM-DD HH:mm:ss');
	}
}

export default MomentImpl;
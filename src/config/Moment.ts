import moment from 'moment';
import 'moment-timezone';


interface Moment {
	getTimestamp(): string;
}

class MomentImpl implements Moment{
	constructor(){
		moment.tz.setDefault('Asia/Seoul');
	}
	
	getTimestamp(): string{
		return moment().format('YYYY-MM-DD HH:mm:ss');
	}
}

export default MomentImpl;
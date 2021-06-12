import moment from 'moment';
import 'moment-timezone';


interface Moment {
	getTimeStamp(): string;
}

class MomentImpl implements Moment{
	private outFormat: string;
	
	constructor(format: string){
		moment.tz.setDefault('Asia/Seoul');
		this.outFormat = format;
	}
	
	getTimeStamp(): string{
		return moment().format(this.outFormat);
	}
}

const momentImpl: Moment = new MomentImpl('YYYY-MM-DD HH:mm:ss')


export { momentImpl as moment, Moment };
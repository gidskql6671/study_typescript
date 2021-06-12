import mongoose, { Schema, Model } from "mongoose";
import { moment } from '../configs';


interface IUser {
	id: string;
	password: string;
	name: string;
	nickname: string;
	email: string;
	reg_dt: string;
}

interface IUserDoc extends IUser, Document {
	
}

const userSchema :Schema = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	nickname: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String
	},
	reg_dt: {
		type: String,
		default: moment.getTimeStamp()
	}
}, {
	versionKey: false
});


const User = mongoose.model<IUserDoc>('tsStudyUser', userSchema);

export {User, IUser};
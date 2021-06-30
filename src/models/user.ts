import mongoose, { Schema, Model } from "mongoose";
import bcrypt from 'bcrypt';
import { moment } from '../configs';


interface IUser {
	id: string;
	password: string;
	name?: string;
	nickname: string;
	email?: string;
	reg_dt?: string;
}

interface IUserDoc extends IUser, Document {
	validPassword: (password: string) => Promise<boolean>
}

const userSchema :Schema<IUserDoc> = new Schema({
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

userSchema.methods.validPassword = function(pw) {
	return bcrypt.compareSync(pw, this.password);
}

userSchema.pre("save", function(next) {
	const user = this;
	
	if (user.isModified("password")){
		bcrypt.genSalt(10)
		.then(salt => bcrypt.hash(user.password, salt))
		.then(hash => {
			user.password = hash;
			next();
		})
		.catch(err => next(err));
	}
	else{
		next();
	}
})

const User = mongoose.model<IUserDoc>('tsStudyUser', userSchema);

export {User, IUser};
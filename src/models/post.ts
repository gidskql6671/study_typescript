import mongoose, { Schema, Model } from "mongoose";
import autoIncrement from 'mongoose-auto-increment';
import { moment } from '../configs';

autoIncrement.initialize(mongoose.connection);


interface IPost {
	title: string;
	content: string;
	tags: string[];
	view_count: number;
	reg_id: string;
	reg_name: string;
	reg_dt: string;
}

interface IPostDoc extends IPost, Document {
	
}

const postSchema :Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true
	},
	tags: [String],
	view_count: {
		type: Number,
		required: true,
		default: 0
	},
	reg_id: {
		type: String,
		required: true
	},
	reg_name: {
		type: String,
		required: true
	},
	reg_dt: {
		type: String,
		default: moment.getTimeStamp()
	}
}, {
	versionKey: false
});

postSchema.plugin(autoIncrement.plugin, {
	model: 'tsStudyPost',
	field: 'id'
});

const Post = mongoose.model<IPostDoc>('tsStudyPost', postSchema);

export {Post, IPost};
import mongoose, { Schema, Model } from "mongoose";
import autoIncrement from 'mongoose-auto-increment';

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

const postSchema :Schem = new Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
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
		type: String
	}
}, {
	versionKey: false
});

postSchema.plugin(autoIncrement.plugin, {
	model: 'tsStudyPost',
	filed: 'id',
	startAt: 1,
	increment: 1
});

const Post = mongoose.model<IPostDoc>('tsStudyPost', postSchema);

export {Post, IPost};
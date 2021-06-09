import { Post, IPost } from '../models';
import { moment } from '../configs';


const createPost = ( post_info ) => {
	return new Promise((resolve, reject) => {
		post_info.tags = post_info.tags.split(',').map(item => item.trim());
		
		const newPost = {
			reg_dt: moment.getTimeStamp(),
			...post_info
		};
		
		Post.create(newPost)
		.then(data => resolve(data))
		.catch(err => reject(err));
	});
}

const getPost = (post_info) => {
	return new Promise((resolve, reject) => {
		Post.find(post_info).exec()
		.then(data => resolve(data))
		.catch(err => reject(err));
	});
}

export { createPost, getPost };
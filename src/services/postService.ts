import { Post, IPost } from '../models';


const createPost = ( post_info ) => {
	return new Promise((resolve, reject) => {
		post_info.tags = post_info.tags.split(',').map(item => item.trim());
		
		const newPost = {
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
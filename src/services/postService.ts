import { Post, IPost } from '../models';
import { logger } from '../configs';


interface IPostService{
	createPost: (IPost) => Promise<any>;
	getPost: (IPost) => Promise<any>;
}

class PostService implements IPostService{
	
	public createPost = ( post_info ) => {
		return new Promise((resolve, reject) => {
			post_info.tags = post_info.tags.split(',').map(item => item.trim());

			const newPost = {
				...post_info
			};

			Post.create(newPost)
			.then(data => resolve(data))
			.catch(err => {
				logger.error(err);
				reject(err)
			});
		});
	}


	public getPost = ( post_info ) => {
		return new Promise((resolve, reject) => {
			Post.find(post_info).exec()
			.then(data => resolve(data))
			.catch(err => reject(err));
		});
	}
	
	public deletePost = ( post_info ) => {
		return new Promise((resolve, reject) => {
			Post.deleteMany(post_info).exec()
			.then(({ deleteCount }) => {
				resolve(deleteCount);
			})
			.catch(err => {
				logger.error(err);
				reject(err);
			})
		})
	}
}

const postService = new PostService();


export default postService;
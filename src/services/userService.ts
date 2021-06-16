import { User, IUser } from '../models';
import { logger } from '../configs';

interface IUserService {
	createUser: (IUser) => Promise<any>;
	deleteUser: (IUser) => Promise<any>;
	updateUser: (IUser) => Promise<any>;
}

class UserService implements IUserService {
	private idExists = (id) => {
		return new Promise((resolve, reject) => {
			User.exists({id})
			.then(result => resolve(result))
			.catch(err => reject(err));
		})
	}
	private nicknameExists = (nickname) => {
		return new Promise((resolve, reject) => {
			User.exists({nickname})
			.then(result => resolve(result))
			.catch(err => reject(err));
		})
	}
	
	public createUser = ( user_info ) => {
		return new Promise((resolve, reject) => {
			const user = new User(user_info);
			
			this.idExists(user.id)
			.then(exists => {
				if (exists)
					return reject("idExists");
				return this.nicknameExists(user.nickname);
			})
			.then(exists => {
				if (exists)
					return reject("nicknameExists");
				return user.save();
			})
			.then(user => resolve(user))
			.catch(err => reject(err));
		})
	}
}


const userService = new userService();


export default userService;
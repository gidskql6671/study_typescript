import { User, IUser } from '../models';
import { logger } from '../configs';

interface IUserService {
	createUser: (IUser) => Promise<any>;
	deleteUser: (IUser) => Promise<any>;
	updateUser: (IUser) => Promise<any>;
}

interface checkFunc {
	(value: any): Promise<boolean>;
}

class UserService implements IUserService {
	private idExists: checkFunc = (id) => {
		return new Promise((resolve, reject) => {
			User.exists({id})
			.then(result => resolve(result))
			.catch(err => reject(err));
		})
	}
	private nicknameExists: checkFunc = (nickname) => {
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
					throw new Error('idExists');
				return this.nicknameExists(user.nickname);
			})
			.then(exists => {
				if (exists)
				throw new Error('nicknameExists');
				return user.save();
			})
			.then(user => resolve(user))
			.catch(err => reject(err));
		});
	}

	public deleteUser = ( user_info ) => {
		return new Promise((resolve, reject) => {
			
		});
	}

	public updateUser = ( user_info ) => {
		return new Promise((resolve, reject) => {

		});
	}
}


const userService = new UserService();


export default userService;
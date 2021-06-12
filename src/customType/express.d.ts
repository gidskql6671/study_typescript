import { IUser } from '../models';

declare global{
	namespace Express{
		interface Request{
			user?: IUser;
			isAuthenticated?: () => boolean;
		}
		
		interface Response{
			locals{
				isAuthenticated?: boolean;
				currentUser?: IUser;
			}
		}
	}
}
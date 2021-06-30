import { IUser } from '../models';

declare global{
	namespace Express{
		export interface User extends IUser {}
	}
}
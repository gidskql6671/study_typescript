import express from 'express';
import { logger } from '../configs';
import { userService } from '../services';
import { IUser } from '../models';

const router: express.Router = express.Router();


declare module 'express-session'{
	interface SessionData {
		prevInfo?: IUser
	}
}

router.get('/', (req: express.Request, res: express.Response) => {
	logger.info("get", req.originalUrl);
	
	res.render('user/index');
})

router.get('/login', (req, res) => {
	logger.info("get", req.originalUrl);
	
	res.render('user/login');
})

router.get('/register', (req, res) => {
	logger.info("get", req.originalUrl);
	
	let content = {} as IUser;
	if (req.session.prevInfo){
		content = req.session.prevInfo;
		req.session.prevInfo = null;
	}
	
	res.render('user/register', {content});
})

router.post('/register', (req, res) => {
	logger.info("post", req.originalUrl);
	
	userService.createUser(req.body)
	.then( user => {
		res.redirect('.');
	}).catch(err => {
		if (err == "idExists"){
			req.session.prevInfo = req.body;
			req.session.prevInfo.id = "사용불가능한 id입니다.";
			res.redirect('register');
		}
		else if (err == "nameExists"){
			req.session.prevInfo = req.body;
			req.session.prevInfo.name = "사용불가능한 이름입니다.";
			res.redirect('register');
		}
		else{
			logger.error("post", req.originalUrl, err);
			res.send(err);
		}
	})
})

export default router;
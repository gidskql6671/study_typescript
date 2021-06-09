import express from 'express';
import { logger } from '../configs';
import { createPost, getPost } from '../services';


const router: express.Router = express.Router();


router.get('/', (req: express.Request, res: express.Response) => {
	logger.info("Board Router");
	
	getPost({})
	.then(data => {
		res.send(data);
	})
	.catch(err => res.send(err));
})


export default router;
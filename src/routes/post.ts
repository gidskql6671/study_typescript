import express from 'express';
import { logger } from '../configs';
import { postService } from '../services';


const router: express.Router = express.Router();


router.get('/', (req: express.Request, res: express.Response) => {
	logger.info("GET: ", req.path);
	
	postService.getPost({})
	.then(posts => res.render('post/index', { posts }))
	.catch(err => res.send(err));
})

router.get('/write', (req: express.Request, res: express.Response) => {
	logger.info("GET: ", req.path);
	
	res.render('post/write');
})

router.post('/', (req, res) => {
	const data = {
		...req.body,
		reg_id: "test_id",
		reg_name: "test_name"
	}
	
	postService.createPost(data)
	.then(id => res.redirect('/post'))
	.catch(err => res.send(err));
})

export default router;
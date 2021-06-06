import express from 'express';

const router: express.Router = express.Router();



router.get('/', (req: express.Request, res: express.Response) => {
	res.send("Home!");
})



export default router;
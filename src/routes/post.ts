import express from 'express';
import { logger } from '../configs';

const router: express.Router = express.Router();



router.get('/', (req: express.Request, res: express.Response) => {
	logger.info("Board Router");
	
	res.send("Board!");
})


export default router;
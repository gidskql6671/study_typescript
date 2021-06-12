import express from 'express';
import { logger } from '../configs';

const router: express.Router = express.Router();


router.get('/', (req: express.Request, res: express.Response) => {
	logger.info("User Router");
})


export default router;
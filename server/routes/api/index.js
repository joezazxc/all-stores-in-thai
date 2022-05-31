import { Router } from 'express';
import userRouter from './user.js'
import storesRouter from './store.js'
const router = Router();

router.get('/', (req, res, next) => res.success(200));
router.use('/users', userRouter);
router.use('/stores', storesRouter)


export default router;

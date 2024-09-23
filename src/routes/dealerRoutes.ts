import { Router } from 'express';
import { getDealer, createDealer, updateDealer, deleteDealer } from '../controllers/dealerController';

const router = Router();

router.post('/dealer', createDealer);
router.get('/dealer/:id', getDealer);
router.put('/dealer/:id', updateDealer);
router.delete('/dealer/:id', deleteDealer);



export default router;

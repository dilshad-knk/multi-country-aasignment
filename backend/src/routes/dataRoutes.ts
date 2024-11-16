import express from 'express';
import { createData, editData, deleteData, fetchDataByCountry ,fetchAll,logout,changeCountry} from '../controllers/dataController';
import { verify } from '../middleware/authMiddleware';

const router = express.Router();

router.use(verify)




router.post('/data/create', createData);
router.get('/data/getDataByCountry', fetchDataByCountry);
router.get('/data/fetch', fetchAll);
router.put('/data/edit/:id', editData);
router.delete('/data/delete/:id', deleteData);
router.put('/data/changeCountry/:country', changeCountry);
router.post('/logout', logout)


export default router;

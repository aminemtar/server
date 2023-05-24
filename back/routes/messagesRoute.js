import express from 'express';
import { getmessages } from '../controllers/msgcontroller.js';
const router = express.Router();
router.get('/getmsg/:id',getmessages)
export default router;
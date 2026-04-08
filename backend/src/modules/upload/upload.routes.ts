import express from 'express';
import { uploadImage } from './upload.controller';
import { upload } from '../../middleware/upload';

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), uploadImage);

export default uploadRouter;
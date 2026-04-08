import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../config/s3";
import { env } from "../config/env";
export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const filename = Date.now() + "-" + file.originalname;
            cb(null, `products/${filename}`);
        }
    })
});
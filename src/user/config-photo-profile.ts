import { extname } from "path/posix";
import { diskStorage } from "multer";
export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname)
    const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };

export const multerConfig = {
  
    storage: diskStorage( {
        destination: '../download/photo-profile', filename: editFileName
    }),

    limits: {fileSize: 1024*1024},

}
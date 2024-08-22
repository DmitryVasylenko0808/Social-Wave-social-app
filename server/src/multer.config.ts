import { diskStorage } from "multer";
import { extname } from "path";
import { v4 } from "uuid";

export const avatarsStorage = diskStorage({
    destination: "./uploads/avatars",
    filename(req, file, callback) {
        callback(null, generateFilename(file))
    },
});

export const coversStorage = diskStorage({
    destination: "./uploads/covers",
    filename(req, file, callback) {
        callback(null, generateFilename(file))
    },
});

const generateFilename = (file: Express.Multer.File) => {
    const name = `${v4()}${extname(file.originalname)}`;

    return name;
};
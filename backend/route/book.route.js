import express from "express"; 
import { deleteBook, getBook, postBook, updateBook } from "../controller/book.controller.js";
import multer from "multer";

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const router = express.Router();

router.get("/", getBook);
router.post("/upload-book", upload.single('image'), postBook);  // Use multer middleware
router.delete("/:bookId", deleteBook);
router.put("/:bookId", updateBook);

export default router;

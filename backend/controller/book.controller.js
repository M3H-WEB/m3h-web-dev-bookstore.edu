import Book from "../model/book.model.js";
import fs from "fs";

// get book
export const getBook = async (req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// post book (with image upload)
export const postBook = async (req, res) => {
    try {
        const { title, author, desc, category, price } = req.body;

        if (!title || !author || !desc || !category || !price) {
            return res.status(400).json({ message: "All fields are required." });
        }

        let img = null;
        if (req.file) {
            img = req.file.filename;  // Path to uploaded image
        }

        const newBook = new Book({ title, author, desc, category, price, img });
        const result = await newBook.save();
        res.status(201).json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// delete book
export const deleteBook = async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) {
            return res.status(404).json({ error: 'book not found' });
        }
        // Optionally delete image file if needed
        if (book.img) {
            fs.unlinkSync(book.img);
        }
        res.status(200).json('book deleted');
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// update book
export const updateBook = async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const updatedFields = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Error updating book", error });
    }
};

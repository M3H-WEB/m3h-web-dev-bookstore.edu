import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:'https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1725726664~exp=1725730264~hmac=54af0d0ed9982aa22e87b1f39e9384d26eb8585f9041d3100898da3a2eea2659&w=740'
    }
    
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
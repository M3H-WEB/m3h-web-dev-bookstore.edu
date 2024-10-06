import mongoose from "mongoose";

const cartSchema = mongoose.Schema({

userId:{
    type: String,
    required: true
},
img:{
    type: String,
    required: true
},
name:{
    type: String,
    required: true
},
price:{
    type: Number,
    required: true
},
quantity:{
    type: Number,
    default: 1
}




});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
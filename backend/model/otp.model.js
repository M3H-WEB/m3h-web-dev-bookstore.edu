import mongoose from "mongoose";

const otpSchema = mongoose.Schema({

otp:{
    type:Number,
    required: true
}




});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
import mongoose from "mongoose";

const securityQuestionSchema = mongoose.Schema({

ans1:{
    type:String,
    required: true
},
ans2:{
    type:String,
    required: true
},
ans3:{
    type:String,
    required: true
},
ans4:{
    type:String,
    required: true
},
ans5:{
    type:String,
    required: true
}




});

const SecurityQuestion = mongoose.model("SecurityQuestion", securityQuestionSchema);

export default SecurityQuestion;
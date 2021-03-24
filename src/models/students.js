const mongoose =require("mongoose");
const validator=require("validator");

const studentSchema=new mongoose.Schema({

    name :{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email already exit"],
        validate(value){
        if(!validator.isEmail(value)){
                    throw new Error("Invalid Email")
            }
            }

    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }


 })

 //we will cteate a collection or models
 const Student = new mongoose.model('Student',studentSchema);
 module.exports= Student;

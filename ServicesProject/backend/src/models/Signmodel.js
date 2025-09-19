import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const signupSchema=new mongoose.Schema({
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
})

signupSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};   
const SignUpModel1=mongoose.model('Signup',signupSchema)

export {SignUpModel1}



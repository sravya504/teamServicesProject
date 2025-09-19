import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const signUpSchema=new mongoose.Schema({
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
},{collection:'SignUp'})

signUpSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const SignUpModel=mongoose.model('SignUp',signUpSchema)

export {SignUpModel}



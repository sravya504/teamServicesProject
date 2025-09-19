// import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'
// const LoginShcema=new mongoose.Schema({
//     mobileNumber:{
//         type:Number,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String
//     }
// },{collection:'login'})

// LoginShcema.pre('save',async function(next){
//     if(!this.isModified('password')){
//         return next()
//     }
//     try{
//         const salt=10
//         this.password=await bcrypt.hash(this.password,salt)
//         next()
//     }catch(error){
//         console.log(error)
//     }
// })

// LoginShcema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model('login',LoginShcema)
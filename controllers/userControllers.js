import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Usersdb from "../models/usersdb.js"




export const signin = async (req,res) => {

    const { email, password } = req.body

    try{

        const existingUser = await Usersdb.findOne({ email })


        const isPasswordCorrect = await bcrypt.compare( password, existingUser.password );

        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials'})


        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, 'test', {expiresIn:'1h'})


        res.status(200).json({result: existingUser, token})



    }catch(error){
        res.status(400).json({message: "Something Went Wrong. Try again"})
    }



}





export const signup = async (req,res) => {

    const { email, password, firstName, lastName, confirmPassword } = req.body

    if(password !== confirmPassword) return res.status(400).json({message: "Password doesn't match"}) 

    try{

        const existingUser = await Usersdb.findOne({ email })


        if(existingUser) return res.status(400).json({message: 'User already exist'})

        const hashedPassword = await bcrypt.hash(password , 12)

        const newUser = {email:email, password:hashedPassword, name: `${firstName} ${lastName}`}


        const newUserindb =  new Usersdb(newUser)

        const result =  await newUserindb.save()

    
        

        const token = jwt.sign({email:result.email, id: result._id}, 'test', {expiresIn:'1h'})


        res.status(200).json({result, token})



    }catch(error){
        res.status(400).json({message: "Something Went Wrong. Try again"})

    }

}
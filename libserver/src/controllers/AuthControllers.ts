import { Request, Response } from "express";
import { login, register } from "../services/UserServices";
import { IUser } from "../models/User";
import { InvalidUsernameOrPwd } from "../utils/libraryErrors";

async function handleRegister(req:Request, res:Response){
    const user:IUser = req.body
    try {
        const registedUser = await register(user)

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: registedUser._id,
                type: registedUser.type,
                firstName: registedUser.firstName,
                lastName: registedUser.lastName,
                email: registedUser.email
            }
        })
    } catch (error:any) {
        console.log(error)
        if(error.message.includes("E11000 duplicate key error collection:")){
            res.status(409).json({message: "User with email already exists", error:error.message})
        } else {
            res.status(500).json({message: "Unable to register user", error: error.message})
        }
    }
}

async function handleLogin(req:Request, res:Response) {
    const cridentials = req.body
    try{
        const loggedinUser = await login(cridentials)

        res.status(201).json({
            message: "User Logged in successfully",
            user: {
                _id: loggedinUser._id,
                type: loggedinUser.type,
                firstName: loggedinUser.firstName,
                lastName: loggedinUser.lastName,
                email: loggedinUser.email
            }
        })

    } catch (error:any) {
        if(error instanceof InvalidUsernameOrPwd){
            res.status(401).json({message: "Incorrect cridentials", error: error.message})
        } else {
            res.status(500).json({message: "Unable to login at this time", error:error.message})
        }
    }
}

export default {handleRegister, handleLogin}
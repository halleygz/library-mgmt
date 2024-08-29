import bcrypt from 'bcrypt'

import { config } from '../config'

import UserDao, {IuserModel} from '../daos/UserDao'
import { IUser } from '../models/User'
import { InvalidUsernameOrPwd } from '../utils/libraryErrors'

export async function register(user:IUser):Promise<IuserModel>{
    const Rounds = config.server.rounds

    try {
        const hashedPwd = await bcrypt.hash(user.password, Rounds)
        
        const saved = new UserDao({...user, password:hashedPwd})
        
        return await saved.save()
    } catch (error:any) {
        throw new Error(error)
    }
}

export async function login(cridentials:{email:string, password:string}):Promise<IuserModel>{
    const {email, password} = cridentials

    try{
        const user = await UserDao.findOne({email})

        if(!user){
            throw new InvalidUsernameOrPwd("Invalid user cridentials")
        } else {
            const validatePwd:boolean = await bcrypt.compare(password, user.password)

            if(validatePwd){
                return user
            } else {
                throw new InvalidUsernameOrPwd("Invalid user cridentials")
            }
        }
    } catch(error:any){
        throw new Error(error.message)
    }
}
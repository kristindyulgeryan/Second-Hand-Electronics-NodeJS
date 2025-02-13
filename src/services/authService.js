import bcrypt from 'bcrypt';

import { generateToken } from '../utils/authUtils.js';
import User from '../models/User.js';


export const login = async ( {email, password} ) => {
   
    const user = await User.findOne({ email });
    if(!user){
        throw new Error("Invalid email or password "); 
    };

    const isValid = await bcrypt.compare( password, user.password);
    if(!isValid){
        throw new Error("Invalid email or password ");   
    };

    const token = generateToken(user);
    return token;
};

export const register = async (userData)=> {
    if(userData.password !== userData.rePassword){
        throw new Error("Password missmatch!");
        
    };

    const user = await User.findOne({ email: userData.email }).select({_id: true});
   
    if(user){
        throw new Error('User already exists')
    };
   
    const createdUser = await User.create(userData);

    const token = generateToken(createdUser);

    return token;
};


const authService = {
    register, 
    login
};

export default authService;
import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const authController = Router();


authController.get('/login', isGuest, (req, res)=>{
    res.render('auth/login')
});

authController.post('/login', isGuest, async (req, res)=>{
    const { email, password } = req.body;

    try {
    const token = await authService.login( {email, password });

    res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});
    res.redirect('/')
    } catch (err) {
        res.render('auth/login', {
            error: getErrorMessage(err), 
            username: { email }})
    }
    
});


authController.get('/register', isGuest, (req, res)=>{
    res.render('auth/register')
});

authController.post('/register',isGuest, async (req, res)=>{
    const {username , email, password, rePassword} = req.body;
  

try {
    const token =  await authService.register({username , email, password, rePassword});

    res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true})
    res.redirect('/')
} catch (err) {
    res.render('auth/register', {
         
        username: {username, email},
        error: getErrorMessage(err)});
}
 

    
});

authController.get('/logout', isAuth, (req, res)=> {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
})

export default authController;
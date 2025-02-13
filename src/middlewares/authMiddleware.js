
import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config.js"
import jsonwebtoken from "../lib/jsonwebtoken.js";

export const auth = async (req, res, next)=>{
    const token = req.cookies[AUTH_COOKIE_NAME];

    if(!token){
        return next();
    }
try {
    const decodedToken = await jsonwebtoken.verify(token, JWT_SECRET);
    
    req.user = decodedToken;
    res.locals.user = decodedToken;

   
} catch (err) {
    res.clearCookie(AUTH_COOKIE_NAME);
   return res.redirect('/auth/login')
}
   next();
};


export const isAuth = (req, res, next)=>{
    if(!req.user){
        return res.redirect('/auth/login')
    }
    next(); 
};

export const isGuest = (req, res, next)=>{
   if(req.user){
    res.setError('You are already logged in')
    return res.redirect('/')
}
next()
}
import { Router } from "express";

const homeController = Router();

homeController.get('/', async(req, res)=>{ 
    res.render('home')
  
})




export default homeController;
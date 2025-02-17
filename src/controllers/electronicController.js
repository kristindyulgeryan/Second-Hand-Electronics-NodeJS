import { Router } from "express";
// import electronicService from "../services/electronicService.js";
// import isAuth from "../middlewares/isAuth.js";
// import getError from "../utils/error.js";

const electronicController=Router();

electronicController.get('/create',(req,res)=>{
    res.render('electronics/create')
});

export default electronicController;
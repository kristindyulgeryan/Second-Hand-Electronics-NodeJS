import { Router } from "express";
import electronicService from "../services/electronicService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";


const electronicController=Router();

electronicController.get('/catalog', async (req,res)=>{
    const electronics =await electronicService.getAll();
    res.render('electronics/catalog', {electronics})
})

electronicController.get('/create',(req,res)=>{
    res.render('electronics/create')
});

electronicController.post('/create',isAuth, async(req,res)=>{
    const newElectronic = req.body;
    const userId = req.user._id;
console.log(newElectronic)
    try {
        await electronicService.create(newElectronic, userId);
    } catch (err) {
        const error = getErrorMessage(err);
        return res.render('electronics/catalog', {
            electronic: newElectronic,
            error});
        
    }
   
    res.redirect('/electronics/catalog')
})

export default electronicController;
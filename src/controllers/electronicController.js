import { Router } from "express";
import electronicService from "../services/electronicService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const electronicController=Router();

electronicController.get('/create',(req,res)=>{
    res.render('electronics/create')
});

electronicController.post('/create', async(req,res)=>{
    const newElectronic = req.body;
    const userId = req.user?.id;

    try {
        await electronicService.create(newElectronic, userId);
    } catch (err) {
        const error = getErrorMessage(err);
        return res.render('electronics/create', {error});
        
    }
   
    res.redirect('/catalog')
})

export default electronicController;
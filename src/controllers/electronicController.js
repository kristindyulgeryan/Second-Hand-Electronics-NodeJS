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
});

electronicController.get('/:electronicId/details', async (req,res)=>{
    const electronicId = req.params.electronicId;
const electronic = await electronicService.getOne(electronicId);
const isOwner = req.user && req.user._id === electronic.owner.toString();
    res.render('electronics/details', {electronic, isOwner})
});
electronicController.get('/:electronicId/edit',isAuth, async (req,res)=>{
    const electronicId = req.params.electronicId;
    const electronic = await electronicService.getOne(electronicId);
    res.render('electronics/edit', {electronic})
});




export default electronicController;
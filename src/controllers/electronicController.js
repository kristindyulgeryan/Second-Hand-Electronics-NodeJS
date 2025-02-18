import { Router } from "express";
import electronicService from "../services/electronicService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { get } from "mongoose";


const electronicController=Router();

electronicController.get('/search', async (req,res)=>{
    const filter=req.query;
    const electronics = await electronicService.getAll(filter);

    res.render('search', {electronics, filter})
})

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


const isOwner = req.user && electronic.owner.equals(req.user._id.toString());
const isBought =  electronic.buyingList.includes(req.user?._id)
    res.render('electronics/details', {electronic, isOwner, isBought})
});

electronicController.get('/:electronicId/buy',isAuth, async (req,res)=>{
    const electronciId = req.params.electronicId;
    const userId = req.user._id;

    try {
        await electronicService.buy(electronciId, userId);
       
    } catch (err) {
       
     res.setError(getErrorMessage(err)); 
    }
    
    res.redirect(`/electronics/${electronciId}/details`)
 })

electronicController.get('/:electronicId/edit',isAuth, async (req,res)=>{
    const electronicId = req.params.electronicId;
    const electronic = await electronicService.getOne(electronicId);
    res.render('electronics/edit', {electronic})
});



electronicController.post('/:electronicId/edit',isAuth, async (req,res)=>{
    const electronicId = req.params.electronicId;
    const updatedElectronic = req.body;
    try {
        await electronicService.update(electronicId, updatedElectronic);
    } catch (err) {
        const error = getErrorMessage(err);
        return res.render('electronics/edit', {
            electronic: updatedElectronic,
            error});
    }
    res.redirect(`/electronics/${electronicId}/details`)
});

electronicController.get('/:electronicId/delete',isAuth, async (req,res)=>{
    const electronicId = req.params.electronicId;
    await electronicService.deleteOne(electronicId);
    res.redirect('/electronics/catalog')
})



export default electronicController;
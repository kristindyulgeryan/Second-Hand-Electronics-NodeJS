
import Electronic from "../models/Electronic.js";


export default {
    async getAll(){
        return await Electronic.find({});
    },
async getOne(electronicId){
    return await Electronic.findById(electronicId).lean();
},


   async create(electronicData, userId){
       return await  Electronic.create({...electronicData, owner: userId});
      
    },
    async update(electronicId, electronicData){
        return await Electronic.findByIdAndUpdate(electronicId, electronicData, {runValidators: true});
    }
   
}
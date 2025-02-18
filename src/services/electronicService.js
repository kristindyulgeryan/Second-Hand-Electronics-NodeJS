import Electronic from "../models/Electronic.js";


export default {
    async getAll(){
        return await Electronic.find({}).lean();
    },

   async create(electronicData, userId){
       return await  Electronic.create({...electronicData, owner: userId});
      
    },
   
}
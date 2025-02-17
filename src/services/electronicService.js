import Electronic from "../models/Electronic.js";


export default {
    create(electronicData, creatorId){
        const electronic = Electronic.create({...electronicData, creator: creatorId});
        return electronic;
    }
}
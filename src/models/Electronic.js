import { Schema, model, Types } from "mongoose";

const electronicSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    type: {
        type: String,
        required: [true, 'Brand is required']
    },
    damages: {
        type: String,
        required: [true, 'Damages is required']
    },
    image:{type: String,
        required: [true, 'Image is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    production:{
        type: Number,
        required: [true, 'Production is required']
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required']
    },
    price: {    
        type: Number,
        required: [true, 'Price is required']
    },
    buyingList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }


});

const Electronic = new model('Electronic', electronicSchema);

export default Electronic;
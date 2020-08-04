import {Schema, model} from 'mongoose';

const NewsSchema = Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        firstN:{type:String},
        lastN:{type:String},
        surN:{type:String},
        nick:{type:String},
        tel:{type:String},
        city:{type:String},
        branchN:{type:String},
    }
    // {timestamps: {}},
);

export default model('User', NewsSchema);

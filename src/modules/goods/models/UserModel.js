import {model, Schema} from 'mongoose';

const UserSchema = Schema(
    {
        email: {type: String, index:true, required: true},
        pass: {type: String, required: true},
        FN: {type: String},
        LN: {type: String},
        SN: {type: String},
        tel: {type: String},
        city: {type: String},
        branchN: {type: String},
        finger: {
            ip: {type: String},
            UA: {type: String},
        },
        likesArr: {
            arr: [String],
            date: Number,
            // type:[Object]
        },
        basketArr: {
            arr: [{
                id: String,
                count: Number,
                price: Number,
            }],
            date: Number,
            type: [Object]
        },
        boughtArr: [{
            type: Schema.Types.ObjectId, ref: "Bought"
        }],

    }
);

export default model('User', UserSchema);

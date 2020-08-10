import {model, Schema} from 'mongoose';

const BoughtSchema = Schema(
    {
        goods: [{
            goodsId: {type: Schema.Types.ObjectId, ref: "Goods", required: true},
            count: {type: Number, required: true},
            price: {type: Number, required: true},
            date: {type: Number, required: true},
            comment: {type: Boolean, default: false},
        }],
        UD: {
            userId: {type: Schema.Types.ObjectId, ref: "User"},
            email: {type: String, required: true},
            tel: {type: String, required: true},
            FN: {type: String, required: true},
            LN: {type: String, required: true},
            SN: {type: String, required: true},
            city: {type: String, required: true},
            branchN: {type: String, required: true},
            finger: {
                ip: {type: String},
                UA: {type: String},
            }
        },
        date: {
            type: Number,
            required: true,
        },
        // 0 = в обработке 1 = готовится к отправке 2 = у новой почты 3 = забрано 4 = отказался
        stage: {type: Number},
        promo: {type: String},
        cupon: {type: String},
        // 0 = наложеный 1 = карта
        pay: {type: Number},
    }
    // {timestamps: {}},
);

export default model('Bought', BoughtSchema);
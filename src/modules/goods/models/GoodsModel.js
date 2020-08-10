import {model, Schema} from 'mongoose';

const GoodsSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,

        drPaId: {
            type: String,
            index: {unique: true}
        },

        //available
        avlbl: {
            type: String,
        },
        //dropshipURL
        drUrl: {
            type: String,
            index: {
                unique: true
            }
        },
        //price
        optPrc: {
            type: Number,
            required: true,
        },
        dopPrc: {
            type: Number
        },
        dscnt: {
            type: Number
        },
        rtlPrc: {
            type: Number,
            required: true,
        },
        //currencyId
        crrncId: {
            type: String
        },
        //categoryId
        ctgrId: {
            type: Number,
            required: true,
            index: true
        },
        img: {
            type: [String]
        },
        //name
        nm: {
            type: String,
            required: true
        },
        //vendor
        vndr: {
            type: String
        },
        //model
        mdl: {
            type: String
        },
        //description
        dscrptn: {
            type: String,
            index: {
                type: "text",
                default_language: "russian"
            }
        },
        //stock_quantity
        stck_qntt: {
            type: Number
        },
        //param
        prm: {
            type: [Object],
            index: true
        },

        rating:{type:Number},

        comments: [{
            userId: {type: Schema.Types.ObjectId, ref: "User"},
            name: {type: String, required: true},
            posi: {type: Boolean, required: true},
            voice: {type: Number, default: 0},
            date: {type: Number, required: true},
            content: {
                msg: {type: String, required: true},
                plus: {type: String, required: true},
                minus: {type: String, required: true},
            }
        }]
    },
);

// GoodsSchema.index({
//     dscrptn: "text",
//     default_language: "russian"
// });

export default model('goods', GoodsSchema);
import {model, Schema} from 'mongoose';

const GoodsSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,

        shipper: {type: String},
        //0 === stub/1 === defaultGoods/ 2 === upgrade
        ready:{type:Number, required:true},

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
            // required: true,
        },
        dopPrc: {
            type: Number
        },
        dscnt: {
            type: Number
        },
        rtlPrc: {
            type: Number,
            // required: true,
        },
        //currencyId
        crrncId: {
            type: String
        },
        //categoryId
        ctgrId: {
            type: Number,
            // required: true,
            index: true
        },
        img: {
            type: [String]
        },
        //name
        nm: {
            type: String,

            // required: true
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

        rating:{type:Number, default:0},

        comments: [{
            userId: {type: Schema.Types.ObjectId, ref: "User"},
            name: {type: String,},
            posi: {type: Boolean,},
            voice: {type: Number, default: 0},
            date: {type: Number,},
            content: {
                msg: {type: String,},
                plus: {type: String,},
                minus: {type: String,},
            }
        }],
        date:{type:Number, default: Date.now()}
    },
);

GoodsSchema.index({
    dscrptn: "text",
    nm: "text",
    default_language: "russian"
});

export default model('goods', GoodsSchema);
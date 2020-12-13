import {model, Schema} from 'mongoose';

const UserSchema = Schema(
  {
    email: {type: String, index: true, required: true},
    pass: {type: String, required: true},
    FN: {type: String},
    LN: {type: String},
    SN: {type: String},
    tel: {type: String},
    city: {type: String},
    branchN: {type: String},
    // 0 - User, 1 - Moder, 2 - Admin
    rights: {type: Number, default: 0},
    finger: {
      ip: {type: String},
      UA: {type: String},
    },
    tmpPass: {
      pin: {type: Number, default: 0},
      date: {type: Number, default: 0}
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
    cupon: [{type: Number}],
    date: {type: Number},
  }
);

export default model('User', UserSchema);

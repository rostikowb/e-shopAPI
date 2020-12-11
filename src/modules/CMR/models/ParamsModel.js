import {model, Schema} from 'mongoose';

const ParamsSchema = Schema(
  {

    ctgrId: {type: String, required: true, unique: true, index: true},
    prm:{type: [Object], required: true, index: true},
    rangePrc: {
      gte: {type: Number, required: true},
      lte: {type: Number, required: true}
    }
  }
);

export default model('Params', ParamsSchema);
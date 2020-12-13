import {model, Schema} from 'mongoose';

const TicketsSchema = Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    question: {type: String, required: true, index: true,},
    comm: {type: String, required: true, index: true,},
    msg: {type: String, required: true,},
    email: {type: String},
    tel: {type: String},
    telegram: {type: String},
    date: {type: Number, required: true},
    status: {type: Number, default: 0}
  }
);

export default model('Ticket', TicketsSchema);

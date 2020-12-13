import TicketsModel from "../../models/TicketsModel";

export const ticketUpdate = async (req, res) => {
  const {_id, status} = req.body

  if(status !== 0 || status !== 1) return res.status(200).json({invalid: true, err: 'status 0 or 1'})

  try {
    let tickets = await TicketsModel.findOne(_id);
    tickets.status = status || tickets.status;
    tickets.save();

    return res.status(200).json({invalid: false, arr: tickets})
  } catch (e) {
    console.log(e);
    return res.status(200).json({invalid: true, err: e})
  }
};
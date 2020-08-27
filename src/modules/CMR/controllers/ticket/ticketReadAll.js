import TicketsModel from "../../models/TicketsModel";

export const ticketsReadAll = async (req, res) => {

    try {
        let tickets = await TicketsModel.find().sort({date: -1}).limit(50);
        return res.status(200).json({invalid: false, arr: tickets})
    } catch (e) {
        console.log(e);
        return res.status(200).json({invalid: true, err: e})
    }
};
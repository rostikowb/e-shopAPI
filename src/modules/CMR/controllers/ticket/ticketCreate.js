import mongoose from "mongoose";
import Ticket from "../../models/TicketsModel";

export const ticketsCreate = async (req, res) => {
    try {
        let userId = req?.userId;
        let question = req.body?.question;
        let comm = req.body?.comm;
        let msg = req.body?.msg;
        let commObj = {
            email: req.body?.email,
            tel: req.body?.tel,
            telegram: req.body?.telegram,
        };
        console.log(comm);
        if (!question || !comm || !msg || !commObj[comm])
            return res.status(200).json({invalid: true, msg: 'Заполните все поля перед отправкой!'});

        if (!(question.length >= 3 && question.length <= 25) ||
            !(comm.length >= 3 && comm.length <= 10) ||
            !(msg.length >= 5 && msg.length <= 800) ||
            !(commObj[comm].length >= 3 && commObj[comm].length <= 25)
        )
            return res.status(200).json({
                invalid: true,
                msg: 'Соблюдайте ограничения на количество символов!'
            });

        let ticket = {
            _id: mongoose.Types.ObjectId(),
            userId: userId ? userId : null,
            question,
            comm,
            msg,
            date: Date.now()
        };

        ticket[comm] = commObj[comm];
        ticket = new Ticket(ticket);
        ticket = await ticket.save();
        console.log(ticket);

        try {
            await req.TeleBot.newOrder({type: 'ticket', id: ticket._id})
        }catch (e) {
            console.log(e);
        }

        return res.status(200).json({
            invalid: false,
            msg: 'ok'
        });

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            invalid: true,
            msg: 'Что-то не так, проверьте данные и попробуйте снова'
        });
    }
};
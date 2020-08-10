import User from "../../models/UserModel";

export const userRead = (req, res) => {

    const userId = req?.userId;

    console.log(userId);

    User.findOne({_id: userId})
        .populate({path: 'boughtArr', select: '-UD'})
        .exec()
        .then(user => {
            if (!user) {
                return res.status(200).json({invalid: true});
            } else {
                return res.status(200).json({UD:user});
            }
        })
        .catch(err => res.status(200).json(err));
};
import {checkPin} from "../func/checkPin";

export const userRestore1 = async (req, res) => {

    const result = await checkPin(req)

    if(result.invalid){
        return res.status(200).json(result)
    }else {
        return res.status(200).json({invalid:false})
    }
};
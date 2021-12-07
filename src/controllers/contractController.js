import contractService from '../services/contractService';

let getAllContract = async (req, res) => {
    let user = req.user;
    if (!user) {
        return res.status(500).json({
            message: "Missing data"
        });
    }
    let list = await contractService.getAllContract(user);
    return res.status(200).json({
        errCode: list.errCode,
        message: list.message,
        listContract: list.listContract ? list.listContract : []
    });
}

let postContract = async (req, res) => {
    let message = await contractService.postContract(req.body);
    return res.status(200).json(message);
}

module.exports = {
    getAllContract: getAllContract,
    postContract: postContract
}
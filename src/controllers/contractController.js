import contractService from '../services/contractService';

let getAllContract = async (req, res) => {
    let listContract = await contractService.getAllContract();
    return res.status(200).json({
        listContract: listContract ? listContract : []
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
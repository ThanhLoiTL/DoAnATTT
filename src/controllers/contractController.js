import contractService from '../services/contractService';

let getAllContract = async (req, res) => {
    let listContract = await contractService.getAllContract();
    return res.status(200).json({
        listContract: listContract ? listContract : []
    });
}

module.exports = {
    getAllContract: getAllContract
}
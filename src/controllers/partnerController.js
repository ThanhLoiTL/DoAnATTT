import partnerService from '../services/partnerService';

let getAllPartner = async (req, res) => {
    let listPartner = await partnerService.getAllPartner();
    return res.status(200).json({
        listPartner: listPartner ? listPartner : []
    });
}

module.exports = {
    getAllPartner: getAllPartner
}
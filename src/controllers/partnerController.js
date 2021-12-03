import partnerService from '../services/partnerService';

let getAllPartner = async (req, res) => {
    let listPartner = await partnerService.getAllPartner();
    return res.status(200).json({
        listPartner: listPartner ? listPartner : []
    });
}

let postPartner = async (req, res) => {
    let message = await partnerService.postPartner(req.body);
    return res.status(200).json(message);
}

module.exports = {
    getAllPartner: getAllPartner,
    postPartner: postPartner
}
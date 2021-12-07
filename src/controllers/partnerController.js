import partnerService from '../services/partnerService';

let getAllPartner = async (req, res) => {
    let user = req.user;
    if (!user) {
        return res.status(500).json({
            message: "Missing data"
        });
    }
    let list = await partnerService.getAllPartner(user);
    return res.status(200).json({
        errCode: list.errCode,
        message: list.message,
        listPartner: list.listPartner ? list.listPartner : []
    });
}

let postPartner = async (req, res) => {
    let message = await partnerService.postPartner(req.body);
    return res.status(200).json(message);
}

let updatePartner = async (req, res) => {
    let user = req.user;
    if (!user) {
        return res.status(500).json({
            message: "Missing data"
        });
    }
    let mess = await partnerService.updatePartner(user, req.body);
    return res.status(200).json({
        message: mess.message,
        errCode: mess.errCode
    });
}

let deletePartner = async (req, res) => {
    let user = req.user;
    let partnerId = req.query.partnerId;
    if (!partnerId && !user) {
        return res.status(500).json({
            message: 'Missing data'
        });
    }
    let mess = await partnerService.deletePartner(user, partnerId);
    return res.status(200).json({
        message: mess.message,
        errCode: mess.errCode
    });
}

module.exports = {
    getAllPartner: getAllPartner,
    postPartner: postPartner,
    updatePartner: updatePartner,
    deletePartner: deletePartner
}
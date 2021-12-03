import positionService from '../services/positionService';

let getAllPosition = async (req, res) => {
    let listPosition = await positionService.getAllPosition();
    return res.status(200).json({
        listPosition: listPosition ? listPosition : []
    });
}

module.exports = {
    getAllPosition: getAllPosition
}
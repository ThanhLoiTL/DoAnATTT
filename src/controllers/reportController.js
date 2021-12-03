import reportService from '../services/reportService';

let postReport = async (req, res) => {
    let message = await reportService.postReport(req.body);
    return res.status(200).json(message);
}

module.exports = {
    postReport: postReport
}
import reportService from '../services/reportService';

let postReport = async (req, res) => {
    let message = await reportService.postReport(req.body);
    return res.status(200).json(message);
}

let getReportByRole = async (req, res) => {
    let userId = req.query.user;
    if (!userId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        });
    }
    let listReport = await reportService.getReportByRole(userId);
    return res.status(200).json({
        listReport: listReport ? listReport : []
    });
}

module.exports = {
    postReport: postReport,
    getReportByRole: getReportByRole
}
import reportService from '../services/reportService';

let postReport = async (req, res) => {
    let message = await reportService.postReport(req.body);
    return res.status(200).json(message);
}

let getReportByRole = async (req, res) => {
    let role = req.query.role;
    let user = req.user;
    if (!user && !role) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        });
    }
    let list = await reportService.getReportByRole(user, role);
    return res.status(200).json({
        errCode: list.errCode,
        message: list.message,
        listReport: list.listReport ? list.listReport : []
    });
}

let deleteReport = async (req, res) => {
    let user = req.user;
    let reportId = req.query.reportId;
    if (!reportId && !user) {
        return res.status(500).json({
            message: 'Missing data'
        });
    }
    let message = await reportService.deleteReport(user, reportId);
    return res.status(200).json(message);
}

module.exports = {
    postReport: postReport,
    getReportByRole: getReportByRole,
    deleteReport: deleteReport
}
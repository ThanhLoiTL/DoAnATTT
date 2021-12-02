import jobService from '../services/jobService';

let getAllJobByRole = async (req, res) => {
    let role = req.query.role;
    if (!role) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let listJob = await jobService.getAllJobByRole(role);
    return res.status(200).json({
        listJob: listJob ? listJob : []
    });
}

let getJobByUser = async (req, res) => {
    let userId = req.query.userId;
    if (!userId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        });
    }
    let listJob = await jobService.getJobByUser(userId);
    return res.status(200).json({
        listJob: listJob ? listJob : []
    });
}

module.exports = {
    getAllJobByRole: getAllJobByRole,
    getJobByUser: getJobByUser
}
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

let postJob = async (req, res) => {
    let message = await jobService.postJob(req.body);
    return res.status(200).json(message);
}

let updateStatusJob = async (req, res) => {
    let jobId = req.query.jobId;
    if (!jobId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Job not found'
        });
    }
    let message = await jobService.updateStatusJob(jobId);
    return res.status(200).json({
        message: message
    });
}

module.exports = {
    getAllJobByRole: getAllJobByRole,
    getJobByUser: getJobByUser,
    postJob: postJob,
    updateStatusJob: updateStatusJob
}
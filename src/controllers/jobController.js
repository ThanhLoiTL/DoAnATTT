import jobService from '../services/jobService';

let getAllJobByRole = async (req, res) => {
    let role = req.query.role;
    let user = req.user;
    if (!role && !user) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let list = await jobService.getAllJobByRole(user, role);
    return res.status(200).json({
        errCode: list.errCode,
        message: list.message,
        listJob: list.listJob ? list.listJob : []
    });
}

let getJobByUser = async (req, res) => {
    let user = req.user;
    if (!user) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        });
    }
    let listJob = await jobService.getJobByUser(user);
    return res.status(200).json({
        listJob: listJob ? listJob : []
    });
}

let postJob = async (req, res) => {
    let message = await jobService.postJob(req.body);
    return res.status(200).json(message);
}

let updateStatusJob = async (req, res) => {
    let jobId = req.body.jobId;
    let user = req.user;
    if (!jobId && user) {
        return res.status(500).json({
            errCode: 1,
            message: 'Job not found'
        });
    }
    let mess = await jobService.updateStatusJob(user, jobId);
    return res.status(200).json({
        message: mess.message,
        errCode: mess.errCode
    });
}

let updateJob = async (req, res) => {
    let user = req.user;
    if (!user) {
        return res.status(500).json({
            message: "Missing data"
        });
    }
    let mess = await jobService.updateJob(user, req.body);
    return res.status(200).json({
        message: mess.message,
        errCode: mess.errCode
    });
}

let deleteJob = async (req, res) => {
    let user = req.user;
    let jobId = req.query.jobId;
    if (!jobId && !user) {
        return res.status(500).json({
            message: 'Missing data'
        });
    }
    let mess = await jobService.deleteJob(user, jobId);
    return res.status(200).json({
        message: mess.message,
        errCode: mess.errCode
    });
}

module.exports = {
    getAllJobByRole: getAllJobByRole,
    getJobByUser: getJobByUser,
    postJob: postJob,
    updateStatusJob: updateStatusJob,
    updateJob: updateJob,
    deleteJob: deleteJob
}
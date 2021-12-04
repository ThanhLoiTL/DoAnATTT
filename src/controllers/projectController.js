import projectService from '../services/projectService';

let getProjectByRole = async (req, res) => {
    let role = req.query.role;
    if (!role) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let listProject = await projectService.getProjectByRole(role);
    return res.status(200).json({
        listProject: listProject ? listProject : []
    });
}

let getProjectByUser = async (req, res) => {
    let userId = req.query.userId;
    if (!userId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let listProject = await projectService.getProjectByUser(userId);
    return res.status(200).json({
        listProject: listProject ? listProject : []
    });
}

let postProjectByRole = async (req, res) => {
    let message = await projectService.postProjectByRole(req.body);
    return res.status(200).json({
        message: message
    });
}

module.exports = {
    getProjectByRole: getProjectByRole,
    getProjectByUser: getProjectByUser,
    postProjectByRole: postProjectByRole
}
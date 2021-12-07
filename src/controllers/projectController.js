import projectService from '../services/projectService';

let getProjectByRole = async (req, res) => {
    let role = req.query.role;
    let user = req.user;
    if (!role && !user) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let list = await projectService.getProjectByRole(user, role);
    return res.status(200).json({
        errCode: list.errCode,
        message: list.message,
        listProject: list.listProject ? list.listProject : []
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

let updateProject = async (req, res) => {
    let user = req.user;
    if (!user) {
        return res.status(500).json({
            message: "Missing data"
        });
    }
    let mess = await projectService.updateProject(user, req.body);
    return res.status(200).json({
        message: mess.message,
        errCode: mess.errCode
    });
}

let deleteProject = async (req, res) => {
    let user = req.user;
    let projectId = req.query.projectId;
    if (!projectId && !user) {
        return res.status(500).json({
            message: 'Missing data'
        });
    }
    let mess = await projectService.deleteProject(user, projectId);
    return res.status(200).json({
        message: mess.message,
        errCode: mess.errCode
    });
}

module.exports = {
    getProjectByRole: getProjectByRole,
    getProjectByUser: getProjectByUser,
    postProjectByRole: postProjectByRole,
    updateProject: updateProject,
    deleteProject: deleteProject
}
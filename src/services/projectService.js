import db from '../models/index';

let getProjectByRole = (user, roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listProject = {};
            if (user) {
                let list = await db.Project.findAll({
                    where: {
                        role: roleId
                    },
                    include: [{
                        model: await db.Role
                    }],
                    raw: true,
                    nest: true
                })
                if (list.length > 0) {
                    let labelOfProject = await db.Label.findOne({
                        where: {
                            id: list[0].label
                        }
                    });
                    if (user.label >= labelOfProject.value) {
                        listProject.errCode = 0;
                        listProject.message = "Ok";
                        listProject.listProject = list;
                    } else {
                        listProject.errCode = 1;
                        listProject.message = "Not Permission";
                        listProject.listProject = [];
                    }
                } else {
                    listProject.errCode = 2;
                    listProject.message = "No data";
                    listProject.listProject = [];
                }

            } else {
                listProject.errCode = 3;
                listProject.message = "Not Login";
                listProject.listProject = [];
            }
            resolve(listProject);
        } catch (e) {
            reject(e);
        }
    })
}

let getProjectByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listProject = await db.Project.findAll({
                where: {
                    role: userId
                },
                include: [{
                    model: await db.Role
                }],
                raw: true,
                nest: true
            })
            resolve(listProject);
        } catch (e) {
            reject(e);
        }
    })
}

let postProjectByRole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.description && data.userId) {
                let user = await db.User.findOne({
                    where: {
                        id: data.userId
                    }
                });
                if (user) {
                    await db.Project.create({
                        name: data.name,
                        description: data.description,
                        label: user.label,
                        role: data.role
                    })
                    resolve({
                        message: "Thanh cong"
                    });
                }
            }
            resolve({
                message: "That bai"
            });
        } catch (e) {
            reject(e);
        }
    })
}

let updateProject = (user, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {}
            let project = await db.Project.findOne({
                where: {
                    id: data.id
                }
            });
            if (!project) {
                message.errCode = 1;
                message.message = "Contract not found";
            } else {
                let labelOfProject = await db.Label.findOne({
                    where: {
                        id: project.label
                    }
                });
                if (user.label >= labelOfProject.value) {
                    project.name = data.name;
                    project.description = data.description;
                    await project.save();
                    message.errCode = 0;
                    message.message = "OK";
                } else {
                    message.errCode = 2;
                    message.message = "Not Permission";
                }
            }
            resolve(message);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteProject = (user, projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {};
            let project = await db.Project.findOne({
                where: {
                    id: projectId
                }
            });
            if (project) {
                let labelOfProject = await db.Label.findOne({
                    where: {
                        id: project.label
                    }
                });
                if (user.label >= labelOfProject.value) {
                    await project.destroy();
                    message.errCode = 0;
                    message.message = "Ok";
                } else {
                    message.errCode = 2;
                    message.message = "Not Permission";
                }
            } else {
                message.errCode = 2;
                message.message = "Not found data";
            }
            resolve(message)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getProjectByRole: getProjectByRole,
    getProjectByUser: getProjectByUser,
    postProjectByRole: postProjectByRole,
    updateProject: updateProject,
    deleteProject: deleteProject
}
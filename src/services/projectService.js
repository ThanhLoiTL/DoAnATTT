import db from '../models/index';

let getProjectByRole = (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listProject = await db.Project.findAll({
                where: {
                    role: roleId
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

module.exports = {
    getProjectByRole: getProjectByRole,
    getProjectByUser: getProjectByUser,
    postProjectByRole: postProjectByRole
}
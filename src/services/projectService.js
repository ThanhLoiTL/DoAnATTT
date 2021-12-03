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

module.exports = {
    getProjectByRole: getProjectByRole,
    getProjectByUser: getProjectByUser
}
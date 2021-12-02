import db from '../models/index';

let getAllJobByRole = (role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listJob = await db.Job.findAll({
                where: {
                    role: role
                },
                include: [{
                    model: await db.Role
                }],
                raw: true,
                nest: true
            })
            resolve(listJob);
        } catch (e) {
            reject(e);
        }
    })
}

let getJobByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listJob = await db.Job.findAll({
                where: {
                    user: userId
                },
                raw: true
            });
            resolve(listJob);
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getAllJobByRole: getAllJobByRole,
    getJobByUser: getJobByUser
}
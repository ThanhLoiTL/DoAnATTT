import db from '../models/index';

let getAllJobByRole = (role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listJob = await db.Job.findAll({
                where: {
                    role: role
                },
                include: [{
                    model: await db.Role,
                    model: await db.User
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
                    user: userId,
                    status: 2
                },
                raw: true
            });
            resolve(listJob);
        } catch (e) {
            reject(e);
        }
    })
}

let postJob = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.user && data.role && data.description) {
                await db.Job.create({
                    name: data.name,
                    user: data.user,
                    role: data.role,
                    description: data.description,
                    status: 1
                })
                resolve({
                    message: "Thanh cong"
                });
            }
            resolve({
                message: "That bai"
            });
        } catch (e) {
            reject(e);
        }
    })
}

let updateStatusJob = (jobId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let job = await db.Job.findOne({
                where: {
                    id: jobId
                }
            });
            if (!job) {
                resolve("Job not found");
            } else {
                if (job.status === 1) {
                    job.status = 2;
                } else if (job.status === 2) {
                    job.status = 1;
                }
                await job.save();
                resolve("Thanh cong");
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllJobByRole: getAllJobByRole,
    getJobByUser: getJobByUser,
    postJob: postJob,
    updateStatusJob: updateStatusJob
}
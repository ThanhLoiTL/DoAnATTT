import db from '../models/index';

let getAllJobByRole = (user, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listJob = {};
            if (user) {
                if (user.position != 1) {
                    let list = await db.Job.findAll({
                        where: {
                            role: role
                        },
                        include: [{
                            model: await db.Role,
                            model: await db.User
                        }],
                        raw: true,
                        nest: true
                    });
                    if (list.length > 0) {
                        listJob.errCode = 0;
                        listJob.message = "Ok";
                        listJob.listJob = list;
                    } else {
                        listJob.errCode = 2;
                        listJob.message = "No data";
                        listJob.listJob = [];
                    }
                } else {
                    listJob.errCode = 1;
                    listJob.message = "Not Permission";
                    listJob.listJob = [];
                }

            } else {
                listJob.errCode = 3;
                listJob.message = "Not Login";
                listJob.listJob = [];
            }
            resolve(listJob);
        } catch (e) {
            reject(e);
        }
    })
}

let getJobByUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listJob = await db.Job.findAll({
                where: {
                    user: user.userId,
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

let updateJob = (user, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {}
            if (user.position != 1) {
                let job = await db.Job.findOne({
                    where: {
                        id: data.id
                    }
                });
                if (!job) {
                    message.errCode = 1;
                    message.message = "Job not found";
                } else {
                    job.name = data.name;
                    job.description = data.description;
                    await job.save();
                    message.errCode = 0;
                    message.message = "OK";
                }
            } else {
                message.errCode = 2;
                message.message = "Not Permission";
            }
            resolve(message);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteJob = (user, jobId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {};
            if (user.position != 1) {
                let job = await db.Job.findOne({
                    where: {
                        id: jobId
                    }
                });
                if (job) {
                    await job.destroy();
                    message.errCode = 0;
                    message.message = "Ok";
                } else {
                    message.errCode = 2;
                    message.message = "Not found data";
                }
            } else {
                message.errCode = 2;
                message.message = "Not Permission";
            }
            resolve(message)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllJobByRole: getAllJobByRole,
    getJobByUser: getJobByUser,
    postJob: postJob,
    updateStatusJob: updateStatusJob,
    updateJob: updateJob,
    deleteJob: deleteJob
}
import db from '../models/index';

let postReport = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.user && data.description) {
                await db.Report.create({
                    user: data.user,
                    label: 1, //chua xong
                    description: data.description
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

let getReportByRole = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listReport;
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            });
            if (user) {
                listReport = await db.Report.findAll({
                    include: [{
                        model: await db.User,
                        where: {
                            role: user.role
                        }
                    }],
                    raw: true,
                    nest: true
                });
            }
            resolve(listReport);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postReport: postReport,
    getReportByRole: getReportByRole
}
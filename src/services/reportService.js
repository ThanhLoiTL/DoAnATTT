import db from '../models/index';

let postReport = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.user && data.description) {
                await db.Report.create({
                    user: data.user,
                    label: 2, //chua xong
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

let getReportByRole = (user, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listReport = {};
            if (user) {
                let list = await db.Report.findAll({
                    include: [{
                        model: await db.User,
                        where: {
                            role: role
                        }
                    }],
                    raw: true,
                    nest: true
                });
                if (list.length > 0) {
                    let labelOfReport = await db.Label.findOne({
                        where: {
                            id: list[0].label
                        }
                    });
                    if (user.label >= labelOfReport.value) {
                        listReport.errCode = 0;
                        listReport.message = "Ok";
                        listReport.listReport = list;
                    } else {
                        listReport.errCode = 1;
                        listReport.message = "Not Permission";
                        listReport.listReport = [];
                    }
                } else {
                    listReport.errCode = 2;
                    listReport.message = "No data";
                    listReport.listReport = [];
                }

            } else {
                listReport.errCode = 3;
                listReport.message = "Not Login";
                listReport.listReport = [];
            }
            resolve(listReport);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteReport = (user, reportId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let report = {};
            let rept = await db.Report.findOne({
                where: {
                    id: reportId
                }
            });
            if (rept) {
                let labelOfReport = await db.Label.findOne({
                    where: {
                        id: rept.label
                    }
                });
                if (user.label >= labelOfReport.value) {
                    await rept.destroy();
                    report.errCode = 0;
                    report.message = "Ok";
                } else {
                    report.errCode = 1;
                    report.message = "Not Permission";
                }
            } else {
                report.errCode = 2;
                report.message = "Not found data";
            }
            resolve(report)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postReport: postReport,
    getReportByRole: getReportByRole,
    deleteReport: deleteReport
}
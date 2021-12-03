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

module.exports = {
    postReport: postReport
}
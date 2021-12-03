import db from '../models/index';

let getAllPartner = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listPartner = await db.Partner.findAll();
            resolve(listPartner);
        } catch (e) {
            reject(e);
        }
    })
}

let postPartner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.description && data.userId) {
                let user = await db.User.findOne({
                    where: {
                        id: data.userId
                    }
                });
                if (user) {
                    await db.Partner.create({
                        name: data.name,
                        description: data.description,
                        label: user.label
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
    getAllPartner: getAllPartner,
    postPartner: postPartner
}
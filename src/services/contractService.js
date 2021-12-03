import db from '../models/index';

let getAllContract = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listContract = await db.Contract.findAll();
            resolve(listContract);
        } catch (e) {
            reject(e);
        }
    })
}

let postContract = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.description && data.userId) {
                let user = await db.User.findOne({
                    where: {
                        id: data.userId
                    }
                });
                if (user) {
                    await db.Contract.create({
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
    getAllContract: getAllContract,
    postContract: postContract
}
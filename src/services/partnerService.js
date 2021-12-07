import db from '../models/index';

let getAllPartner = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listPartner = {};
            if (user) {
                let list = await db.Partner.findAll();
                if (list.length > 0) {
                    let labelOfPartner = await db.Label.findOne({
                        where: {
                            id: list[0].label
                        }
                    });
                    if (user.label >= labelOfPartner.value) {
                        listPartner.errCode = 0;
                        listPartner.message = "Ok";
                        listPartner.listPartner = list;
                    } else {
                        listPartner.errCode = 1;
                        listPartner.message = "Not Permission";
                        listPartner.listPartner = [];
                    }
                } else {
                    listPartner.errCode = 2;
                    listPartner.message = "No data";
                    listPartner.listPartner = [];
                }

            } else {
                listPartner.errCode = 3;
                listPartner.message = "Not Login";
                listPartner.listPartner = [];
            }
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

let updatePartner = (user, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {}
            let partner = await db.Partner.findOne({
                where: {
                    id: data.id
                }
            });
            if (!partner) {
                message.errCode = 1;
                message.message = "Partner not found";
            } else {
                let labelOfPartner = await db.Label.findOne({
                    where: {
                        id: partner.label
                    }
                });
                if (user.label >= labelOfPartner.value) {
                    partner.name = data.name;
                    partner.description = data.description;
                    await partner.save();
                    message.errCode = 0;
                    message.message = "OK";
                } else {
                    message.errCode = 2;
                    message.message = "Not Permission";
                }
            }
            resolve(message);
        } catch (e) {
            reject(e);
        }
    })
}

let deletePartner = (user, partnerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {};
            let partner = await db.Partner.findOne({
                where: {
                    id: partnerId
                }
            });
            if (partner) {
                let labelOfPartner = await db.Label.findOne({
                    where: {
                        id: partner.label
                    }
                });
                if (user.label >= labelOfPartner.value) {
                    await partner.destroy();
                    message.errCode = 0;
                    message.message = "Ok";
                } else {
                    message.errCode = 2;
                    message.message = "Not Permission";
                }
            } else {
                message.errCode = 2;
                message.message = "Not found data";
            }
            resolve(message)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllPartner: getAllPartner,
    postPartner: postPartner,
    updatePartner: updatePartner,
    deletePartner: deletePartner
}
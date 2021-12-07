import db from '../models/index';

let getAllContract = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listContract = {};
            if (user) {
                let list = await db.Contract.findAll();
                if (list.length > 0) {
                    let labelOfContract = await db.Label.findOne({
                        where: {
                            id: list[0].label
                        }
                    });
                    if (user.label >= labelOfContract.value) {
                        listContract.errCode = 0;
                        listContract.message = "Ok";
                        listContract.listContract = list;
                    } else {
                        listContract.errCode = 1;
                        listContract.message = "Not Permission";
                        listContract.listContract = [];
                    }
                } else {
                    listContract.errCode = 2;
                    listContract.message = "No data";
                    listContract.listContract = [];
                }

            } else {
                listContract.errCode = 3;
                listContract.message = "Not Login";
                listContract.listContract = [];
            }
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

let updateContract = (user, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {}
            let contract = await db.Contract.findOne({
                where: {
                    id: data.id
                }
            });
            if (!contract) {
                message.errCode = 1;
                message.message = "Contract not found";
            } else {
                let labelOfContract = await db.Label.findOne({
                    where: {
                        id: contract.label
                    }
                });
                if (user.label >= labelOfContract.value) {
                    contract.name = data.name;
                    contract.description = data.description;
                    await contract.save();
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

let deleteContract = (user, contractId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {};
            let contract = await db.Contract.findOne({
                where: {
                    id: contractId
                }
            });
            if (contract) {
                let labelOfContract = await db.Label.findOne({
                    where: {
                        id: contract.label
                    }
                });
                if (user.label >= labelOfContract.value) {
                    await contract.destroy();
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
    getAllContract: getAllContract,
    postContract: postContract,
    updateContract: updateContract,
    deleteContract: deleteContract
}
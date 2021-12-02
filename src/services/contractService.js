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

module.exports = {
    getAllContract: getAllContract
}
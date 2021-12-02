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

module.exports = {
    getAllPartner: getAllPartner
}
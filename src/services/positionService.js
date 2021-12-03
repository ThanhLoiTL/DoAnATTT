import db from '../models/index';

let getAllPosition = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listPosition = await db.Position.findAll()
            resolve(listPosition);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllPosition: getAllPosition
}
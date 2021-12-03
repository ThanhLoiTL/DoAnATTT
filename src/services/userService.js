import db from '../models/index';

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExistEmail = await checkEmail(email);

            if (isExistEmail) {
                let user = await db.User.findOne({
                    //atributes: ['email', 'password', 'roleId'],
                    where: {
                        email: email
                    },
                    atributes: {
                        exclude: ['password']
                    },
                    raw: true
                })
                if (user) {
                    if (password === user.password) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        //khong hien thi password ra ngoai
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Password incorrect!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not exist in system!';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Email not exist in system!';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getUserByRole = (role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listUser = await db.User.findAll({
                where: {
                    role: role
                },
                include: [{
                    model: await db.Role
                }],
                raw: true,
                nest: true
            })
            resolve(listUser);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserById = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: idUser
                }
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let postUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.name && data.email && data.password && data.phone && data.address && data.avatar && data.role && data.position) {
                let isExistEmail = await checkEmail(data.email);
                if (isExistEmail) {
                    resolve({
                        message: "Email da ton tai"
                    });
                } else {
                    await db.User.create({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        phone: data.phone,
                        address: data.address,
                        avatar: data.avatar,
                        role: data.role,
                        position: data.position,
                        label: 1 //chua xong
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
    handleLogin: handleLogin,
    getUserByRole: getUserByRole,
    getUserById: getUserById,
    postUser: postUser
}
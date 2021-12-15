import db from '../models/index';
import generateJWT from '../authentication/generateJWT'

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
                        let payload = {};
                        payload.userId = user.id;
                        payload.label = user.label;
                        payload.role = user.role;
                        payload.name = user.name;
                        payload.position = user.position;

                        userData.token = generateJWT(payload);
                        userData.errCode = 0;
                        userData.message = 'OK';
                        //khong hien thi password ra ngoai
                        delete user.password;
                        //userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Password incorrect!';
                        userData.token = 'Error';
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not exist in system!';
                    userData.token = 'Error';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Email not exist in system!';
                userData.token = 'Error';
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

let getUserByRole = (user, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listUser = {};
            if (user) {
                if (user.position != 1) {
                    let list = await db.User.findAll({
                        where: {
                            role: role
                        },
                        include: [{
                            model: await db.Role
                        }],
                        raw: true,
                        nest: true
                    });
                    if (list.length > 0) {
                        listUser.errCode = 0;
                        listUser.message = "Ok";
                        listUser.listUser = list;
                    } else {
                        listUser.errCode = 2;
                        listUser.message = "No data";
                        listUser.listUser = [];
                    }
                } else {
                    listUser.errCode = 1;
                    listUser.message = "Not Permission";
                    listUser.listUser = [];
                }

            } else {
                listUser.errCode = 3;
                listUser.message = "Not Login";
                listUser.listUser = [];
            }
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

let postUser = (user, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {};
            if (user.position != 1) {
                if (data.name && data.email && data.password && data.phone && data.address && data.avatar && data.role && data.position) {
                    let isExistEmail = await checkEmail(data.email);
                    if (isExistEmail) {
                        message.errCode = 1;
                        message.message = "Email existed";
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
                            label: 1
                        })
                        message.errCode = 0;
                        message.message = "OK";
                    }
                }
            } else {
                message.errCode = 3;
                message.message = "Not Permission";
            }

            resolve(message);
        } catch (e) {
            reject(e);
        }
    })
}

let getUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.userId
                },
                raw: true
            });
            delete user.password;
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let checkRoleOfUser = (user, roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(roleId);
            console.log(user.role);
            let data = {};
            if (user.role == roleId) {
                data.errCode = 0;
                data.message = "OK";
            } else {
                data.errCode = 1;
                data.message = "Not Permission";
            }
            resolve(data);
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (user, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {}
            if (user.position != 1) {
                if (data.id && data.name && data.phone && data.address) {
                    let u = await db.User.findOne({
                        where: {
                            id: data.id
                        }
                    });
                    if (!u) {
                        message.errCode = 1;
                        message.message = "User not found";
                    } else {
                        u.name = data.name;
                        u.phone = data.phone;
                        u.address = data.address;
                        await u.save();
                        message.errCode = 0;
                        message.message = "OK";
                    }
                } else {
                    message.errCode = 3;
                    message.message = "Missing value";
                }
            } else {
                message.errCode = 2;
                message.message = "Not Permission";
            }
            resolve(message);

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (user, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = {};
            if (user.position != 1) {
                let u = await db.User.findOne({
                    where: {
                        id: userId
                    }
                });
                if (u) {
                    await u.destroy();
                    message.errCode = 0;
                    message.message = "Ok";
                } else {
                    message.errCode = 2;
                    message.message = "Not found data";
                }
            } else {
                message.errCode = 2;
                message.message = "Not Permission";
            }
            resolve(message)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    getUserByRole: getUserByRole,
    getUserById: getUserById,
    postUser: postUser,
    getUser: getUser,
    checkRoleOfUser: checkRoleOfUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing data"
        })
    }

    let userData = await userService.handleLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let getUserByRole = async (req, res) => {
    let role = req.query.role;
    if (!role) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let listUser = await userService.getUserByRole(role);
    return res.status(200).json({
        listUser: listUser ? listUser : []
    });
}

let getUserById = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing data'
        })
    }
    let user = await userService.getUserById(id);
    return res.status(200).json({
        user: user ? user : {}
    });
}

module.exports = {
    handleLogin: handleLogin,
    getUserByRole: getUserByRole,
    getUserById: getUserById
}
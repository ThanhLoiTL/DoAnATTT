import JWT from 'jsonwebtoken'

let generateJWT = (payload) => {
    return JWT.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '216000s'
    })
}

module.exports = generateJWT;
import JWT from 'jsonwebtoken'

let authenticateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(400).json({
                message: "Not JWT"
            });
        }
        JWT.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "JWT not found"
                });
            }
            req.user = user;
            next();
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error JWT"
        });
    }
}

module.exports = {
    authenticateToken: authenticateToken
}
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (['/login', '/import'].includes(req.path) || req.path.includes('/user')) {
        return next()
    }

    try {
        if (token) {
            const decoded = jwt.verify(token, SECRET_KEY);

            req.user = decoded
            next()
        } else {
            res.status(401).json({ message: 'UNAUTHORIZED' });
        }

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token',
            error: error.message
        });
    }
}
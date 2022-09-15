
const jwt = require("jsonwebtoken")
exports.authRequired =(req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(402).json({ error: "Please login"})
    }

    const token = authorization.split(" ")[1]
    if (!token) {
        return res.status(402).json ({ error: "Please login"})
    }

    const user = jwt.verify(
      token,
      "37adf5a8cc670b4608ed1454356995e91df5953fde95e58c2ceb3a9a63e80644"
    );

    req.user = user;
 next();
};
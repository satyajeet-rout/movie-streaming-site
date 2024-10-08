const jwt = require("jsonwebtoken")

async function verify(req,res,next) {
    const authHeader = await req.headers.token;
    console.log("hello")
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
    
}

module.exports = verify
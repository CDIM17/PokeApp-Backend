const jwt = require('jsonwebtoken');

const validateJWT = (req,res,next) => {

    const token = req.header('x-token');

    if(!token)
    {
        return res.status(401).json({
            success:false,
            message:'Invalid Token'
        })
    }

    try{

        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next();

    }
    catch(error){

        return res.status(401).json({
            success:false,
            message:'Invalid Token'
        });

    }

}

module.exports = {
    validateJWT
}
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('jwt');
    if(!token) return res.status(401).json({error: 'Access denied!'});

    try{
        jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(400).json({error: 'Invalid Token'});
    }
    next();
}
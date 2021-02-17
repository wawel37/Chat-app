const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('jwt');
    if(token === 'null'){ 
        return res.status(401).json({error: 'Access denied!'});
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(400).json({error: 'Invalid Token'});
    }
    next();
}
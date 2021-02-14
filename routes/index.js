const router = require('express').Router();

router.get('/', (req,res,next)=>{
    res.send('we are on the main page!');
});


module.exports = router;
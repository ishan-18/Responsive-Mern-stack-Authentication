const router = require('express').Router();
const auth = require('../middleware/auth');

router.get("/home", auth, async (req,res)=>{
    try {
        res.json({msg: "Home Page"});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

module.exports = router;
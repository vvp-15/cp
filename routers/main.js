const express = require('express')
const router = express.Router();
const User = require('../db/mongoose')
const bcrypt = require('bcryptjs')
// var popupS = require('popups');

router.post('/register', async(req,res) => {
    // console.log('reached here too...')
    // console.log(req.body)
    const cpassword = req.body.cpassword;
    const password = req.body.password;
    if(cpassword!== password)
    {
       console.log('password didnt match')
    }
    else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        // console.log(hash)
    const me = new User(req.body)
         me.password = hash;
        try{
            await me.save()
            
            res.send(me)
        }
        catch(e){
            res.status(400).send({
                error:"there is an error"
            })
        }
    }
})
router.post('/login' ,async(req,res) => {
    try{
        const user =await User.findOne({email:req.body.email})
        if(bcrypt.compare(req.body.password,user.password))
            {res.send({
                Success : 'YOU are logged in'
                })
            }
        else{
            res.send({
                Wrong : 'Invalid credentials'
                })
        }
       }catch(e){
        res.status(500).send({
            ERROR :"internal server error"
        })
}

})

module.exports = router;
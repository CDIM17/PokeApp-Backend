const {response}    = require('express');
const User          = require('../models/user.model');
const bcrypt        = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');


const login = async(req,res) => {

    const {email,password} = req.body;

    try{

        const userDB = await User.findOne({email});

        if(!userDB)
        {
            return res.status(404).json({
                success:false,
                message:'Email not Found!!å'
            })
        }

        const validPassword = bcrypt.compareSync(password,userDB.password);

        if(!validPassword)
        {
            return res.status(400).json({
                success:false,
                message:'Invalid Password'
            })
        }

        const token = await generateJWT(userDB.id);

        res.status(200).json({

            success:true,
            message:'Login',
            token
        });

    }catch(error){
        console.log(error);

        res.status(500).json({

            success:false,
            message:'Contact Tech Support'

        });
    }

}

const renewToken = async(req,res = response) => {

    const uid = req.uid;

    const token = await generateJWT(uid);

    const UserDB = await User.findById({_id: uid});

    res.json({
        success:true,
        token,
        user:UserDB
    })

}

module.exports = {
    login,
    renewToken
};
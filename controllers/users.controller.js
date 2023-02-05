const User          = require('../models/user.model');
const {response}    = require('express');
const bcrypt        = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');


const getUsers = async (req,res) => {

  try
  {
    const usuarios =  await User.find();                  

    res.json({
        success:true,
        data: usuarios,
        message:'Get Users'
    });
  }
  catch(error)
  {
    res.status(500).json({
        success:false,
        data:null,
        message:'Contact your system administrator!!'
    });
  }

}


const createUser = async(req,res = response) => {

   const {email,password} = req.body;

   try{

    const emailExist = await User.findOne({email});

    if(emailExist)
    {
        return res.status(400).json({
            success:false,
            data:null,
            msg:'This User is already registered!!'
        });
    }

    const user = new User(req.body);

    user.password = EncryptPassword(password);

    const newUser = await user.save();

    const token = await generateJWT(newUser.id);

    res.json({
        success:true,
        data:newUser,
        message:'Create User',
        token
    });

   }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            data:null,
            message:'Contact your system administrator!!'
        });
   }

}

const updateUser = async(req,res = response) => {

    const uid = req.params.id;

    try{

        const userDB = await User.findById(uid);

        if(!userDB)
        {
            return res.status(404).json({
                    success:false,
                    data:null,
                    message:'This User does not exists!!'

            })
        }

        const {email,password,...fields} = req.body;

         fields.email = email;
         fields.password = EncryptPassword(password);

        if(userDB.email !== email)
        {
            const emailExists = await User.findOne({email});

            if(emailExists)
            {
                return res.status(400).json({
                        success:false,
                        data:null,
                        message:'There is already an user with that email',
                })
            }
        }

        const userUpdated = await User.findByIdAndUpdate(uid,fields,{new:true});

         res.json({
            success:true,
            message:'Update User',
            usuario: userUpdated
         })
    }
    catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            data:null,
            message:'Contact your system administrator!!'
        })

    }

}

const deleteUser = async(req,res,next) => {

    const uid = req.params.id;

   try{

    const userDB = User.findById(uid);

    if(!userDB)
    {
        res.status(404).json({
            success:false,
            message:'User not Found',
            data:null
        })
    }

    await User.findByIdAndDelete(uid);

    res.status(200).json({
        success:true,
        message:'User deleted!!',
        data:null
    })
   }
   catch(error)
   {
        console.log(error);

        res.status(500).json({
            success:false,
            message:'Contact Tech Support!!',
            data:null
        })
   }

}

const EncryptPassword = (password) => {
    const salt    = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
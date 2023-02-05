/*
Ruta: /api/usuarios
*/
const {Router} = require('express');
const {check}  = require('express-validator');
const {getUsers,createUser,updateUser,deleteUser} = require('../controllers/users.controller');
const {validateFields} = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.get('/',[validateJWT],getUsers);


router.post('/', [
                    check('firstName','The firstname is required').not().isEmpty(),
                    check('password','The password is required').not().isEmpty(),
                    check('email','Invalid Email Format').isEmail(),
                    check('email','The email is required').not().isEmpty(),
                    validateFields
                ],  
                createUser);

 router.put('/:id',[
                    validateJWT,
                    check('firstName','The firstname is required').not().isEmpty(),
                    check('lastName','The firstname is required').not().isEmpty(),

                    check('email','Invalid Email Format').isEmail(),
                    validateFields
                   ],  
                updateUser);

router.delete('/:id',[validateJWT],deleteUser);                


module.exports = router;
import { Router } from "express";
const router = Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../db/models/user.model";


router.post('/signup', async (req, res) => {
    const {name, email, password, address} = req.body;

    try {
        const user = await User.findOne({email})

        if(user) {
            throw new Error('User already exists, try login?')
        }
    
        const password_digest = await bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))
        const newUser = {   
            name,
            email,
            password_digest,
            address,
            isAdmin: false
        }
   
        User.create(newUser)
    } catch(err) {
        res.json(err)
    }
});

router.post('/login', async (req, res, next) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        
        if(user && await bcrypt.compare(password, user.password_digest)) {
            const token = jwt.sign(user, process.env.SECRET!, {expiresIn: '24h'}) 
            res.json({
                id: user.id,
                email: user.email,
                name: user.name,
                address: user.address,
                isAdmin: user.isAdmin,
                token: token
            })
        } else {
            throw new Error('invalid email or password')
        }   
    } catch (err) {
        console.log(err)
        next(err)
    }
})

export default router
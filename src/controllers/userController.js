import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from "../models/userModel";

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' })
    }
}

export const register = (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body);
    console.log(newUser);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10)
    console.log(newUser)
    newUser.save()
        .then(user => {
            user.hashPassword = undefined
            return res.status(200).json(newUser);
        })
        .catch(err => {
            return res.status(400).send({
                message: err
            })
        })
}

export const login = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            console.log(user);
            if (!user) {
                res.status(401).json({ message: 'Authentication failed. No user found' });
            } else if (user) {
                console.log(req.password);
                console.log(user.hashPassword);

                if (!user.comparePassword(req.body.password, user.hashPassword)) {
                    res.status(401).json({ message: 'Authentication failed. Wrong password.' })
                } else {
                    return res.json({ token: jwt.sign({ email: user.email, username: user.username, _id: user.id }, 'RESTFULAPI') })
                }
            }
        })
        .catch(err => {
            if (err) throw err
        })
}

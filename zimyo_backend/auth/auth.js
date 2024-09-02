import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import UserService from '../services/user.service.js';
import { catchHandler } from '../utils/handlers/catchHandler.js';
import { successHandler } from '../utils/handlers/successHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'zimyo-assignment';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h',
    });
};

export const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("BODY",req.body)

        const existingUser = await UserService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("BEFORE SAVING -------------------")
        const newUser = await UserService.createUser({
            username,
            email,
            password: hashedPassword,
        });
        console.log("AFTER SAVING -------------------")

        const token = generateToken(newUser);
        console.log("TOKEN",token)
        return successHandler(
            res,
            'User registered successfully',
            {
                user: { id: newUser.id, username: newUser.username, email: newUser.email },
                token
            }
        )
    } catch (error) {
        console.log("Error in registration ", error)
        return catchHandler(error, res)
    }
};


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(user);

        return successHandler(
            res,
            'Logged in successfully',
            {
                user: { id: user.id, username: user.username, email: user.email },
                token
            })
    } catch (error) {
        console.log("Error in logging in ", error)
        return catchHandler(error, res)
    }
};
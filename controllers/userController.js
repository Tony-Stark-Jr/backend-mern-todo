import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { sendCookie } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';

export const getAllUsers = async (req, res) => {
};



export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select('+password');

        if (!user) return next(new ErrorHandler("Invalid email or passord", 404))


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return next(new ErrorHandler("Invalid email or passord", 401))

        sendCookie(user, res, `Welcome back ${user.firstName}`, 200)
    } catch (error) {
        next(error.message)
    }
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        let user = await User.findOne({ email })

        if (user) return next(new ErrorHandler("User already exist", 409))

        user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        sendCookie(user, res, "Registered successfully", 201)
    } catch (error) {
        next(error.message)
    }
};

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    })
};

export const logout = (req, res) => {

    res.status(200)
        .cookie('token', '', {
            expires: new Date(0),
            sameSite: process.env.NODE_ENV === 'Development' ? 'Lax' : 'None',
            secure: process.env.NODE_ENV === 'Development' ? false : true
        }).json({
            success: true,
            message: "Your are logout successfully"
        })
};

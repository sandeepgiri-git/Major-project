import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js';

export async function userAuth(req, res, next) {
    const token = req.headers['authorization'];
    // console.log("token is:", token)
    try{
        if(!token) {
            return res.json({
                success: false,
                message: "Token not provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await User.findById(decoded.id).select('-password');

        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        // console.log("hit")


        if(!user.isOnboarded) {
            return res.json({
                success: false,
                message: "Please complete the profile first"
            })
        }

        req.user = user;
        next();
    }
    catch(error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function login(req, res) {
    const {email, password} = req.body;

    try {
        if(!email || !password) {
            return res.json({
                success: false,
                message: "All fields required"
            })
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                success: false,
                message: "User Not exist.. Please create Account first"
            })
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass) {
            return res.json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.json({
            success: true,
            token: token
        })


    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function myInfo(req, res) {
    const token = req.headers["authorization"];

    try {
        if(!token) {
            return res.json({
                success: false,
                message: "All fields required"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) {
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }

        // get user without password
        const user =  await User.findById(decode.id).select("-password");

        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        
        return res.json({
            success: true,
            // send user without password
            user
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function signup (req, res) {
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }
        const isUser = await User.findOne({email});

        if(isUser) {
            // console.log(isUser)
            return res.json({   
                success: false,
                message: "User already exist, Please login !"
            });
        }
        const encryptPass = bcrypt.hashSync(password, 10);
        // console.log(encryptPass)
        // console.log("asberveriverlvnervner")
        if(!encryptPass) {
            return res.json({
                success: false,
                message: "failed to hash"
            })
        }
        const user = new User({name, email, password: encryptPass});
        await user.save();
        
        return res.json({
            success: true,
            message: "Account created successfully! Please Login"
        })

    }catch(e) {
        return res.json({
            success: false,
            // error: "failed",
            message: e.message
        })
    }
}
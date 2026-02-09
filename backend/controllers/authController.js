import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendForgetPasswordMail, sendMail } from "../middleware/sendMail.js";

export const forgetPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email}).select('-password');
        if(!user) {
            return res.json({
                success: false,
                message: "No user found with this email"
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {
                expiresIn: "10m" 
            }
        )
        
        const isSent = sendForgetPasswordMail(email, "Password Reset Link", token, "http://localhost:3000/reset-password");

        if(isSent) {
            return res.json({
                success: true,
                message: "Password reset link sent to your email"
            })
        }

        return res.json({
            success: false,
            message: "Failed to send email"
        })        

    }
    catch(error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function resetPassword(req,res) {
    const {password} = req.body;
    const token = req.headers['authorization'];

    try {
        if(!token){
            return res.json({
                success : false,
                message : "token not found"
            })
        }
        if(!password){
            return res.json({
                success : false,
                message : "please enter the password"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) {
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }

        const hashed = bcrypt.hashSync(password, 10);

        // save to user
        User.findByIdAndUpdate(decode.id, {password: hashed}, {new: true}).then((user) => {
            if(!user) {
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }
            return res.json({
                success: true,
                message: "Password reset successful"
            })
        }
        ).catch((error) => {            
            return res.json({
                success: false,
                message: error.message
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function login(req, res) {
    const {email, password} = req.body;
    // console.log(req.body)
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
            token: token,
            user,
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
    // console.log("hit")
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
        const otp = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

        const user = {
            name, 
            email, 
            password: encryptPass,
            otp: Number(otp)
        }
        
        const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "10m"});
        console.log(user);
        sendMail(email, "Your Verification Code for AI Interview", otp);
        return res.json({
            success: true,
            token: token
        })

    }catch(e) {
        return res.json({
            success: false,
            // error: "failed",
            message: e.message
        })
    }
}

export async function checkOtp(req, res) {
    const {otp, token} = req.body;

    if(!otp || !token) {
        return res.json({
            success: false, 
            message: "All fields Required"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode) {
            return res.json({
                success: false, 
                message: "Invalid Token"
            }) 
        }

        if(Number(otp) != decode.otp) {
            return res.json({
                success: false, 
                message: "Invalid Otp"
            })
        }

        const user = new User({
            name: decode.name, 
            email: decode.email, 
            password: decode.password
        });

        await user.save();

        return res.json({
            success: true, 
            user
        })
    }
    catch(e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
}

export async function onBoarding(req, res) {
    const {targetRoles, technicalSkills} = req.body;
    // console.log(targetRoles, technicalSkills)
    const token = req.headers['authorization'];
    try {
        if(!token) {
            return res.json({
                success: false,
                message: "Token not found"
            })
        }
        if(!targetRoles || !technicalSkills) {
            return res.json({
                success: false,
                message: "All fields required"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }
        // console.log(decoded);
        const user = await User.findById(decoded.id);
        
        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        user.targetRoles = targetRoles;
        user.technicalSkills = technicalSkills; 
        user.isOnboarded = true;

        await user.save();

        return res.json({
            success: true,
            user,
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
import Interview from "../models/InterviewModel.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import {getQuestions} from "../utils/gemini/getQuestions.js"

export async function getInterviewById(req,res) {
    const {id} = req.body;
    const token = req.headers["authorization"];

    try {
        if(!token) {
            return res.json({
                success: false,
                message: "token not provided"
            })
        }
        if(!id) {
            return res.json({
                success: false,
                message: "id not provided"
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }

        const user = await User.findOne({email: decoded.email});
        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const interviewId = user.createdInterviews.find((e) => e._id == id);
        if(!interviewId) {
            return res.json({
                success: false,
                message: "interview not found"
            })
        }
        const interview = await Interview.findById(interviewId);

        return res.json({
            success: true,
            interview
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function createInterview(req, res) {
    const {title, role, difficiulty, scheduledDate, 
        jobDescription, interviewer, questionCount
    } = req.body;
    const token = req.headers["authorization"];

    try {
        if(!token) {
           return res.json({
                success: false,
                message: "Invalid Token"
            }) 
        }
        if(!title || !role || !difficiulty ) {
            return res.json({
                success: false,
                message: "All field Required"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await User.findOne({email: decoded.email});

        if(!user) {
            return res.json({
                success: false,
                message: "Please create account first"
            })
        }

        const interview = await Interview({title, role, difficiulty, scheduledDate, 
            jobDescription, interviewer, questionCount
        })

        const questions = await getQuestions(interview);

        // questions.forEach((element) => {
            
        // });
        
        await interview.save();

        user.createdInterviews.push(interview._id);
        await user.save();
        return res.json({
            success: true,
            interview,
            questions
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function deleteInterview(req, res) {
    const {id} = req.body;
    const {token} = req.headers["authorization"];

    try {
        if(!id) {
            return res.json({
                success: false,
                message: "All fields required"
            })
        }
        if(!token) {
            return res.json({
                success: false,
                message: "Unauthorized"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.json({
                success: false,
                message: "User Not found"
            })
        }

        await Interview.findByIdAndDelete(id);

        // wants to delete the interview entry from createdinterview array
        user.createdInterviews = user.createdInterviews.filter((interviewId) => interviewId != id);
        await user.save();
        
        return res.json({
            success: true,
            message: "Interview deleted successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// 0 0 1 0
// 1 0 0 0
// 0 0 0 1
// 0 1 0 0
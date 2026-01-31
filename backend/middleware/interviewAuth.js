import Interview from "../models/InterviewModel.js";

export async function updateSession(req, res, next) {
    const interview = req.interview;

    try {
        const date = new Date();
        if(interview.sessionStatus == "running" && date > interview.endTime) {
            interview.sessionStatus = "attempted";
            await interview.save();
        }   
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function sessionAuth(req, res, next) {
    const interview = req.interview;
    
    try {

        if(interview.sessionStatus == "pending") {
            // console.log("1")
            return res.json({
                success: false,
                message: "Interview not started yet"
            })
        }

        if(interview.sessionStatus == "attempted") {
            // console.log("2")
            return res.json({
                success: false,
                message: "Interview ended"
            })
        }

        next();
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function interviewAuth(req, res, next) {
    const id = req.params.id;
    // console.log("id is: ",id)
    try {
        if(!id) {
            return res.json({
                success: false,
                message: "All fields required"
            })
        }

        const interview = await Interview.findById(id);
        // console.log(interview)

        if(!interview) {
            return res.json({
                success: false,
                message: "Interview Not found"
            })
        }

        // console.log(interview.userId, req.user._id)
        if(toString(interview.userId) != toString(req.user._id)){
            return res.json({
                success: false,
                message: "Interview not found "
            })
        }

        req.interview = interview;

        next();
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
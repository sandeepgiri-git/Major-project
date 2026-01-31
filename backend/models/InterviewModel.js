import {mongoose} from 'mongoose';

const interviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    role: {type: String, required: true},
    difficulty: {type: String, required: true},
    interviewType: {type: String,enum: ["behavioral", "technical", "mix"], required: true},  
    questionCount: {type: Number, default: 5},
    jobDescription: {type: String},

    scheduledDate: {type: Date, default: Date.now},
    activeWindow: {type: Date},
    scheduledStatus: {type: String, enum: ['scheduled', 'completed', 'active'], default: 'scheduled'},
    duration: {type: Number, default: 15},
    startTime: {type: Date},
    endTime: {type: Date},
    sessionStatus: {type: String, enum: ['attempted', 'running', 'pending'], default: 'pending'},

    interviewer: {type: String},  
    responses: [
        {
            question: {type: String},
            topic: {type: String},
            // can be easy, medium, hard
            difficulty: {type: String},
            userAnswer: {type: String},
            expectedAnswer: {type: String},
            feedback: {type: String},
            score: {type: Number},
        }
    ],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    summary: {type: mongoose.Schema.Types.ObjectId, ref: 'Summary'}
}, {timestamps: true});

interviewSchema.pre("save", function(next) {
  if (!this.activeWindow && this.scheduledDate) {
    this.activeWindow = new Date(this.scheduledDate.getTime() + 24 * 60 * 60 * 1000);
  }
  next();
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
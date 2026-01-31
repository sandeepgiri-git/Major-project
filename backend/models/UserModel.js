import {mongoose} from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    isOnboarded: {type: Boolean, default: false},
    targetRoles: {type: [String]},
    technicalSkills: {type: [String]},
    
    createdInterviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Interview'}],

    // createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
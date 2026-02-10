import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['Student', 'Warden', 'Admin', 'Parent'],
        required: true,
        default: 'Student'
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    // Reference to role-specific data
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    passwordResetToken: String,
    passwordResetExpires: Date,

    // For Wardens
    hostelIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HostelBlock' }],
    isVerified: { type: Boolean, default: false },
    documentsSubmitted: { type: Boolean, default: false },

    // For Students
    canAccessDashboard: { type: Boolean, default: false },
    enrolledHostelId: { type: mongoose.Schema.Types.ObjectId, ref: 'HostelBlock' }
}, { timestamps: true });

// Performance Indexes
UserSchema.index({ role: 1 });
UserSchema.index({ studentId: 1 });
UserSchema.index({ isActive: 1 });

// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Don't return password in JSON
UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.passwordResetToken;
    delete obj.passwordResetExpires;
    return obj;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);

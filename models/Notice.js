import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },

    // Link to Hostel
    hostelBlockId: { type: mongoose.Schema.Types.ObjectId, ref: 'HostelBlock', required: true },

    type: {
        type: String,
        enum: ['Emergency', 'Important', 'General'],
        default: 'General'
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },

    // Source
    from: {
        role: { type: String, required: true }, // "Warden", "College Admin", "Hostel Committee"
        name: { type: String, required: true },
    },

    // Target Audience
    targetAudience: {
        type: { type: String, enum: ['All', 'Specific Blocks', 'Specific Years'], default: 'All' },
        blockIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HostelBlock' }],
        years: [{ type: Number }],
    },

    // Attachments
    attachments: [{
        name: { type: String },
        url: { type: String },
    }],

    // Expiry & Status
    expiryDate: { type: Date },
    isActive: { type: Boolean, default: true },

    // Acknowledgements
    acknowledgements: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        acknowledgedAt: { type: Date, default: Date.now },
    }],
}, { timestamps: true });

const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);

export default Notice;

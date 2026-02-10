import mongoose from 'mongoose';

const HostelApplicationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    hostelBlockId: { type: mongoose.Schema.Types.ObjectId, ref: 'HostelBlock', required: true },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Withdrawn'],
        default: 'Pending'
    },
    applicationData: {
        course: { type: String },
        year: { type: Number },
        guardianInfo: {
            name: { type: String },
            relation: { type: String },
            phone: { type: String }
        },
        preferredRoomType: { type: String },
        moveInDate: { type: Date }
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Warden
    reviewedDate: { type: Date },
    notes: { type: String }
}, { timestamps: true });

// Performance Indexes
HostelApplicationSchema.index({ studentId: 1 });
HostelApplicationSchema.index({ hostelBlockId: 1 });
HostelApplicationSchema.index({ status: 1 });

const HostelApplication = mongoose.models.HostelApplication || mongoose.model('HostelApplication', HostelApplicationSchema);

export default HostelApplication;

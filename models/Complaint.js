import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },

    // Complaint Details
    category: {
        type: String,
        enum: ['Electrical', 'Plumbing', 'Cleaning', 'WiFi', 'Mess', 'Other'],
        required: true
    },
    location: {
        type: { type: String, enum: ['Room', 'Common Area'], required: true },
        roomNumber: { type: String },
        areaName: { type: String }, // "Ground Floor Bathroom", "Study Hall", etc.
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{ type: String }],

    // Priority & Status
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
        default: 'Pending'
    },

    // Assignment
    assignedTo: {
        name: { type: String },
        role: { type: String }, // "Electrician", "Plumber", etc.
        phone: { type: String },
    },
    assignedDate: { type: Date },
    eta: { type: Date }, // Estimated time of resolution

    // Resolution
    resolutionNotes: { type: String },
    resolutionPhotos: [{ type: String }],
    resolvedDate: { type: Date },

    // Feedback
    studentRating: { type: Number, min: 1, max: 5 },
    studentFeedback: { type: String },
}, { timestamps: true });

const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);

export default Complaint;

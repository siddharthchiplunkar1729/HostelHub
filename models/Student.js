import mongoose from 'mongoose';

const PreferencesSchema = new mongoose.Schema({
    sleepTime: { type: String }, // "10 PM - 6 AM"
    studyHours: { type: String }, // "Morning person" / "Night owl"
    cleanliness: { type: Number, min: 1, max: 5, default: 3 },
    musicPreference: { type: String }, // "Quiet" / "Moderate" / "Lively"
    guests: { type: String }, // "Rarely" / "Sometimes" / "Often"
}, { _id: false });

const GuardianSchema = new mongoose.Schema({
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
}, { _id: false });

const StudentSchema = new mongoose.Schema({
    // Personal Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    photo: { type: String },
    dateOfBirth: { type: Date },
    hometown: { type: String },

    // Academic Info
    rollNumber: { type: String, required: true, unique: true },
    course: { type: String, required: true }, // CSE, ECE, Mechanical, etc.
    year: { type: Number, required: true, min: 1, max: 5 },
    department: { type: String, required: true },

    // Room Info
    hostelBlockId: { type: mongoose.Schema.Types.ObjectId, ref: 'HostelBlock' },
    roomNumber: { type: String },
    floorNumber: { type: Number },
    allocationDate: { type: Date },

    // Roommates
    roommateIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],

    // Preferences
    preferences: { type: PreferencesSchema },

    // Guardian Info
    guardianInfo: { type: GuardianSchema, required: true },
    emergencyContact: { type: String, required: true },

    // Hostel Fee
    feeStatus: {
        totalAmount: { type: Number, default: 0 },
        paidAmount: { type: Number, default: 0 },
        dueDate: { type: Date },
        isPaid: { type: Boolean, default: false },
    },

    // Attendance
    attendanceCount: { type: Number, default: 0 },
    lastAttendance: { type: Date },

    // Marketplace Enrollment
    enrollmentStatus: {
        type: String,
        enum: ['Prospective', 'Applied', 'Accepted', 'Enrolled', 'Rejected', 'Alumni'],
        default: 'Prospective'
    },
    applicationDate: { type: Date },
    acceptanceDate: { type: Date },
    applicationNotes: { type: String },
    loginCredentialsIssued: { type: Boolean, default: false },
    dashboardAccessGranted: { type: Date },
}, { timestamps: true });

// Performance Indexes
StudentSchema.index({ hostelBlockId: 1 });
StudentSchema.index({ enrollmentStatus: 1 });

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;

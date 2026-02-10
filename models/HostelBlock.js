import mongoose from 'mongoose';

const WardenSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String },
}, { _id: false });

const HostelBlockSchema = new mongoose.Schema({
    blockName: { type: String, required: true }, // A Block, B Block, etc.
    type: { type: String, enum: ['Boys', 'Girls', 'Co-ed'], required: true },
    description: { type: String, required: true },
    totalRooms: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    occupiedRooms: { type: Number, default: 0 },
    wardenInfo: { type: WardenSchema, required: true },
    wardenUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Suspended'],
        default: 'Pending'
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedDate: { type: Date },
    rejectionReason: { type: String },
    facilities: [{ type: String }], // WiFi, Laundry, Common Room, Sports, Library, Gym
    images: [{ type: String }],
    virtualTourUrl: { type: String },
    floors: { type: Number, default: 3 },
    roomsPerFloor: { type: Number, default: 20 },
    location: { type: String, required: true }, // Campus area/zone
    rating: { type: Number, default: 0 },
    reviews: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        rating: { type: Number, required: true, min: 1, max: 5 },
        reviewText: { type: String, required: true },
        helpful: { type: Number, default: 0 },
        photos: [{ type: String }],
        createdAt: { type: Date, default: Date.now }
    }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userType: { type: String, enum: ['Student', 'Parent', 'Alumni', 'Warden'] },
        text: { type: String, required: true },
        replies: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }],
        createdAt: { type: Date, default: Date.now }
    }],
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    rooms: [{
        roomNumber: { type: String, required: true },
        status: { type: String, enum: ['Available', 'Full'], default: 'Available' },
        occupants: { type: Number, default: 0 },
        capacity: { type: Number, default: 2 }
    }]
}, { timestamps: true });

// Performance Indexes
HostelBlockSchema.index({ blockName: 1 });
HostelBlockSchema.index({ type: 1 });
HostelBlockSchema.index({ approvalStatus: 1 });
HostelBlockSchema.index({ rating: -1 });
HostelBlockSchema.index({ location: 1 });

const HostelBlock = mongoose.models.HostelBlock || mongoose.model('HostelBlock', HostelBlockSchema);

export default HostelBlock;

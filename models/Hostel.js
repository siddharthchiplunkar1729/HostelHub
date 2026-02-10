import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

const HostelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    amenities: [String],
    images: [String],
    type: { type: String, enum: ['Student', 'Backpacker'], required: true },
    gender: { type: String, enum: ['Boys', 'Girls', 'Co-ed'], default: 'Co-ed' },
    messAvailable: { type: Boolean, default: false },
    reviews: [ReviewSchema]
}, { timestamps: true });

// Check if model executes to prevent OverwriteModelError
const Hostel = mongoose.models.Hostel || mongoose.model('Hostel', HostelSchema);

export default Hostel;

import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userAvatar: { type: String, required: true },
    hostelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel' },
    hostelName: { type: String, required: true },
    content: { type: String, required: true, maxLength: 280 },
    image: { type: String },
    category: { type: String, enum: ['Experience', 'Tip', 'Review'], default: 'Experience' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);

export default Story;

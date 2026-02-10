import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    memberCount: { type: Number, default: 0 },
    category: { type: String, enum: ['Travel', 'Students', 'Remote Work', 'Adventure'], required: true },
    image: { type: String },
    icon: { type: String } // emoji or icon identifier
}, { timestamps: true });

const Community = mongoose.models.Community || mongoose.model('Community', CommunitySchema);

export default Community;

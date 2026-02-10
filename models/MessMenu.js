import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
    mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Snacks', 'Dinner'], required: true },
    items: [{ type: String }],
    timings: { type: String }, // "7:00 AM - 9:00 AM"
    calories: { type: Number },
    isVeg: { type: Boolean, default: true },
    thumbsUp: { type: Number, default: 0 },
    thumbsDown: { type: Number, default: 0 },
    ratedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { _id: false });

const MessMenuSchema = new mongoose.Schema({
    hostelBlockId: { type: mongoose.Schema.Types.ObjectId, ref: 'HostelBlock', required: true },
    date: { type: Date, required: true },
    day: { type: String, required: true }, // "Monday", "Tuesday", etc.
    meals: [MealSchema],
    specialMenu: { type: Boolean, default: false }, // For festivals, events
    notes: { type: String }, // "Birthday special", "Festival menu", etc.
}, { timestamps: true });

// Ensure unique menu per date per hostel
MessMenuSchema.index({ date: 1, hostelBlockId: 1 }, { unique: true });

const MessMenu = mongoose.models.MessMenu || mongoose.model('MessMenu', MessMenuSchema);

export default MessMenu;

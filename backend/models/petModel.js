import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        default: 0
    },
    activityLevel: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        default: 'moderate'
    },
    profileImage: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { minimize: false });

const petModel = mongoose.models.pet || mongoose.model('pet', petSchema);

export default petModel;

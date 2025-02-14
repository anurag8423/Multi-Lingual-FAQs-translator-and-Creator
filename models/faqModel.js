import mongoose, { Schema } from "mongoose";

const faqSchema = new Schema({
    question:{type: String, required: true},
    answer:{type: String, required: true},
    translations:
    {
        hi:{
            question:{type: String},
            answer: {type: String}
        },
        bn:{
            question:{type: String},
            answer:{type: String}
        },
    }
});

export default mongoose.model("FAQ", faqSchema);
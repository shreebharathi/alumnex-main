const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyDescription: {
        type: String,
        required: true,
        trim: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
    // Additional fields as needed
    location: {
        type: String,
        trim: true,
        required: false, // Consider if you want this as optional or required
    },
    duration: {
        type: String,
        required: false, // Duration of the internship (optional)
    },
    stipend: {
        type: Number,
        required: false, // Stipend offered for the internship (optional)
    },
    applicationDeadline: {
        type: Date,
        required: false, // Deadline for application (optional)
    },
    applyLink: {
        type: String,
        required: true,
        trim: true,
        // validate: {
        //     validator: function(v) {
        //         return validator.isURL(v); // Validate if the string is a valid URL
        //     },
        //     message: props => `${props.value} is not a valid URL!`
        // }
    },
});

// Indexes for better query performance
internshipSchema.index({ title: 1, companyName: 1 });

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;

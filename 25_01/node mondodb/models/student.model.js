const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

var studentSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'This field is required'
    },
    email:{
        type: String,
        required: 'This field is required'
    },
    mobile:{
        type: Number,
        required: 'This field is required'
    },
    city:{
        type: String,
    }
});

mongoose.model("Student", studentSchema);
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minLength: 3,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(e){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e);
            },
            message: props => `${props.value} is not valid email address!`
        }
    },
    phoneNo:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true,
        minLength: 10,
        maxLength: 500
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
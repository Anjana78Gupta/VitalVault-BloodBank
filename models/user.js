const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['donor', 'admin', 'hospital']
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.role === "hospital") {
                return true;
            }
            return false;
        },
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique: true,
        trim: true,
    },
    password:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique: true,
        trim: true,
    },
    email:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('users',UserSchema);
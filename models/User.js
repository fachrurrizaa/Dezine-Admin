import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [50, 'Name must be less than 50 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'invalid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    }
});

export const User = models?.User || model('User', UserSchema);
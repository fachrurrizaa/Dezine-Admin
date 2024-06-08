import mongooseConnect from '../../../lib/mongoose';
import { User } from '../../../models/User';
import { hash } from 'bcrypt';

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'POST') {

        if (!req.body) {
            return res.status(400).json({message: 'No data provided'});
        }

        const {name, email, password} = req.body;

        const userExist = await User.findOne({email});

        if (userExist) {
            return res.status(400).json({message: 'User already exists'});
        } else {
            if (password.length < 6) {
                return res.status(400).json({message: 'Password must be at least 6 characters'});
            }

            const passwordHash = await hash(password, 12);

            const userDoc = await User.create({
                name, email, password: passwordHash
            });
            res.json(userDoc);
        }
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}
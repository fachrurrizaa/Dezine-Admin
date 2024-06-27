import mongooseConnect from "../../../lib/mongoose";
import Transaction from "../../../models/Transaction";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();
    
    if (method === 'GET') {
        if (req.query?.id) {
            try {
                const transaction = await Transaction.findById(req.query.id);
                if (transaction) {
                    res.status(200).json(transaction);
                } else {
                    res.status(404).json({ message: 'Transaction not found' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        } else {
            try {
                const transactions = await Transaction.find();
                res.status(200).json(transactions);
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

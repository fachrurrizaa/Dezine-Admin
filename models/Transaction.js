import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    date: Date,
    orderId: String,
    transactionType: String,
    channel: String,
    status: String,
    amount: Number,
    customerEmail: String
}, { collection: 'transactions' });

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;

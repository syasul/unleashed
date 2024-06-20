import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AppModal from '../components/Modal';
import FormInput from '../components/FormInput';
import '../assets/css/pages/TransactionPage.css';

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState({ type: '', item: '', quantity: '' });

    const handleAddTransaction = () => {
        setTransactions([...transactions, currentTransaction]);
        setIsModalOpen(false);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content p-4">
                <h2>Transactions</h2>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Add Transaction</Button>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.item}</td>
                                <td>{transaction.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <AppModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} title="Add Transaction">
                <FormInput label="Type" value={currentTransaction.type} onChange={(e) => setCurrentTransaction({ ...currentTransaction, type: e.target.value })} />
                <FormInput label="Item" value={currentTransaction.item} onChange={(e) => setCurrentTransaction({ ...currentTransaction, item: e.target.value })} />
                <FormInput label="Quantity" value={currentTransaction.quantity} onChange={(e) => setCurrentTransaction({ ...currentTransaction, quantity: e.target.value })} />
                <Button variant="primary" onClick={handleAddTransaction}>Add</Button>
            </AppModal>
        </div>
    );
};

export default TransactionPage;

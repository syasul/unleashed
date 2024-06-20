import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AppModal from '../components/Modal';
import FormInput from '../components/FormInput';
import '../assets/css/pages/MasterBarangPage.css';

const MasterBarangPage = () => {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({ name: '', quantity: '' });

    const handleAddItem = () => {
        setItems([...items, currentItem]);
        setIsModalOpen(false);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content p-4">
                <h2>Master Barang</h2>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Add Item</Button>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <AppModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} title="Add Item">
                <FormInput label="Name" value={currentItem.name} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} />
                <FormInput label="Quantity" value={currentItem.quantity} onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })} />
                <Button variant="primary" onClick={handleAddItem}>Add</Button>
            </AppModal>
        </div>
    );
};

export default MasterBarangPage;

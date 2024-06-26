import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const AddBarangModal = ({ open, onClose, onAdd }) => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [stok, setStok] = useState('');
    const [harga, setHarga] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const getId = await addDoc(collection(firestore, 'barangs'), {
                name: name,
                deskripsi: deskripsi,
                stok: parseInt(stok),
                harga: parseInt(harga)
            })
            await getDoc(doc(firestore, 'barangs', getId.id))
                .then((querySnapshot) => {
                    onAdd(querySnapshot.data())
                })
            setName('')
            setDeskripsi('')
            setStok('')
            setHarga('')
            onClose()
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Tambah Barang</DialogTitle>
            <DialogContent>
                <TextField label="Nama Barang" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Deskripsi" fullWidth margin="dense" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                <TextField label="Stok" type="number" fullWidth margin="dense" value={stok} onChange={(e) => setStok(e.target.value)} />
                <TextField label="Harga" type="number" fullWidth margin="dense" value={harga} onChange={(e) => setHarga(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBarangModal;

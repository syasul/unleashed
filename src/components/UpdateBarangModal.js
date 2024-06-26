import React, { useState, useEffect } from 'react';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const UpdateBarangModal = ({ open, onClose, barang }) => {
    const [nama, setNama] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [stok, setStok] = useState('');
    const [harga, setHarga] = useState('');

    useEffect(() => {
        if (barang) {
            setNama(barang.nama);
            setDeskripsi(barang.deskripsi);
            setStok(barang.stok);
            setHarga(barang.harga);
        }
    }, [barang]);

    const handleSubmit = async () => {
        const docRef = doc(firestore, 'barang', barang.id);
        await updateDoc(docRef, {
            nama,
            deskripsi,
            stok: parseInt(stok, 10),
            harga: parseFloat(harga),
            updatedAt: Timestamp.now()
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Barang</DialogTitle>
            <DialogContent>
                <TextField label="Nama" fullWidth margin="dense" value={nama} onChange={(e) => setNama(e.target.value)} />
                <TextField label="Deskripsi" fullWidth margin="dense" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                <TextField label="Stok" type="number" fullWidth margin="dense" value={stok} onChange={(e) => setStok(e.target.value)} />
                <TextField label="Harga" type="number" fullWidth margin="dense" value={harga} onChange={(e) => setHarga(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateBarangModal;

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const UpdateBarangModal = ({ open, onClose, barang, onUpdate }) => {
    const [name, setName] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [stok, setStok] = useState('');
    const [harga, setHarga] = useState('');

    useEffect(() => {
        if (barang) {
            setName(barang.name);
            setDeskripsi(barang.deskripsi);
            setStok(barang.stok);
            setHarga(barang.harga);
        }
    }, [barang]);

    const handleSubmit = () => {
        const updatedBarang = { ...barang, name, deskripsi, stok: parseInt(stok, 10), harga: parseFloat(harga), updatedAt: new Date().toISOString() };
        onUpdate(updatedBarang);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Barang</DialogTitle>
            <DialogContent>
                <TextField label="Nama" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
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

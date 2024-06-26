import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AddBarangModal = ({ open, onClose, onAdd }) => {
    const [nama, setNama] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [stok, setStok] = useState('');
    const [harga, setHarga] = useState('');

    const handleSubmit = () => {
        const newBarang = {
            id: Date.now().toString(),
            nama,
            deskripsi,
            stok: parseInt(stok, 10),
            harga: parseFloat(harga),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        onAdd(newBarang);
        onClose();
        setNama('');
        setDeskripsi('');
        setStok('');
        setHarga('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Tambah Barang</DialogTitle>
            <DialogContent>
                <TextField label="Nama" fullWidth margin="dense" value={nama} onChange={(e) => setNama(e.target.value)} />
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

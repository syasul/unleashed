import React, { useState, useEffect } from 'react';
import dummyData from './dummyData.json';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import AddBarangModal from './AddBarangModal';
import UpdateBarangModal from './UpdateBarangModal';

const BarangTable = () => {
    const [barangs, setBarangs] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentBarang, setCurrentBarang] = useState(null);

    useEffect(() => {
        setBarangs(dummyData);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Apakah yakin untuk mendelete?")) {
            setBarangs(barangs.filter(barang => barang.id !== id));
        }
    };

    const handleUpdate = (barang) => {
        setCurrentBarang(barang);
        setOpenUpdateModal(true);
    };

    const handleAdd = (newBarang) => {
        setBarangs([...barangs, newBarang]);
    };

    const handleUpdateData = (updatedBarang) => {
        setBarangs(barangs.map(barang => (barang.id === updatedBarang.id ? updatedBarang : barang)));
    };

    return (
        <>
            <Box sx={{ display: { xs: 'flex' }, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="h4">
                    Data Barang
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
                    Tambah Barang
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama</TableCell>
                            <TableCell>Deskripsi</TableCell>
                            <TableCell>Stok</TableCell>
                            <TableCell>Harga</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {barangs.map((barang) => (
                            <TableRow key={barang.id}>
                                <TableCell>{barang.nama}</TableCell>
                                <TableCell>{barang.deskripsi}</TableCell>
                                <TableCell>{barang.stok}</TableCell>
                                <TableCell>{barang.harga}</TableCell>
                                <TableCell>{new Date(barang.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(barang.updatedAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(barang)}>
                                        Update
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(barang.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddBarangModal open={openAddModal} onClose={() => setOpenAddModal(false)} onAdd={handleAdd} />
            <UpdateBarangModal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} barang={currentBarang} onUpdate={handleUpdateData} />
        </>
    );
};

export default BarangTable;

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import AddBarangModal from './AddBarangModal';
import UpdateBarangModal from './UpdateBarangModal';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const BarangTable = () => {
    const [barangs, setBarangs] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentBarang, setCurrentBarang] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'barangs'));
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setBarangs(newData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah yakin untuk mendelete?")) {
            try {
                await deleteDoc(doc(firestore, 'barangs', id));
                setBarangs(barangs.filter(barang => barang.id !== id));
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleUpdate = (barang) => {
        setCurrentBarang(barang);
        setOpenUpdateModal(true);
    };

    const handleAdd = (newBarang) => {
        setBarangs([...barangs, newBarang]);
    };

    const handleUpdateData = async (updatedBarang) => {
        try {
            const barangRef = doc(firestore, 'barangs', updatedBarang.id);
            await updateDoc(barangRef, {
                name: updatedBarang.name,
                deskripsi: updatedBarang.deskripsi,
                stok: updatedBarang.stok,
                harga: updatedBarang.harga,
                updatedAt: updatedBarang.updatedAt,
            });
            setBarangs(barangs.map(barang => (barang.id === updatedBarang.id ? updatedBarang : barang)));
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {barangs?.map((barang, i) => (
                            <TableRow key={i}>
                                <TableCell>{barang.name}</TableCell>
                                <TableCell>{barang.deskripsi}</TableCell>
                                <TableCell>{barang.stok}</TableCell>
                                <TableCell>{barang.harga}</TableCell>
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

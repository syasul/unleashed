import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddBarangModal from './AddBarangModal';
import UpdateBarangModal from './UpdateBarangModal';

const BarangTable = () => {
    const [barangs, setBarangs] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentBarang, setCurrentBarang] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'barang'));
            const barangList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBarangs(barangList);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Apakah yakin untuk mendelete?")) {
            await deleteDoc(doc(firestore, 'barang', id));
            setBarangs(barangs.filter(barang => barang.id !== id));
        }
    };

    const handleUpdate = (barang) => {
        setCurrentBarang(barang);
        setOpenUpdateModal(true);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
                Tambah Barang
            </Button>
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
                                <TableCell>{barang.createdAt?.toDate().toLocaleString()}</TableCell>
                                <TableCell>{barang.updatedAt?.toDate().toLocaleString()}</TableCell>
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

            <AddBarangModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
            <UpdateBarangModal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} barang={currentBarang} />
        </>
    );
};

export default BarangTable;

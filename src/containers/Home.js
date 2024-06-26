import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { Box } from '@mui/material'
import BarangTable from '../components/BarangTable';

const Home = () => {
    const [user] = useAuthState(auth)
    return (
        <>
            <Box sx={{ margin: 10 }}>
                <BarangTable />
            </Box>
        </>
    )
}

export default Home
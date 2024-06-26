import { ThemeProvider } from '@emotion/react'
import {
    Container,
    createTheme,
    CssBaseline,
    Typography,
    Box,
    TextField,
    Button
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuthState, useUpdateEmail } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../config/firebase'
import { Navigate } from 'react-router-dom'

import { setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { EmailAuthCredential, reauthenticateWithCredential } from 'firebase/auth'
import FormDialog from '../components/FormDialog'

const defaultTheme = createTheme()

const Profile = () => {

    const [user] = useAuthState(auth)
    const [profile, setProfile] = useState({
        email: '',
        name: '',
        handphone: '',
        address: ''
    })
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [handphone, setHandphone] = useState('')
    const [address, setAddress] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const ref = doc(firestore, 'profiles', user.email)

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useState(async () => {
        if (user) {
            const data = await getDoc(ref)
            if (data.exists()) {
                setEmail(user.email)
                setName(data.data().displayName)
                setHandphone(data.data().handphone)
                setAddress(data.data().address)
            }
            setEmail(user.email)
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = await getDoc(ref)
            if (data.exists()) {
                if (user.email !== email) {
                    setProfile({
                        email: email,
                        name: name,
                        handphone: handphone,
                        address: address
                    })
                    setOpen(true)
                    } else {
                        await updateDoc(ref, {
                            displayName: name,
                            handphone: handphone,
                            address: address
                        })
                    }
                } else {
                await setDoc(ref, {
                    displayName: name,
                    handphone: handphone,
                    address: address
                })
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <Typography component="h1" variant='h5'>Profile</Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='name'
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            value={name}
                            label='Nama User'
                            name='name'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            autoComplete='email'
                            id='email'
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            label='Email User'
                            name='email'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='handphone'
                            onChange={(e) => {
                                setHandphone(e.target.value)
                            }}
                            value={handphone}
                            label='Nomor Handphone'
                            name='handphone'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='address'
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                            value={address}
                            label='Alamat'
                            name='address'
                            autoFocus
                        />
                        <Typography color='red'>{errorMessage}</Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
            <FormDialog open={open} handleClose={handleClose} profile={profile} />
        </ThemeProvider>
    )
}

export default Profile
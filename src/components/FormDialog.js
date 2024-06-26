import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

export default function FormDialog({ open, handleClose, profile }) {
  const [password, setPassword] = useState('')

  const reauthenticate = () => {
    let credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )
    return reauthenticateWithCredential(auth.currentUser, credential)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await deleteDoc(doc(firestore, 'profiles', auth.currentUser.email))
    reauthenticate().then(async () => {
      await updateEmail(auth.currentUser, profile.email)
      await setDoc(doc(firestore, 'profiles', profile.email), {
        displayName: profile.name,
        handphone: profile.handphone,
        address: profile.address
      })
      handleClose()
    })
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Masukkan Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
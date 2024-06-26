import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { Box } from '@mui/material'

const Home = () => {
    const [user] = useAuthState(auth)
    return(
        <>
            <Box sx={{margin: 10}}>
                Welcome <br/>
                User : {user.email}
            </Box>
        </>
    )
}

export default Home
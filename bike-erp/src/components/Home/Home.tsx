import { Button, Typography } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import localStorageService from '../../core/services/LocalStorageService'
import { AUTH_URL } from '../../core/utils/config'


const Home = () => {
    const url = AUTH_URL

    const handleLogout = () => {
        axios.delete(`${url}/auth/logout`).then(() => {
            localStorageService.clearAllTokens()
        })
    }
    
    return (
        <div>
            <Typography variant="h1">Welcome</Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Home

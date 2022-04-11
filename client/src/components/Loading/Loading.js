import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import '../../css/Loading/Loading.css'

const Loading = ({ open, setOpen }) => {

    const handleClose = () => setOpen(false);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading
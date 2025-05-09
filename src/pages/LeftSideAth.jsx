import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import styles from '../component/register/styles'
import { useNavigate } from 'react-router-dom'
function LeftSideAth() {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={styles.containerLeft}>
                <Box
                    component="video"
                    src="./video/1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{...styles.videoBackground}}
                />

                <Box sx={styles.videoOverlay} />

                <Box sx={styles.textBox}>
                    <Typography variant="h4" sx={styles.title}>
                        Welcome to Bimi Cakes
                    </Typography>
                    <Typography variant="body1" sx={styles.description}>
                        Enjoy the best cake customization experience. Simple, elegant, and delicious!
                    </Typography>
                    <Button sx={styles.exploreButton} onClick={() => navigate('/home')}>
                        Explore as Guest
                    </Button>

                </Box>

            </Box>
        </>
    )

}

export default LeftSideAth
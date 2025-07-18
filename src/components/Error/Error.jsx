import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState , useEffect } from 'react';

export default function Error({error}) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (error.error) {
            setOpen(true); // reopen the alert when a new error occurs
        }
    }, [error]);


    return (
        <>
            {
                error.error && 
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            >
                            Weather Information is not available for <strong>{error.city}</strong>.
                        </Alert>
                    </Collapse>
                </Box>
            }
        </>
    );
}
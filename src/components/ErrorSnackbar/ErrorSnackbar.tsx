import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from "../../api/store";
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export default function ErrorSnackbar() {

    const dispatch = useDispatch()
    const error = useAppSelector<string | null>(state => state.app.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
    };

    return (
        <div>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {error}😠
                    </Alert>
                </Snackbar>
            </Stack></div>
    );
}

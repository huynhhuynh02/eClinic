import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import DoneIcon from '@mui/icons-material/Done';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;


    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other} style={{
            backgroundColor: ''
        }}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function MedicalRecordDialogs({ open, onClose }) {
    const [value, setValue] = React.useState(new Date());
    return (
        <div>
            <BootstrapDialog
                TransitionComponent={Transition}
                maxWidth="lg"
                fullWidth
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" >
                    Nguyễn Văn A
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography variant="h6" component="h5" align="center">
                        Hồ sơ bệnh nhân
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Item>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left">Họ tên: </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left">Họ tên: </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left">Họ tên: </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Item>
                        </Grid>
                    </Grid>
                    <Typography align="left">
                        Diễn tiến bệnh
                    </Typography>
                    
                    <Typography align="left">
                        Sinh hiệu
                    </Typography>
                    <Typography align="left">
                        Lịch sử khám
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" autoFocus onClick={onClose}>
                        Đóng
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

MedicalRecordDialogs.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    prescriptions: PropTypes.array.isRequired,
    process: PropTypes.array.isRequired,
    vitalsigns: PropTypes.array.isRequired
};
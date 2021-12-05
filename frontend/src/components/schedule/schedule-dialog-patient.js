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
import CustomizedDialogs from '../common/dialog';
import { Box } from '@mui/material/Box';

export default function MedicalRecordDialogs(props) {
    const { children, open, title, onClose, ...other } = props;
    const [value, setValue] = React.useState(new Date());
    
    return (
        <CustomizedDialogs
            title="Thông tin bệnh nhân"
            open={open}
            onClose={onClose}
            actions= {
                <>
                <Button variant="contained">Contained</Button>
                <Button variant="contained">Contained</Button>
                </>
            }
        >
            {children}
        </CustomizedDialogs>
    );
}

MedicalRecordDialogs.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    prescriptions: PropTypes.array.isRequired,
    process: PropTypes.array.isRequired,
    vitalsigns: PropTypes.array.isRequired
};
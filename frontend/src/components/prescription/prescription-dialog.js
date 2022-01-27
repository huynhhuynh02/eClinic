import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CustomizedDialogs from '../common/dialog';
import { Box } from '@mui/material/Box';
import { getAge } from '../../utils/calculate-age-birthday';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

// const renderPrescriptionDetailList = (
//     prescription.prescription_details?.map(item => (
//         <Table aria-label="simple table" size="small">
//             <TableBody>
//                 <TableRow>
//                     <TableCell align="left">Họ tên	:</TableCell>
//                 </TableRow>

//             </TableBody>
//         </Table>
//     ))
// )

export default function PrescriptionDetailDialogs(props) {
    const { open, title, onClose, prescription, isLoading, ...other } = props;

    return (
        <CustomizedDialogs
            title="Đơn thuốc"
            open={open}
            onClose={onClose}
            maxWidth="md"
            scroll="paper"
            actions={
                <>
                    <Button variant="contained" onClick={onClose}>Đóng</Button>
                </>
            }
        >
            <Typography m={2} align="center" variant="h6" component="h6" style={{ color: "#1c84ee" }}>
                ĐƠN THUỐC
            </Typography>
            <>
                {
                    isLoading ? 'Loading ....' :
                        <>
                            <Table aria-label="simple table" size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">Họ tên	:</TableCell>
                                        <TableCell align="left">{prescription.patient?.fullname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Tuổi:</TableCell>
                                        <TableCell align="left">{getAge(prescription.patient?.birthday)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Giới tính :</TableCell>
                                        <TableCell align="left">{prescription.patient?.sex}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Điện thoại :</TableCell>
                                        <TableCell align="left">{prescription.patient?.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Địa chỉ	:</TableCell>
                                        <TableCell align="left">{prescription.patient?.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Nghề nghiệp	:</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Lý do khám:</TableCell>
                                        <TableCell align="left">{prescription.remark}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Chẩn đoán:</TableCell>
                                        <TableCell align="left">{prescription.diagnose}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            {
                                prescription.prescription_details?.map((item, index) => (
                                    <Stack direction="row" spacing={2}>
                                        <Box>
                                            {index+1}
                                        </Box>
                                        <Box>
                                            {index+1}
                                        </Box>
                                    </Stack>
                                ))
                            }
                        </>
                }
            </>
            {/* Kết thúc Lịch sử khám bệnh */}
        </CustomizedDialogs>
    );
}

PrescriptionDetailDialogs.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    prescription: PropTypes.object.isRequired
};
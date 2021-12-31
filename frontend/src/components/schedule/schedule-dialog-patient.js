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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

function createVitalSigns(createDate, blood_pressure, temperature, weight, height, bmi) {
    return { createDate, blood_pressure, temperature, weight, height, bmi };
}

function createMedicalHistorys(createDate, preCode, diagnose, advice, reExaminationDate) {
    return { createDate, preCode, diagnose, advice, reExaminationDate };
}

function createEvolves(createDate, content) {
    return { createDate, content};
}

const vitalSigns = [
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-')
];

const evolves = [
    createEvolves('17/01/2019', 'Hết vêm khớp'),
    createEvolves('17/01/2019', 'Hết vêm khớp')
];

const medicalHistorys= [
    createMedicalHistorys('17/01/2019', '54385', 'Viêm khớp dạng thấp - Xơ Gan/ Viêm gan siêu vi B', '- Đo HA mỗi ngày - Tập thể dục - Hạn chế làm việc nặng', '17/01/2021'),
    createMedicalHistorys('17/01/2019', '54385', 'Viêm khớp dạng thấp - Xơ Gan/ Viêm gan siêu vi B', '- Đo HA mỗi ngày - Tập thể dục - Hạn chế làm việc nặng', '17/01/2021'),
    createMedicalHistorys('17/01/2019', '54385', 'Viêm khớp dạng thấp - Xơ Gan/ Viêm gan siêu vi B', '- Đo HA mỗi ngày - Tập thể dục - Hạn chế làm việc nặng', '17/01/2021')
];

export default function MedicalRecordDialogs(props) {
    const { open, title, onClose, patient, ...other } = props;
    const [value, setValue] = React.useState(new Date());
    return (
        <CustomizedDialogs

            title={patient?.name}
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
            <Typography m={2} align="center" variant="h6" component="h6" style={{ color: "#1c84ee" }}>HỒ SƠ BỆNH NHÂN</Typography>
            <Table aria-label="simple table" size="small">
                <TableBody>
                    <TableRow>
                        <TableCell align="left">Họ tên	:</TableCell>
                        <TableCell align="left">{patient?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Tuổi / Năm sinh	:</TableCell>
                        <TableCell align="left">{patient?.birthday}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Giới tính :</TableCell>
                        <TableCell align="left">{patient?.sex}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Điện thoại :</TableCell>
                        <TableCell align="left">{patient?.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Địa chỉ	:</TableCell>
                        <TableCell align="left">{patient?.address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Nghề nghiệp	:</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Typography m={2} variant="h6" component="h6" style={{ color: "#1c84ee" }}>SINH HIỆU</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>NGÀY</TableCell>
                            <TableCell align="left">MẠCH</TableCell>
                            <TableCell align="left">HUYẾT ÁP</TableCell>
                            <TableCell align="left">NHIỆT ĐỘ</TableCell>
                            <TableCell align="left">CÂN NẶNG</TableCell>
                            <TableCell align="left">CHIỀU CAO</TableCell>
                            <TableCell align="left">BMI</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vitalSigns.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.createDate}</TableCell>
                                <TableCell align="left">{row.blood_pressure}</TableCell>
                                <TableCell align="left">{row.temperature}</TableCell>
                                <TableCell align="left">{row.weight}</TableCell>
                                <TableCell align="left">{row.height}</TableCell>
                                <TableCell align="left">{row.bmi}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography m={2} variant="h6" component="h6" style={{ color: "#1c84ee" }}>DIỄN TIẾN BỆNH</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>NGÀY</TableCell>
                            <TableCell align="left">NỘI DUNG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {evolves.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.createDate}</TableCell>
                                <TableCell align="left">{row.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Lịch sử khám bệnh */}
            <Typography m={2} variant="h6" component="h6" style={{ color: "#1c84ee" }}>LỊCH SỬ KHÁM BỆNH</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>NGÀY KHÁM</TableCell>
                            <TableCell align="left">MÃ ĐƠN THUỐC</TableCell>
                            <TableCell align="left">CHẨN ĐOÁN</TableCell>
                            <TableCell align="left">LỜI DẶN</TableCell>
                            <TableCell align="left">NGÀY TÁI KHÁM</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicalHistorys.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.createDate}</TableCell>
                                <TableCell align="left">{row.preCode}</TableCell>
                                <TableCell align="left">{row.diagnose}</TableCell>
                                <TableCell align="left">{row.advice}</TableCell>
                                <TableCell align="left">{row.reExaminationDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Kết thúc Lịch sử khám bệnh */}
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
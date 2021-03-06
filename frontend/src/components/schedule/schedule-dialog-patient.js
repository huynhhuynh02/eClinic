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
import { getAge } from '../../utils/calculate-age-birthday';

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
    return { createDate, content };
}

const vitalSigns = [
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-'),
    createVitalSigns('17/01/2019', 'HA:120/80', null, null, null, null, '-')
];

const evolves = [
    createEvolves('17/01/2019', 'H???t v??m kh???p'),
    createEvolves('17/01/2019', 'H???t v??m kh???p')
];



const rendervitalSigns = (
    vitalSigns.map((row) => (
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
    ))
)

export default function MedicalRecordDialogs(props) {
    const { open, title, onClose, patient, isLoading, ...other } = props;
    const [value, setValue] = React.useState(new Date());

    const renderPrescriptionList = (
        patient.prescriptions?.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="left">{row.created_at}</TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.diagnose}</TableCell>
                    <TableCell align="left">{row.advice}</TableCell>
                    <TableCell align="left">{row.reExaminationDate}</TableCell>
                </TableRow>
            )
        )
    )

    return (
        <CustomizedDialogs
            title={patient.fullname}
            open={open}
            onClose={onClose}
            maxWidth="md"
            scroll="paper"
            actions={
                <>
                    <Button variant="contained" onClick={onClose}>????ng</Button>
                </>
            }
        >
            <Typography m={2} align="center" variant="h6" component="h6" style={{ color: "#1c84ee" }}>H??? S?? B???NH NH??N</Typography>
            <>
                {
                    isLoading ? 'Loading ....' :
                        <>
                            <Table aria-label="simple table" size="small">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">H??? t??n	:</TableCell>
                                        <TableCell align="left">{patient.fullname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Tu???i:</TableCell>
                                        <TableCell align="left">{getAge(patient.birthday)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Gi???i t??nh :</TableCell>
                                        <TableCell align="left">{patient.sex}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">??i???n tho???i :</TableCell>
                                        <TableCell align="left">{patient.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">?????a ch???	:</TableCell>
                                        <TableCell align="left">{patient.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">Ngh??? nghi???p	:</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            {/* <Typography m={2} variant="h6" component="h6" style={{ color: "#1c84ee" }}>SINH HI???U</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NG??Y</TableCell>
                                            <TableCell align="left">M???CH</TableCell>
                                            <TableCell align="left">HUY???T ??P</TableCell>
                                            <TableCell align="left">NHI???T ?????</TableCell>
                                            <TableCell align="left">C??N N???NG</TableCell>
                                            <TableCell align="left">CHI???U CAO</TableCell>
                                            <TableCell align="left">BMI</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rendervitalSigns}
                                    </TableBody>
                                </Table>
                            </TableContainer> */}
                            {/* <Typography m={2} variant="h6" component="h6" style={{ color: "#1c84ee" }}>DI???N TI???N B???NH</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NG??Y</TableCell>
                                            <TableCell align="left">N???I DUNG</TableCell>
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
                            </TableContainer> */}
                            {/* L???ch s??? kh??m b???nh */}
                            <Typography m={2} variant="h6" component="h6" style={{ color: "#1c84ee" }}>L???CH S??? KH??M B???NH</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NG??Y KH??M</TableCell>
                                            <TableCell align="left">M?? ????N THU???C</TableCell>
                                            <TableCell align="left">CH???N ??O??N</TableCell>
                                            <TableCell align="left">L???I D???N</TableCell>
                                            <TableCell align="left">NG??Y T??I KH??M</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { patient.prescriptions?.length > 0 ? renderPrescriptionList :  <TableCell>Ch??a c?? data</TableCell>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                }
            </>
            {/* K???t th??c L???ch s??? kh??m b???nh */}
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
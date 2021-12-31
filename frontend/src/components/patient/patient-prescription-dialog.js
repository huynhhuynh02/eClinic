import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes, { element } from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomizedDialogs from '../common/dialog';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import DatePicker from '@mui/lab/DatePicker';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { medicines_category, medicines } from '../../__mocks__/medicines';
import { Box } from '@mui/system';
import { v4 as uuid } from 'uuid';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function PrescriptionDialogs(props) {
    const { open, patient, onClose, ...other } = props;
    const [categoryIdSelect, setGroupIdSelect] = useState();
    const [medicinesIdSelect, setMedicinesIdSelect] = useState();
    const [medicinesSelelect, setMedicinesSelelect] = useState([]);
    const [categories, setCategories] = useState(medicines_category);
    const [mediciness, setMedicines] = useState(medicines);
    const [dataMedicines, setDataMedicines] = useState({
        'patient_id': patient.id,
        'medicines': [],
        'progression': null,
        'weight': null,
        'height': null,
        'pressure': null,
        'pulse': null,
        'diagnose': null,
        'remark': null,
        'scheduleDate': null
    });

    useEffect(() => {

    }, []);

    const handleOnSelectCategory = (id) => {
        setGroupIdSelect(id);
        let data = medicines.filter(item => item.category_id == id);
        setMedicinesSelelect([...data]);
    }

    const handleOnAddPrescription = () => {
        let medicines = {
            "name": "",
            "unit": "Viên",
            "prescription_id": null,
            "quantity": 0,
            "use": null
        }

        dataMedicines.medicines.push(medicines);
        setDataMedicines({ ...dataMedicines });
    }

    const hanldeQuantityChange = (e, index) => {
        dataMedicines.medicines[index].quantity = e.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const hanldeUnitChange = (e, index) => {
        dataMedicines.medicines[index].unit = e.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const hanldeUseChange = (e, index) => {
        dataMedicines.medicines[index].use = e.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handlChangeWeight = (event) => {
        dataMedicines.weight = event.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handlChangeHeight = (event) => {
        dataMedicines.height = event.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handlChangePressure = (event) => {
        dataMedicines.pressure = event.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handlChangePulse = (event) => {
        dataMedicines.pulse = event.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handlChangeProgression = (event) => {
        dataMedicines.progression = event.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handlChangeDiagnose = (event) => {
        dataMedicines.diagnose = event.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handlChangeRemark = (event) => {
        dataMedicines.remark = event.target.value;
        setDataMedicines({ ...dataMedicines });
    }

    const handleChangeSchedule = (selectDate) => {
        dataMedicines.scheduleDate = selectDate;
        setDataMedicines({ ...dataMedicines });
    }

    const handleSelectMedicines = (id) => {
        setMedicinesIdSelect(id);
        if (!dataMedicines.medicines.find(element => element.prescription_id == id)) {
            medicinesSelelect.find(item => {
                if (item.id == id) {
                    let medicines = {
                        "unit": item.unit,
                        "prescription_id": item.id,
                        "name": item.name,
                        "quantity": item.quantity,
                        "use": item.use
                    }
                    dataMedicines.medicines.push(medicines);
                    setDataMedicines(dataMedicines);
                }
            })
        }
    }

    const handleOnDeletePrescription = (id) => {
        let index = dataMedicines.medicines.findIndex((x) => x.id == id);
        dataMedicines.medicines.splice(index, 1);
        setDataMedicines({ ...dataMedicines });
    }

    const handleChangeMedicines = (event, values, index) => {
        dataMedicines.medicines[index].prescription_id = values.id;
        dataMedicines.medicines[index].name = values.name;
        setDataMedicines({ ...dataMedicines });
    }

    const onSubmit = () => {
        console.log(dataMedicines);
    }

    return (
        <CustomizedDialogs
            maxWidth="lg"
            title="Kê đơn"
            open={open}
            onClose={onClose}
            actions={
                <>
                    <Button variant="contained" onClick={onSubmit}>Lưu</Button>
                    <Button variant="outlined" onClick={onClose}>Đóng</Button>
                </>
            }
        >
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="p" component="p" mb={1}>
                        Danh mục
                    </Typography>
                    {
                        categories?.map((item) => (
                            <Button onClick={() => handleOnSelectCategory(item.id)} variant={categoryIdSelect == item.id ? "contained" : "outlined"} size="small" style={{ marginRight: '5px', marginBottom: '5px' }}>
                                {item.name}
                            </Button>
                        ))
                    }
                    <Typography variant="p" component="p" mb={1}>
                        Thuốc
                    </Typography>
                    <Grid container spacing={1}>
                        {
                            medicinesSelelect?.map((item) => (
                                <Grid item xs={12}>
                                    <Button variant={medicinesIdSelect == item.id ? "contained" : "outlined"} onClick={() => handleSelectMedicines(item.id)} size="small" fullWidth>{item.name}</Button>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography m={2} align="center" variant="h6" component="h6" style={{ color: "#1c84ee" }}>ĐƠN THUỐC</Typography>
                    <Table aria-label="simple table" size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">Họ tên	:{patient?.name}</TableCell>
                                <TableCell align="left">Tuổi / Năm sinh	: {patient?.birthday}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Điện thoại : {patient?.phone}</TableCell>
                                <TableCell align="left">Giới tính: {patient?.sex == 1 ? 'Nam' : 'Nữ'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Lý do khám</TableCell>
                                <TableCell align="left">
                                    <TextField id="standard-basic" multiline="true" value={dataMedicines.remark} onChange={handlChangeRemark} fullWidth variant="standard" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Chẩn đoán</TableCell>
                                <TableCell align="left">
                                    <TextField id="standard-basic" value={dataMedicines.diagnose} onChange={handlChangeDiagnose} multiline="true" fullWidth variant="standard" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {dataMedicines.medicines?.map((item, index) => (
                        <>
                            <Stack direction="row" alignItems="center" spacing={2} mb={2} mt={2}>
                                <Box>
                                    {index + 1}
                                </Box>
                                <Stack direction="row" flexWrap="wrap">
                                    <Box sx={{ width: '65%' }}>
                                        <Autocomplete
                                            fullWidth
                                            disableClearable
                                            id={'combo-box-demo' + index}
                                            options={mediciness}
                                            defaultValue={mediciness.find(element => element.id == item.prescription_id)}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(event, values) => handleChangeMedicines(event, values, index)}
                                            renderInput={(params) => <TextField {...params} variant="standard" label="Tên thuốc" fullWidth />}
                                        />
                                    </Box>
                                    <Box sx={{ width: '15%' }}>
                                        <Stack>
                                            <TextField onChange={(event) => hanldeQuantityChange(event, index)} value={item.quantity} id="standard-basic" label="Số lượng" variant="standard" />
                                        </Stack>
                                    </Box>
                                    <Box sx={{ width: '15%' }}>
                                        <Stack direction="row" alignItems="flex-end">
                                            <TextField id="standard-basic" onChange={(event) => hanldeUnitChange(event, index)} value={item.unit} label="Đơn vị" variant="standard" />
                                        </Stack>
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Stack direction="row">
                                            <Typography sx={{
                                                width: '25%'
                                            }}>Cách dùng:</Typography>
                                            <Box sx={{
                                                width: '75%'
                                            }}>
                                                <TextField onChange={(event) => hanldeUseChange(event, index)} value={item.use} id="standard-basic" variant="standard" fullWidth />
                                            </Box>
                                        </Stack>
                                    </Box>

                                </Stack>
                                <Box>
                                    <IconButton aria-label="delete" onClick={() => handleOnDeletePrescription(item.id)}>
                                        <DoNotDisturbOnIcon />
                                    </IconButton>
                                </Box>
                            </Stack>
                        </>

                    ))
                    }
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                        <IconButton aria-label="add" size="large" color="primary" onClick={handleOnAddPrescription}>
                            <AddCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" alignItems="flex-end">
                        <DatePicker
                            onChange={(selectDate) => handleChangeSchedule(selectDate)}
                            name="birthday"
                            label="Ngày tái khám"
                            value={dataMedicines.scheduleDate}
                            renderInput={(params) => <TextField
                                variant="standard" {...params} />}
                        />
                    </Stack>

                </Grid>
                <Grid item xs={3}>
                    <Typography variant="p" component="p" mb={1}>
                        Sinh hiệu
                    </Typography>
                    <Stack direction="row">
                        <Box sx={{
                            width: '50%'
                        }}>
                            <Typography>Mạch:</Typography>
                        </Box>

                        <TextField id="standard-basic" onChange={handlChangePulse} value={dataMedicines.pulse} variant="standard" />
                    </Stack>
                    <Stack direction="row">
                        <Box sx={{
                            width: '50%'
                        }}>
                            <Typography>HA:</Typography>
                        </Box>
                        <TextField id="standard-basic" variant="standard" value={dataMedicines.pressure} onChange={handlChangePressure} />
                    </Stack>
                    <Stack direction="row">
                        <Box sx={{
                            width: '50%'
                        }}>
                            <Typography >Cân nặng(kg):</Typography>
                        </Box>
                        <TextField id="standard-basic" onChange={handlChangeWeight} value={dataMedicines.weight} variant="standard" />
                    </Stack>
                    <Stack direction="row">
                        <Box sx={{
                            width: '50%'
                        }}>
                            <Typography>Chiều cao(cm):</Typography>
                        </Box>
                        <TextField id="standard-basic" onChange={handlChangeHeight} value={dataMedicines.height} variant="standard" />
                    </Stack>
                    <Typography variant="p" component="p" mb={1} mt={3}>
                        Tiến triễn bệnh
                    </Typography>
                    <TextField fullWidth value={dataMedicines.progression} id="standard-basic" onChange={handlChangeProgression} multiline="true" variant="standard" />
                </Grid>
            </Grid>
        </CustomizedDialogs>
    );
}

PrescriptionDialogs.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    patient: PropTypes.object,
};
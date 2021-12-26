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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { medicines_list } from '../../__mocks__/medicines';
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
    const [groupIdSelect, setGroupIdSelect] = useState();
    const [medicinesSelelect, setMedicinesSelelect] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [dataMedicines, setDataMedicines] = useState([]);

    useEffect(() => {
        if (medicines.length == 0) {
            setMedicines([...medicines_list]);
        }
        console.log(medicinesSelelect);
    },
        [
            groupIdSelect,
            medicinesSelelect
        ]);

    const handleOnSelectGroup = (id) => {
        setGroupIdSelect(id);
        let data = medicines.find(element => element.id == groupIdSelect);
        setMedicinesSelelect(data);
    }

    const handleOnAddPrescription = () => {
        let formData = {
            "id": uuid(),
            "prescription_id": null,
            "quantity": 0,
            "description": null
        }

        dataMedicines.push(formData);
        setDataMedicines([...dataMedicines]);
    }

    const handleOnDeletePrescription = (id) => {
        let index = dataMedicines.findIndex((x) => x.id == id);
        dataMedicines.splice(index, 1);
        setDataMedicines([...dataMedicines]);
    }

    const top100Films = [
        { title: 'The Shawshank Redemption', id: 1 },
        { title: 'The Godfather', id: 2 },
        { title: 'The Godfather: Part II', id: 3 },
        { title: 'The Dark Knight', id: 3 },
        { title: '12 Angry Men', id: 4 },
        { title: "Schindler's List", id: 5 },
        { title: 'Pulp Fiction', id: 6 }];
    return (
        <CustomizedDialogs
            maxWidth="lg"
            title="Kê đơn"
            open={open}
            onClose={onClose}
            actions={
                <>
                    <Button variant="contained">Lưu</Button>
                    <Button variant="contained">Lưu và in</Button>
                    <Button variant="outlined" onClick={onClose}>Đóng</Button>
                </>
            }
        >
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="p" component="p" mb={1}>
                        Nhóm
                    </Typography>
                    {
                        medicines?.map((group) => (
                            <Button onClick={() => handleOnSelectGroup(group.id)} variant="outlined" size="small" style={{ marginRight: '5px', marginBottom: '5px' }}>
                                {group.name}
                            </Button>
                        ))
                    }
                    <Typography variant="p" component="p" mb={1}>
                        Danh mục
                    </Typography>
                    <Grid container spacing={1}>
                        {/* {
                            medicinesSelelect?.map((item) => (
                                <Grid item xs={6}>
                                    <Button variant="outlined" size="small" fullWidth>{item.name}</Button>
                                </Grid>
                            ))
                        } */}
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
                                <TableCell align="left">Giới tính:</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Lý do khám</TableCell>
                                <TableCell align="left">
                                    <TextField id="standard-basic" fullWidth variant="standard" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">Chẩn đoán</TableCell>
                                <TableCell align="left">
                                    <TextField id="standard-basic" fullWidth variant="standard" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {dataMedicines?.map((item, index) => (
                        <Stack direction="row" spacing={2} mb={2} alignItems="flex-end">
                            <Box sx={{
                                width: '60%',
                            }}>
                                <Autocomplete
                                    disableClearable
                                    id={'combo-box-demo' + index}
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}

                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} variant="standard" />}
                                />
                            </Box>
                            <Box sx={{
                                width: '20%',
                            }}>
                                <Stack>
                                    <TextField id="standard-basic" label="Số lượng" variant="standard" />
                                </Stack>
                            </Box>
                            <Box sx={{
                                width: '10%',
                            }}>
                                <Stack direction="row" alignItems="flex-end">
                                    <TextField id="standard-basic" label="Đơn vị" variant="standard" />
                                </Stack>
                            </Box>
                            <IconButton aria-label="delete" onClick={() => handleOnDeletePrescription(item.id)}>
                                <DoNotDisturbOnIcon />
                            </IconButton>
                        </Stack>
                    ))
                    }
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                        <IconButton aria-label="add" size="large" color="primary" onClick={handleOnAddPrescription}>
                            <AddCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>

                </Grid>
                <Grid item xs={3}>
                    <Typography variant="p" component="p" mb={1}>
                        Sinh hiệu
                    </Typography>
                    <IconButton aria-label="add" color="primary">
                        <AddCircleIcon fontSize="inherit" />
                    </IconButton>

                    <Typography variant="p" component="p" mb={1}>
                        Tiến triễn bệnh
                    </Typography>
                    <IconButton aria-label="add" color="primary">
                        <AddCircleIcon fontSize="inherit" />
                    </IconButton>
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
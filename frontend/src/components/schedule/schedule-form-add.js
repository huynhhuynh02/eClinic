import { 
    Box, 
    TextField, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Button, 
    Grid, 
    Radio, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel 
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Stack from "@mui/material/Stack";
import axios from 'axios';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    p: 4,
    height: 600,
    overflow: 'auto',
};

export const ScheduleFormAdd = (props) => {
    const handleClose = () => {
        props.handleClose();
        setPatientsSearch([]);
        setKeySearch('');
        setPatientSelect(null);
    }
    const [patientsSearch, setPatientsSearch] = useState([]);
    const [keySearch, setKeySearch] = useState('');
    const [patientSelect, setPatientSelect] = useState(null);
    const formik = useFormik({
        initialValues: {
            patient_id: null,
            patient_name: '',
            birthday: new Date(),
            sex: '',
            phone: '',
            address: '',
            schedule_time: new Date(),
            patient_group_id: 1,
            doctor_id: 1,
            schedule_status: '',
            note: ''
        },
        validationSchema: Yup.object(patientSelect === null ? 
            {
                patient_name: Yup
                .string()
                .max(255)
                .required(
                    'Tên bệnh nhân không được trống'),
                birthday: Yup.string()
                .required("Birthday is Required"),
                sex: Yup
                .string()
                .max(255)
                .required(
                    'Ngày sinh không được trống'),
                phone: Yup
                .string()
                .max(255)
                .required(
                    'Sđt không được trống'),
                address: Yup
                .string()
                .max(255)
                .required(
                    'Địa chỉ không được trống'),
                patient_group_id: Yup
                .number()
                .max(255),
                schedule_time: Yup
                .string()
                .required(
                    'Lịch khám không được trống'),
                doctor_id: Yup
                .number()
                .max(255),
                schedule_status: Yup
                .string()
                .max(255),
            } :
            {
                patient_id: Yup
                .number(),
                schedule_time: Yup
                .string()
                .required(
                    'Lịch khám không được trống'),
                doctor_id: Yup
                .number()
                .max(255),
                schedule_status: Yup
                .string()
                .max(255),
            }    
        ),
        onSubmit: (values) => {
            console.log(formik.errors);
            // axios.post('/api/schedule', values).then(() => {
            //     handleClose();
            //     props.getSchedules();
            //     setPatientsSearch([]);
            //     setKeySearch('');
            //     setPatientSelect(null);
            // }, errors => console.log(errors))
        }
    });
    const searchPatient = () => {
        axios.get('/api/patient-search?key=' + keySearch).then(res => {
            setPatientsSearch(res.data.patients);
        }, errors => console.log(errors));
    }
    return (
        <>
            <Modal
                open={props.openFormAdd.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    { props.openFormAdd.formType === 'Examination' ? 'Tạo lịch khám' : 'Tái khám' }
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box>
                            <h4>Tìm kiếm bệnh nhân:</h4>
                            <Grid sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                                <TextField onChange={ e => setKeySearch(e.target.value) } sx={{ mr: 3 }} fullWidth id="filled-basic" label="Nhập tên hoặc số điện thoại" variant="outlined" />
                                <Button variant="contained" sx={{ width: 200, height: 56 }} onClick={ searchPatient }>
                                    Tìm bệnh nhân
                                </Button>
                            </Grid>
                            { patientsSearch.length != 0 && 
                                <Grid>
                                    <FormLabel component="legend">Chọn bệnh nhân</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="radio-buttons-group"
                                        value={ patientSelect }
                                        onChange={ e => setPatientSelect(e.target.value) }
                                    >
                                        { patientsSearch.map((patient) => (
                                            <FormControlLabel value={patient.id} control={<Radio />} label={'Bệnh nhân: ' + patient.fullname + ', Sđt:' + patient.phone } />
                                        )) }
                                    </RadioGroup>
                                </Grid>
                            }
                            <hr/>
                            { patientSelect === null &&  
                                <Grid>
                                    <h4 sx={{ mt: 3 }}>Hoặc tạo bệnh nhân mới:</h4>
                                    <TextField
                                        error={Boolean(formik.touched.patient_name && formik.errors.patient_name)}
                                        fullWidth
                                        helperText={formik.touched.patient_name && formik.errors.patient_name}
                                        label="Tên bệnh nhân"
                                        margin="normal"
                                        name="patient_name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.patient_name}
                                        variant="outlined"
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack
                                        error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                                        helperText={formik.touched.birthday && formik.errors.birthday}
                                        sx={{ mt: 1 }}
                                        >
                                            <DesktopDatePicker
                                                label="Ngày sinh"
                                                value={formik.values.birthday}
                                                onChange={(value) => {formik.setFieldValue('birthday', value)}}
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                                                    helperText={formik.touched.birthday && formik.errors.birthday}
                                                />
                                                )}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel id="sex-select-label">Giới tính</InputLabel>
                                        <Select
                                        labelId="sex-select-label"
                                        id="sex-select"
                                        name="sex"
                                        value={formik.values.sex}
                                        onChange={formik.handleChange}
                                        label="Giới tính"
                                        error={Boolean(formik.touched.sex && formik.errors.sex)}
                                        helperText={formik.touched.sex && formik.errors.sex}
                                        >
                                        <MenuItem value={0}>Nữ</MenuItem>
                                        <MenuItem value={1}>Nam</MenuItem>
                                        <MenuItem value={2}>Khác</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        error={Boolean(formik.touched.phone && formik.errors.phone)}
                                        fullWidth
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        label="Sdt bệnh nhân"
                                        margin="normal"
                                        name="phone"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.phone}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(formik.touched.address && formik.errors.address)}
                                        fullWidth
                                        helperText={formik.touched.address && formik.errors.address}
                                        label="Địa chỉ"
                                        margin="normal"
                                        name="address"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.address}
                                        variant="outlined"
                                    />
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel id="patient_group_id-select-label">Nhóm bệnh nhân</InputLabel>
                                        <Select
                                            labelId="patient_group_id-select-label"
                                            id="patient_group_id-select"
                                            name="patient_group_id"
                                            value={formik.values.patient_group_id}
                                            onChange={formik.handleChange}
                                            label="Giới tính"
                                            error={Boolean(formik.touched.patient_group_id && formik.errors.patient_group_id)}
                                            helperText={formik.touched.patient_group_id && formik.errors.patient_group_id}
                                        >
                                            <MenuItem value={1}>Nhóm 1</MenuItem>
                                            <MenuItem value={2}>Nhóm 2</MenuItem>
                                            <MenuItem value={3}>Nhóm 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                        </Box>  
                        <Box sx={{ mt: 2 }}>
                            <h4 sx={{ mb: 3 }}>Chi tiết lịch hẹn:</h4>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack
                                error={Boolean(formik.touched.schedule_time && formik.errors.schedule_time)}
                                helperText={formik.touched.schedule_time && formik.errors.schedule_time}
                                sx={{ mt: 1 }}
                                >
                                    <DateTimePicker
                                        label="Lịch khám"
                                        value={formik.values.schedule_time}
                                        onChange={(value) => {formik.setFieldValue('schedule_time', value)}}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(formik.touched.schedule_time && formik.errors.schedule_time)}
                                            helperText={formik.touched.schedule_time && formik.errors.schedule_time}
                                        />
                                        )}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="doctor_id-select-label">Bác sĩ</InputLabel>
                                <Select
                                labelId="doctor_id-select-label"
                                id="doctor_id-select"
                                name="doctor_id"
                                value={formik.values.doctor_id}
                                onChange={formik.handleChange}
                                label="Bác sĩ"
                                error={Boolean(formik.touched.doctor_id && formik.errors.doctor_id)}
                                helperText={formik.touched.doctor_id && formik.errors.doctor_id}
                                >
                                <MenuItem value={1}>Bác sĩ 1</MenuItem>
                                <MenuItem value={5}>Bác sĩ 2</MenuItem>
                                <MenuItem value={10}>Bác sĩ 3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="status-select-label">Trạng thái</InputLabel>
                                <Select
                                labelId="status-select-label"
                                id="status-select"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                label="Trạng thái"
                                error={Boolean(formik.touched.status && formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                                >
                                <MenuItem value={0}>Nữ</MenuItem>
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={2}>Khác</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>  
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Thêm lịch hẹn
                            </Button>
                        </Box>
                    </form>
                </Typography>
                </Box>
            </Modal>
        </>
    );
}
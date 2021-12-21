import { Box, TextField, FormControl, InputLabel, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Stack from "@mui/material/Stack";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  p: 4,
};

export const ScheduleFormAdd = (props) => {
    const handleClose = () => {
        props.handleClose();
    }
    const formik = useFormik({
        initialValues: {
            patient_name: '',
            birthday: '',
            sex: '',
            phone: '',
            address: '',
            schedule_time: '',
            doctor_id: '',
            schedule_status: '',
            note: ''
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    });
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
                            <h4>Bệnh nhân:</h4>
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
                                        inputFormat="MM/dd/yyyy"
                                        value={formik.values.birthday}
                                        onChange={formik.handleChange}
                                        // value={value}
                                        // onChange={handleChange}
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
                                // value={sex}
                                // onChange={handleChangeSex}
                                >
                                <MenuItem value={0}>Nữ</MenuItem>
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={2}>Khác</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                                fullWidth
                                helperText={formik.touched.birthday && formik.errors.birthday}
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
                                name="patient_name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.address}
                                variant="outlined"
                            />
                        </Box>  
                        <Box sx={{ mt: 2 }}>
                            <h4>Chi tiết lịch hẹn:</h4>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack
                                error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                                helperText={formik.touched.birthday && formik.errors.birthday}
                                sx={{ mt: 1 }}
                                >
                                    <DesktopDatePicker
                                        label="Lịch khám"
                                        inputFormat="MM/dd/yyyy"
                                        value={formik.values.birthday}
                                        onChange={formik.handleChange}
                                        // value={value}
                                        // onChange={handleChange}
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
                                <InputLabel id="sex-select-label">Bác sĩ</InputLabel>
                                <Select
                                labelId="sex-select-label"
                                id="sex-select"
                                name="sex"
                                value={formik.values.sex}
                                onChange={formik.handleChange}
                                label="Bác sĩ"
                                error={Boolean(formik.touched.sex && formik.errors.sex)}
                                helperText={formik.touched.sex && formik.errors.sex}
                                // value={sex}
                                // onChange={handleChangeSex}
                                >
                                <MenuItem value={0}>Bác sĩ 1</MenuItem>
                                <MenuItem value={1}>Bác sĩ 2</MenuItem>
                                <MenuItem value={2}>Bác sĩ 3</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="sex-select-label">Trạng thái</InputLabel>
                                <Select
                                labelId="sex-select-label"
                                id="sex-select"
                                name="sex"
                                value={formik.values.sex}
                                onChange={formik.handleChange}
                                label="Trạng thái"
                                error={Boolean(formik.touched.sex && formik.errors.sex)}
                                helperText={formik.touched.sex && formik.errors.sex}
                                // value={sex}
                                // onChange={handleChangeSex}
                                >
                                <MenuItem value={0}>Nữ</MenuItem>
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={2}>Khác</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>  
                    </form>
                </Typography>
                </Box>
            </Modal>
        </>
    );
}
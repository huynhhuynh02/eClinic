import * as React from 'react';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Snackbar,
    InputLabel, 
    MenuItem, 
    FormControl, 
    Select, 
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ScheduleTimedDialogs from './schedule-dialog-datetime';
import MedicalRecordDialogs from './schedule-dialog-patient';
import CustomizedDialogs from '../common/dialog';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
export const ScheduleListResults = ({ schedules, getSchedules, ...rest }) => {
    const [selectedScheduleIds, setSelectedScheduleIds] = useState([]);
    const [doctors, setDoctors] = useState(null);
    const [doctorId, setDoctorId] = useState('');
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(0);
    const [clearedDate, setClearedDate] = useState(null);
    const [value, setValue] = useState(new Date('2019-01-01T18:54'));
    const [open, setOpen] = useState(false);
    const [openMedical, setOpenMedical] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [scheduleSelectDelete, setScheduleSelectDelete] = useState(null);
    const [scheduleTime, setScheduleTime] = useState(new Date());
    const handleClickOpen = (schedule_time) => {
        console.log(schedule_time);
        setScheduleTime(schedule_time);
        setOpen(true);
    };

    const getDoctors = () => {
        axios.get('api/doctor').then(res => {
            setDoctors(res.data.doctors);
        })
    }

    if (doctors === null) {
        getDoctors();
    }

    const handleClickOpenMedical = () => {
        setOpenMedical(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseMedical = () => {
        setOpenMedical(false);
    };

    const handleOpenConfirm = (schedule_id) => {
        setScheduleSelectDelete(schedule_id);
        setOpenConfirm(true);
    }
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleDeleteConfirm = () =>{
        axios.delete('/api/schedule/' + scheduleSelectDelete).then(() => {
            getSchedules();
            setOpenConfirm(false);
            setOpenToast(true);
        })
    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenToast(false);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeDoctor = (scheduleId, doctorId) => {
        axios.patch('/api/schedule/' + scheduleId + '?action=UPDATE_DOCTOR_ONLY&doctor_id=' + doctorId).then(res => {
            setOpenToast(true);
        });
    }

    return (
        <>
            <Card {...rest}>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Ngày khám
                                    </TableCell>
                                    <TableCell>
                                        Giờ khám
                                    </TableCell>
                                    <TableCell>
                                        Họ tên
                                    </TableCell>
                                    <TableCell>
                                        Điện thoại
                                    </TableCell>
                                    <TableCell>
                                        Bác sĩ khám
                                    </TableCell>
                                    <TableCell>
                                        Trạng thái
                                    </TableCell>
                                    <TableCell>
                                        Ghi chú
                                    </TableCell>
                                    <TableCell>
                                        Đổi giờ
                                    </TableCell>
                                    <TableCell>
                                        Hồ sơ
                                    </TableCell>
                                    <TableCell>
                                        Xoá
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {schedules.slice(0, limit).map((schedule) => (
                                    <TableRow
                                        hover
                                        key={schedule.id}
                                        selected={selectedScheduleIds.indexOf(schedule.id) !== -1}
                                    >
                                        <TableCell>
                                            {new Date(schedule.schedule_time).toLocaleString().split(',')[0]}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(schedule.schedule_time).toLocaleString().split(',')[1]}
                                        </TableCell>
                                        <TableCell>
                                            {schedule.patient.fullname}
                                        </TableCell>
                                        <TableCell>
                                            {schedule.patient.phone}
                                        </TableCell>
                                        <TableCell>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={schedule.doctor.id}
                                                label="Doctor"
                                                onChange={ (e) => handleChangeDoctor(schedule.id, e.target.value) }
                                                >
                                                    {doctors != null && doctors.map((doctor) => 
                                                        <MenuItem value={doctor.id}>{ doctor.name }</MenuItem>
                                                    ) }
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {schedule.status == 0 ? 'Khám mới' : 'Tái khám'}
                                        </TableCell>
                                        <TableCell>
                                            {schedule.remark == null ? 'Không có ghi chú' : schedule.remark}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleClickOpen(schedule.schedule_time)}>
                                                <AccessAlarmsIcon></AccessAlarmsIcon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={handleClickOpenMedical}>
                                                <AssignmentIcon></AssignmentIcon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell onClick={() => handleOpenConfirm(schedule.id)}>
                                            <IconButton color="error">
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={schedules.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[25, 50, 75]}
                />
            </Card>
            <ScheduleTimedDialogs schedule_time={ scheduleTime } open={open} onClose={handleClose} />
            <MedicalRecordDialogs open={openMedical} onClose={handleCloseMedical} />
            <CustomizedDialogs
                onClose={handleCloseConfirm}
                open={openConfirm}
                title="Xoá thông tin"
                maxWidth="xs"
                actions={
                    <>
                        <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Xoá</Button>
                        <Button variant="outlined" onClick={handleCloseConfirm}>Huỷ</Button>
                    </>
                }
            >
                Bạn có chắc chắc muốn xoá
            </CustomizedDialogs>
            <Snackbar open={openToast} autoHideDuration={2000} onClose={handleCloseToast}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    );
};

ScheduleListResults.propTypes = {
    schedules: PropTypes.array.isRequired
};

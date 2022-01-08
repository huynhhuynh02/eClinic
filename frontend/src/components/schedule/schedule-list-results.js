import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Button, Card,
    Checkbox, FormControl,
    InputLabel,
    NativeSelect, Snackbar, Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CustomizedDialogs from '../common/dialog';
import ScheduleTimedDialogs from './schedule-dialog-datetime';
import MedicalRecordDialogs from './schedule-dialog-patient';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6}
        ref={ref}
        variant="filled"
        {...props} />;
});

export const ScheduleListResults = ({ schedules, pager, handlePage, updateScheduleTime, deleteSchedule, ...rest, }) => {
    const [selectedScheduleIds, setSelectedScheduleIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(false);
    const [openMedical, setOpenMedical] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [patient, setPatient] = useState("");
    const [scheduleTime, setScheduleTime] = useState(new Date());
    const [scheduleId, setScheduleId] = useState(null);
    const handleClickOpen = (id,date) => {
        setOpen(id);
        setScheduleTime(date);
        setScheduleId(id);
    };
    const handleClickOpenMedical = (id) => {
        let schedule = schedules.filter(item => item.id == id);
        setPatient(schedule[0].patient);
        setOpenMedical(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseMedical = () => {
        setOpenMedical(false);
    };

    const handleOpenConfirm = (id) => {
        setScheduleId(id);
        setOpenConfirm(true);
    }
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleDeleteConfirm = () => {
        deleteSchedule(scheduleId);
        setOpenConfirm(false);
        setOpenToast(true);
    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };

    const handleSelectAll = (event) => {
        let newSelectedScheduleIds;
        if (event.target.checked) {
            newSelectedScheduleIds = schedules.map((schedule) => schedule.id);
        } else {
            newSelectedScheduleIds = [];
        }
        setSelectedScheduleIds(newSelectedScheduleIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedScheduleIds.indexOf(id);
        let newSelectedScheduleIds = [];

        if (selectedIndex === -1) {
            newSelectedScheduleIds = newSelectedScheduleIds.concat(selectedScheduleIds, id);
        } else if (selectedIndex === 0) {
            newSelectedScheduleIds = newSelectedCustomerIds.concat(selectedScheduleIds.slice(1));
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
            newSelectedScheduleIds = newSelectedCustomerIds.concat(selectedScheduleIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedScheduleIds = newSelectedScheduleIds.concat(
                selectedScheduleIds.slice(0, selectedIndex),
                selectedScheduleIds.slice(selectedIndex + 1)
            );
        }

        setSelectedScheduleIds(newSelectedScheduleIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
        handlePage(event.target.value,0);
    };

    const handlePageChange = (e,newPage) => {
        handlePage(limit,newPage);
    };

    const handleScheduleTime = (scheduleTime,description) => {
        updateScheduleTime(scheduleId,scheduleTime,description);
    };

    return (
        <>
            <Card {...rest}>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedScheduleIds.length === schedules.length}
                                            color="primary"
                                            indeterminate={
                                                selectedScheduleIds.length > 0
                                                && selectedScheduleIds.length < schedules.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
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
                                {schedules.map((schedule) => (
                                    <TableRow
                                        hover
                                        key={schedule.id}
                                        selected={selectedScheduleIds.indexOf(schedule.id) !== -1}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedScheduleIds.indexOf(schedule.id) !== -1}
                                                onChange={(event) => handleSelectOne(event, schedule.id)}
                                                value="true"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {moment(schedule.schedule_time).format("DD-MM-YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            {moment(schedule.schedule_time).format("h:mm")}
                                        </TableCell>
                                        <TableCell>
                                            {schedule.patient.fullname}
                                        </TableCell>
                                        <TableCell>
                                            {schedule.patient.phone}
                                        </TableCell>
                                        <TableCell>
                                            {schedule.status == 0 ? 'Khám mới' : 'Tái khám'}
                                        </TableCell>
                                        <TableCell>
                                            {schedule.description}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={()=>{handleClickOpen(schedule.id,schedule.schedule_time)}}>
                                                <AccessAlarmsIcon></AccessAlarmsIcon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleClickOpenMedical(schedule.id)}>
                                                <AssignmentIcon></AssignmentIcon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell onClick={()=>handleOpenConfirm(schedule.id)}>
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
                    count={ pager ? pager.total : 0}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={pager ? pager.current_page-1 : 0}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
            <ScheduleTimedDialogs open={open} scheduleTime={scheduleTime} onClose={handleClose} updateScheduleTime={handleScheduleTime}  />
            <MedicalRecordDialogs open={openMedical} onClose={handleCloseMedical} patient={patient} />
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
                <Alert severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    );
};

ScheduleListResults.propTypes = {
    schedules: PropTypes.array.isRequired
};

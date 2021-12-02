import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect
} from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ScheduleTimedDialogs from './schedule-dialog-datetime';
import MedicalRecordDialogs from './schedule-dialog-patient';

export const ScheduleListResults = ({ schedules, ...rest }) => {
  const [selectedScheduleIds, setSelectedScheduleIds] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [clearedDate, setClearedDate] = useState(null);
  const [value, setValue] = useState(new Date('2019-01-01T18:54'));
  const [open, setOpen] = useState(false);
  const [openMedical, setOpenMedical] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenMedical = () => {
    setOpenMedical(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseMedical = () => {
    setOpenMedical(false);
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
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                    <TableCell padding="checkbox">
                        <Checkbox
                        checked={selectedScheduleIds.indexOf(schedule.id) !== -1}
                        onChange={(event) => handleSelectOne(event, schedule.id)}
                        value="true"
                        />
                    </TableCell>
                    <TableCell>
                        {schedule.date}
                    </TableCell>
                    <TableCell>
                        {schedule.time}
                    </TableCell>
                    <TableCell>
                        {schedule.patient.name}
                    </TableCell>
                    <TableCell>
                        {schedule.patient.phone}
                    </TableCell>
                    <TableCell>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Age
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                        >
                            {schedule.doctors?.map((doctor) => (
                                <option value={doctor.id}>{doctor.name}</option>
                            ))}
                        </NativeSelect>
                        </FormControl>
                    </TableCell>
                    <TableCell>
                        {schedule.status == 0 ? 'Khám mới' : 'Tái khám' }
                    </TableCell>
                    <TableCell>
                        {schedule.description}
                    </TableCell>
                    <TableCell>
                        <IconButton color="primary" onClick={handleClickOpen}>
                            <AccessAlarmsIcon></AccessAlarmsIcon>
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton color="primary" onClick={handleClickOpenMedical}>
                            <AssignmentIcon></AssignmentIcon>
                        </IconButton>
                    </TableCell>
                    <TableCell>
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
            rowsPerPageOptions={[5, 10, 25]}
        />
        </Card>
        <ScheduleTimedDialogs open={open} onClose={handleClose} />
        <MedicalRecordDialogs open={openMedical} onClose={handleCloseMedical} />
    </>
  );
};

ScheduleListResults.propTypes = {
  schedules: PropTypes.array.isRequired
};

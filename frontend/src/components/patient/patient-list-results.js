import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
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
  IconButton
} from '@mui/material';
import DescriptionIcon from "@mui/icons-material/Description";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import PrescriptionDialogs from './patient-prescription-dialog';
import MedicalRecordDialogs from './../schedule/schedule-dialog-patient';
import CustomizedDialogs from '../common/dialog';
import { getAge } from '../../utils/calculate-age-birthday';
import { getPaient } from '../../apis/patient.api';

export const PatientListResults = ({ schedules, pager, handlePage, onReload, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState({});
  const [openMedical, setOpenMedical] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleId, setScheduleId] = useState();

  const handleClickOpenMedical = (id) => {
    setOpenMedical(true);
    getPaient(id).then(data => {
      setIsLoading(true);
      setPatient({ ...data.data.data });
    });
    // let patient = patients.filter(item => item.id == id);
    // setPatient(patient[0]);
  };

  const handleClickOpenPrescription = (patientId, scheduleId) => {
    setOpen(true);
    setScheduleId(scheduleId);
    getPaient(patientId).then(data => {
      setIsLoading(true);
      setPatient({ ...data.data.data });
    });
  };

  const handleCloseMedical = () => {
    setOpenMedical(false);
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = patients.map((patient) => patient.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    handlePage(event.target.value, 0);
  };

  const handlePageChange = (e, newPage) => {
    handlePage(limit, newPage);
  };


  const handleOnClose = () => {
    setOpen(false);
  }

  const handleOnOpen = () => {
    setOpen(true);
  }

  const onReloadPage = () => {
    onReload();
  }


  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === patients.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0
                        && selectedCustomerIds.length < patients.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell>
                    Mã BN
                  </TableCell>
                  <TableCell>
                    Họ tên
                  </TableCell>
                  <TableCell>
                    Địa chỉ
                  </TableCell>
                  <TableCell>
                    Tuổi
                  </TableCell>
                  <TableCell>
                    Điện thoại
                  </TableCell>
                  <TableCell>
                    Hồ sơ
                  </TableCell>
                  <TableCell>
                    Kê đơn
                  </TableCell>
                  {/* <TableCell>
                    Chỉnh sửa
                  </TableCell>
                  <TableCell>
                    Xoá
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.slice(0, limit).map((schedule) => (
                  <TableRow
                    hover
                    key={schedule.id}
                    selected={selectedCustomerIds.indexOf(schedule.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(patient.id) !== -1}
                        onChange={(event) => handleSelectOne(event, patient.id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {schedule.patient.pid}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {schedule.patient.fullname}
                    </TableCell>
                    <TableCell>
                      {schedule.patient.address}
                    </TableCell>
                    <TableCell>
                      {getAge(schedule.patient.birthday)}
                    </TableCell>
                    <TableCell>
                      {schedule.patient.phone}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleClickOpenMedical(schedule.patient.id)}>
                        <AssignmentIndIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleClickOpenPrescription(schedule.patient.id, schedule.id)}>
                        <ListAltIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    {/* <TableCell align="center">
                      <IconButton href="#">
                        <AccessTimeFilledIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton href="#">
                        <DeleteIcon color="warning" />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={pager ? pager.total : 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={pager ? pager.current_page - 1 : 0}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <PrescriptionDialogs
        onReloadPage={onReloadPage}
        open={open} scheduleId={scheduleId}
        isLoading={isLoading}
        onClose={handleOnClose}
        patient={patient} />
      <MedicalRecordDialogs
        open={openMedical}
        onClose={handleCloseMedical}
        patient={patient} />
    </>
  );
};

PatientListResults.propTypes = {
  schedules: PropTypes.array.isRequired
};

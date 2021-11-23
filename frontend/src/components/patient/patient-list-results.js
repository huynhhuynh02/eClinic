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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteIcon from "@mui/icons-material/Delete";

export const PatientListResults = ({ patients, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
                    checked={selectedCustomerIds.length === patients.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < patients.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
                <TableCell>
                  Chỉnh sửa
                </TableCell>
                <TableCell>
                  Xoá
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.slice(0, limit).map((patient) => (
                <TableRow
                  hover
                  key={patient.id}
                  selected={selectedCustomerIds.indexOf(patient.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(patient.id) !== -1}
                      onChange={(event) => handleSelectOne(event, patient.id)}
                      value="true"
                    />
                  </TableCell>
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
                        {patient.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {patient.name}
                  </TableCell>
                  <TableCell>
                    {patient.address}
                  </TableCell>
                  <TableCell>
                    {patient.birthday}
                  </TableCell>
                  <TableCell>
                    {patient.phone}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <DescriptionIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <AccountBoxIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <AccessTimeFilledIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <DeleteIcon color="warning" />
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
        count={patients.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <CustomizedDialogs>

    </CustomizedDialogs>
    </>
  );
};

PatientListResults.propTypes = {
  patients: PropTypes.array.isRequired
};

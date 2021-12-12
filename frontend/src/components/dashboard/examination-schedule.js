import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DeleteIcon from "@mui/icons-material/Delete";
//
import PatientRecordsDialog from "../Modal/patient-records-dialog";

export const ExaminationSchedule = (props) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  //
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Card {...props}>
      {props.header && <CardHeader title={props.message_header} />}
      <PatientRecordsDialog open={open} handleClose={handleClose} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã bệnh nhên</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Tuổi</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>SĐT</TableCell>
                <TableCell align="center">Kê đơn</TableCell>
                <TableCell align="center">Hồ sơ</TableCell>
                <TableCell align="center">Đổi giờ</TableCell>
                <TableCell align="center">Hủy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.customers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>{customer.ref}</TableCell>
                  <TableCell>{customer.customer.name}</TableCell>
                  <TableCell>{customer.sex == 0 ? "Nữ" : "Nam"}</TableCell>
                  <TableCell>{customer.age}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <DescriptionIcon style={{ fill: "#D14343" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={handleClickOpen}>
                      <AccountBoxIcon color="secondary" />
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
        count={props.customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

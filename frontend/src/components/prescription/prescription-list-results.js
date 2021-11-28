
import { ExitToApp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function PrescriptionListResults({ prescriptions, ...rest }) {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      {rest.header && <CardHeader title={rest.message_header} />}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã bệnh nhân</TableCell>
                <TableCell>Tên bệnh nhân</TableCell>
                <TableCell>Chuẩn đoán</TableCell>
                <TableCell>Ngày tái khám</TableCell>
                <TableCell>Người tạo</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell align="center">Thông tin BN</TableCell>
                <TableCell align="center">In</TableCell>
                <TableCell align="center">Xuất HĐ</TableCell>
                <TableCell align="center">Sửa</TableCell>
                <TableCell align="center">Xoá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  selected={selectedCustomerIds.indexOf(item.id) !== -1}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.patient.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.reExaminationDate}</TableCell>
                  <TableCell>{item.doctor.name}</TableCell>
                  <TableCell>{format(item.createdAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <DescriptionIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <PrintIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <ExitToApp color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <EditIcon color="warning" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <DeleteIcon color="error" />
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
        count={prescriptions.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
PrescriptionListResults.propTypes = {
  prescriptions: PropTypes.array.isRequired,
};
import { useState } from "react";
import { v4 as uuid } from "uuid";
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
  Checkbox,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DeleteIcon from "@mui/icons-material/Delete";

const orders = [
  {
    id: uuid(),
    ref: "CDD1049",
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    sex: 0,
    age: "18",
    address: "123 home",
    phone: "0123123123",
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1048",
    amount: 25.1,
    customer: {
      name: "Cao Yu",
    },
    sex: 1,
    age: 19,
    address: "312 Korea",
    phone: "0712638122",
    createdAt: 1555016400000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1047",
    amount: 10.99,
    customer: {
      name: "Alexa Richardson",
    },
    sex: 1,
    age: 21,
    address: "123 Canada",
    phone: "0123123123",
    createdAt: 1554930000000,
    status: "refunded",
  },
  {
    id: uuid(),
    ref: "CDD1046",
    amount: 96.43,
    customer: {
      name: "Anje Keizer",
    },
    sex: 0,
    age: 19,
    address: "123 home",
    phone: "0123123123",
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1045",
    amount: 32.54,
    customer: {
      name: "Clarke Gillebert",
    },
    sex: 1,
    age: 19,
    address: "123 home",
    phone: "0123123123",
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
    },
    sex: 1,
    age: 19,
    address: "123 home",
    phone: "0123123123",
    createdAt: 1554670800000,
    status: "delivered",
  },
];

export const ExaminationSchedule = (props) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = orders.map((order) => order.id);
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
    <Card {...props}>
      <CardHeader title="Cần khám hôm nay" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox
                    checked={selectedCustomerIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 && selectedCustomerIds.length < orders.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  selected={selectedCustomerIds.indexOf(order.id) !== -1}
                >
                  <TableCell align="center" padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(order.id) !== -1}
                      onChange={(event) => handleSelectOne(event, order.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>{order.ref}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{order.sex == 0 ? "Nữ" : "Nam"}</TableCell>
                  <TableCell>{order.age}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
                      <DescriptionIcon style={{ fill: "#D14343" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton href="#">
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
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

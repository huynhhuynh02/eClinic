import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomizedDialogs from "src/components/common/dialog";

export const SettingMedicineListResults = ({ medicines,categories, units, ...rest }) => {
//Add item properties
  const [expiredDate, setExpiredDate] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [composition, setComposition] = useState("");
  const [quantity, setQuantity] = useState(0);

//Toast properties
  const [toast, setToast] = useState({
    status: "success",
    message: "Success!",
  });
  const [showToast, setShowToast] = useState(false);

//Table properties
  const [listMedicines, setListMedicines] = useState(medicines);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

//Edit item properties
  const [editItem, setEditItem] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editExpiredDate, setEditExpiredDate] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editUnitId, setEditUnitId] = useState("");
  const [editComposition, setEditComposition] = useState("");
  const [editQuantity, setEditQuantity] = useState(0);

//Delete item properties
  const [deleteItemId, setDeleteItemId] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

//Function add
  const handleChangeDate = (event) => {
    setExpiredDate(event);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCategoryId = (event) => {
    setCategoryId(event.target.value);
  };

  const handleChangeUnitId = (event) => {
    setUnitId(event.target.value);
  };

  const handleChangeComposition = (event) => {
    setComposition(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddButton = () => {
    let input = {
      name: name.trim(),
      unit_id:unitId,
      cate_id:categoryId,
      quantity: quantity,
      expired_date:expiredDate,
      description:description,
      composition:composition,
    }
    axios.post('/api/medicines', input).then(res => {
      if (res.data.status === 'success') {
        setListMedicines([...listMedicines, res.data.medicine]);
        setName("");
        setExpiredDate(null);
        setDescription("");
        setCategoryId("");
        setUnitId("");
        setComposition("");

        console.log(res.data.medicine)
        handleShowToast("Thêm thành công!",res.data.status);
      } else {
        handleShowToast("Thêm không thành công",res.data.status);
      }
    })
  }

//Function toast
  const handleShowToast = ( message, status) => {
    toast.message = message;
    toast.status = status;
    setToast(toast);
    console.log(toast);
    setShowToast(true);
  };
  
  const handleHideToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
  };
  //Function

//Function of Table 
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = medicines.map((item) => item.id);
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

//Function edit item
  const onPressEditItemButton = (item) => {
    setEditItem(item);
     setEditExpiredDate(item.expired_date);
     setEditName(item.name);
     setEditDescription(item.description);
     setEditCategoryId(item.category.id);
     setEditUnitId(item.unit.id);
     setEditComposition(item.composition);
     setEditQuantity(item.quantity);
    
    setShowEditModal(true);
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditItem({});
  }

  const handleEditChangeDate = (event) => {
    setEditExpiredDate(event);
  };

  const handleEditChangeName = (event) => {
    setEditName(event.target.value);
  };

  const handleEditChangeDescription = (event) => {
    setEditDescription(event.target.value);
  };

  const handleEditChangeCategoryId = (event) => {
    setEditCategoryId(event.target.value);
  };

  const handleEditChangeUnitId = (event) => {
    setEditUnitId(event.target.value);
  };

  const handleEditChangeComposition = (event) => {
    setEditComposition(event.target.value);
  };
  const handleEditChangeQuantity = (event) => {
    setEditQuantity(event.target.value);
  };

  const handleSaveEditItem = async () => {

    let input = {
      id: editItem.id,
      name: editName.trim(),
      unit_id: editUnitId,
      cate_id: editCategoryId,
      quantity: editQuantity,
      expired_date: editExpiredDate,
      description: editDescription,
      composition: editComposition,
    }

    await axios.put('/api/medicines/' + editItem.id, input).then(res => {
      if (res.data.status === 'success') {
console.log(res.data.medicine)
        let index = listMedicines.findIndex((el) => el.id === editItem.id);
        listMedicines[index] = res.data.medicine;
        setListMedicines(listMedicines);
        handleShowToast("Sửa thành công!",res.data.status);
      } else {
        handleShowToast("Sửa không thành công",res.data.status);
      }
    });

    setShowEditModal(false);
  }

//Function delete item
  const handleDeleteItem = () => {
    setShowConfirmDelete(false);
    axios.delete('/api/medicines/'+ deleteItemId).then(res => {
      if (res.data.status === 'success') {

        setListMedicines(listMedicines.filter((e) => e.id !== deleteItemId));
        handleShowToast("Xoá thành công!",res.data.status);
        setDeleteItemId('');
      } else {
        handleShowToast("Xoá không thành công",res.data.status);
      }
    })
  }

  const handleOpenConfirmDeleteItem = (id) => {
      setDeleteItemId(id);
      setShowConfirmDelete(true);
  }
  const handleCloseConfirm = () => {
    setShowConfirmDelete(false);
    setDeleteItemId('');
  }

//set data local from server
  useEffect(() => {
    if (listMedicines.length === 0) {
      console.log(medicines)
      setListMedicines(medicines);
    }
  },[medicines]);

  return (
    <>
    <Card {...rest}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }}
variant="h6">
          Thông tin thuốc
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Tên thuốc *"
            variant="standard"
            value={name}
            onChange={handleChangeName}
          />
        </Box>
        <Grid container
spacing={3}>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField fullWidth
{...props}
variant="standard" />}
                  variant="standard"
                  label="Ngày hết hạn *"
                  value={expiredDate}
                  inputFormat="dd/MM/yyyy"
                  hideTabs={true}
                  onChange={handleChangeDate}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <FormControl variant="standard"
fullWidth>
                <InputLabel id="simple-select-category-label">Danh mục thuốc *</InputLabel>
                <Select
                  labelId="simple-select-category-label"
                  id="simple-select-category"
                  value={categoryId}
                  onChange={handleChangeCategoryId}
                  label="Danh mục thuốc*"
                >
                  {categories?.map((cate) => (
                    <MenuItem key={cate.id}
                      value={cate.id}>
                      {cate.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <TextField
                id="standard-number"
                label="Số lượng"
                type="number"
                InputLabelProps={{
                  shrink: true,

                }}
                variant="standard"
                value={quantity}
                  onChange={handleChangeQuantity}
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0}}
                  
              />
            </Box>
          </Grid>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <FormControl variant="standard"
fullWidth>
                <InputLabel id="simple-select-unit-label">Đơn vị tính *</InputLabel>
                <Select
                  labelId="simple-select-unit-label"
                  id="simple-select-unit"
                  value={unitId}
                  onChange={handleChangeUnitId}
                  label="Đơn vị tính *"
                >
                  {units?.map((item) => (
                    <MenuItem key={item.id}
value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid container
spacing={2} >
          <Grid item
sm={6}>
            <Box sx={{ mb: 5 }}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Thành phần"
                variant="standard"
                value={composition}
                onChange={handleChangeComposition}
                multiline={true}
              />
            </Box>
          </Grid>
          <Grid item
sm={6}>
            <Box sx={{ mb: 5 }}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Cách dùng"
                variant="standard"
                value={description}
                onChange={handleChangeDescription}
                multiline={true}
              />
            </Box>
          </Grid>
</Grid>

       

        <Button
          variant="contained"
          disabled={
            name.trim().length === 0 ||
            expiredDate?.length === 0 ||
            categoryId.length === 0 ||
            unitId.length === 0
          }
          onClick={handleAddButton}
        >
          Thêm
        </Button>
      </Box>
    </CardContent>
    </Card>
    
        <Box sx={{ mt: 3 }}>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === medicines.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < medicines.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Tên thuốc</TableCell>
                  <TableCell>Ngày hết hạn</TableCell>
                  <TableCell>Danh mục thuốc</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Đơn vị tính</TableCell>
                  <TableCell>Cách dùng</TableCell>
                  <TableCell>Thành phần</TableCell>
                  <TableCell align="right">Chỉnh sửa</TableCell>
                  <TableCell align="right">Xoá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listMedicines.slice(0, limit).map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    selected={selectedCustomerIds.indexOf(item.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(item.id) !== -1}
                        onChange={(event) => handleSelectOne(event, item.id)}
                        value="true"
                      />
                    </TableCell>

                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.expired_date}</TableCell>
                    <TableCell>{item.category?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit?.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.composition}</TableCell>
                    {/* <TableCell align="right">
                      <IconButton href="#">
                        <DescriptionIcon color="primary" />
                      </IconButton>
                    </TableCell> */}
                    <TableCell align="right">
                      <IconButton  onClick={() => onPressEditItemButton(item)}>
                        <EditIcon color="primary"  />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={()=> handleOpenConfirmDeleteItem(item.id)}>
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
          count={medicines.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        </Card>
      </Box>
      
      <Snackbar open={showToast}
autoHideDuration={2000}
onClose={handleHideToast} 
        anchorOrigin={{ vertical:"top", horizontal:"right" }}>
        <Alert severity={toast.status}
sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
      <CustomizedDialogs
                onClose={handleCloseConfirm}
                open={showConfirmDelete}
                title="Xoá thuốc"
                maxWidth="xs"
                actions={
                    <>
                        <Button variant="contained"
color="error"
onClick={handleDeleteItem}>Xoá</Button>
                        <Button variant="outlined"
onClick={handleCloseConfirm}>Huỷ</Button>
                    </>
                }
            >
                Bạn có chắc chắc muốn xoá
      </CustomizedDialogs>
      
      <CustomizedDialogs
                onClose={handleCloseEditModal}
                open={showEditModal}
                title="Chỉnh sửa thuốc"
                maxWidth="md"
                actions={
                    <>
                        <Button variant="contained"
color="success"
onClick={handleSaveEditItem}>Lưu</Button>
                        <Button variant="outlined"
onClick={handleCloseEditModal}>Huỷ</Button>
                    </>
                }
            >
      <Box sx={{ mt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Tên thuốc *"
            variant="standard"
            value={editName}
              onChange={handleEditChangeName}
          />
        </Box>
        <Grid container
spacing={3}>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField fullWidth
{...props}
variant="standard" />}
                  variant="standard"
                  label="Ngày hết hạn *"
                  value={editExpiredDate}
                  inputFormat="dd/MM/yyyy"
                  hideTabs={true}
                  onChange={handleEditChangeDate}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <FormControl variant="standard"
fullWidth>
                <InputLabel id="simple-select-category-label">Danh mục thuốc *</InputLabel>
                <Select
                  labelId="simple-select-category-label"
                  id="simple-select-category"
                  value={editCategoryId}
                  onChange={handleEditChangeCategoryId}
                  label="Danh mục thuốc*"
                >
                  {categories?.map((cate) => (
                    <MenuItem key={cate.id}
                      value={cate.id}>
                      {cate.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <TextField
                id="standard-number"
                label="Số lượng"
                type="number"
                InputLabelProps={{
                  shrink: true,

                }}
                variant="standard"
                value={editQuantity}
                  onChange={handleEditChangeQuantity}
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0}}
                  
              />
            </Box>
          </Grid>
          <Grid item
sm={3}>
            <Box sx={{ mb: 3 }}>
              <FormControl variant="standard"
fullWidth>
                <InputLabel id="simple-select-unit-label">Đơn vị tính *</InputLabel>
                <Select
                  labelId="simple-select-unit-label"
                  id="simple-select-unit"
                  value={editUnitId}
                  onChange={handleEditChangeUnitId}
                  label="Đơn vị tính *"
                >
                  {units?.map((item) => (
                    <MenuItem key={item.id}
value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid container
spacing={2} >
          <Grid item
sm={6}>
            <Box sx={{ mb: 5 }}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Thành phần"
                variant="standard"
                value={editComposition}
                onChange={handleEditChangeComposition}
                multiline={true}
              />
            </Box>
          </Grid>
          <Grid item
sm={6}>
            <Box sx={{ mb: 5 }}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Cách dùng"
                variant="standard"
                value={editDescription}
                onChange={handleEditChangeDescription}
                multiline={true}
              />
            </Box>
          </Grid>
</Grid>

      </Box>
            </CustomizedDialogs>
    </>
  );
};

SettingMedicineListResults.propTypes = {
  medicines: PropTypes.array.isRequired,
};

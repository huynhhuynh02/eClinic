import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Card,
  Grid, IconButton, Snackbar, Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import Alert from '@mui/material/Alert';
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomizedDialogs from "src/components/common/dialog";
import {addCategory,updateCategory, deleteCategory} from '../../../apis/category.api';

const MedicalCategoryGroup = ({ medicineCategories, ...rest }) => {
  const [listCategory, setListCategory] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [inputCode, setInputCode] = useState("");
  const [inputName, setInputName] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState({
    status: "success",
    message: "Success!",
  });
  const [showToast, setShowToast] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');

  //Function
  const onInputCodeChange = useCallback((e) => {
    setInputCode(e.target.value);
  }, []);

  const onInputNameChange = useCallback((e) => {
    setInputName(e.target.value);
  }, []);

  //Add new
  const onClickAddBtn = useCallback(() => {
    let input = {
      code:
        inputCode.trim().length === 0 ? generateCodeFromInputName(inputName) : inputCode.trim(),
      name: inputName.trim(),
    };
    addCategory(input).then(res => {
      if (res.data.status === 'success') {

        setListCategory([
          ...listCategory,
          res.data.category
        ]);

        setInputCode("");
        setInputName("");
        handleShowToast("Thêm thành công!",res.data.status);
      } else {
        handleShowToast("Thêm không thành công",res.data.status);
      }
    })
  }, [inputCode, inputName, listCategory,handleShowToast]);

  //Edit item
  const onClickEditIcon = (item) => {
    setEditItem(item);
  };

  const onClickSaveEditBtn = (id) => {
    updateCategory(id, editItem).then(res => {
      if (res.data.status === 'success') {
        let index = listCategory.findIndex((el) => el.id === editItem.id);
        listCategory[index] = res.data.category;
        setListCategory(listCategory);
        setEditItem({});
        handleShowToast("Sửa thành công!",res.data.status);
      } else {
        handleShowToast("Sửa không thành công",res.data.status);
        setEditItem({});
      }
    })
  };

  const onEditInputCodeChange = (e) => {
    editItem.code = e.target.value;
    setEditItem(editItem);
  };

  const onEditInputNameChange = (e) => {
    editItem.name = e.target.value;
    setEditItem(editItem);
  };

  const handleDeleteItem = () => {
    setShowConfirmDelete(false);
    deleteCategory(deleteItemId).then(res => {
      if (res.data.status === 'success') {

        setListCategory(listCategory.filter((e) => e.id !== deleteItemId));
        handleShowToast("Xoá thành công!", res.data.status);
        setDeleteItemId('');
      } else {
        handleShowToast("Xoá không thành công",res.data.status);
      }
    })
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleShowToast = useCallback( ( message, status) => {
    toast.message = message;
    toast.status = status;
    setToast(toast);
    setShowToast(true);
  }, [toast]);
  
  const handleHideToast = useCallback( (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    toast.isOpen = false;
    setShowToast(false);
  },[toast]);

  function generateCodeFromInputName(name) {
    let _code = name
      .trim()
      .split(" ")
      .map((e) => {
        if (e.trim().length !== 0) return e[0].toUpperCase();
      })
      .join("");
    return _code;
  }
  useEffect(() => {
    if (listCategory.length == 0) {
      setListCategory([...medicineCategories]);
    }
  }, [listCategory.length, medicineCategories])
  
  const handleOpenConfirmDeleteItem = (id) => {
    setDeleteItemId(id);
    setShowConfirmDelete(true);
}
const handleCloseConfirm = () => {
  setDeleteItemId('');
  setShowConfirmDelete(false);
  
}


  return (
    <>
      <Typography sx={{ mb: 3 }}
variant="h5">
        Danh mục nhóm thuốc
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Grid container
spacing={3}>
          <Grid item
xs={3}>
            <Box>
              <TextField
                fullWidth
                id="standard-error-helper-text"
                defaultValue={inputCode}
                variant="standard"
                onChange={onInputCodeChange}
                label="Mã danh mục"
                value={inputCode}
              />
            </Box>
          </Grid>

          <Grid item
xs={8}>
            <Box>
              <TextField
                fullWidth
                id="standard-error-helper-text"
                defaultValue={inputName}
                variant="standard"
                onChange={onInputNameChange}
                label="Tên danh mục *"
                value={inputName}
              />
            </Box>
          </Grid>
          <Grid item
xs={1}>
            <Button
              variant="contained"
              disabled={inputName.length == 0}
              color="success"
              onClick={onClickAddBtn}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Card {...rest}
sx={{ mt: 3 }}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === medicines.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < medicines.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell align="center">STT</TableCell>
                  <TableCell>Mã danh mục</TableCell>
                  <TableCell>Tên danh mục</TableCell>
                  <TableCell align="right">Chỉnh sửa</TableCell>
                  <TableCell align="right">Xoá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCategory?.map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    // selected={selectedCustomerIds.indexOf(item.id) !== -1}
                  >
                    <TableCell align="center">
                      <Typography color="textPrimary"
variant="body1">
                        {listCategory.findIndex((el) => el.id == item.id) + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {Object.keys(editItem).length !== 0 && editItem.id === item.id ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          onChange={onEditInputCodeChange}
                          defaultValue={editItem.code}
                        />
                      ) : (
                        <Box>{item.code}</Box>
                      )}
                    </TableCell>
                    <TableCell>
                      {Object.keys(editItem).length !== 0 && editItem.id === item.id ? (
                        <TextField
                          fullWidth
                          defaultValue={editItem.name}
                          variant="standard"
                          onChange={onEditInputNameChange}
                        />
                      ) : (
                        <Box>{item.name}</Box>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton >
                        {Object.keys(editItem).length !== 0 && editItem.id === item.id ? (
                          <SaveIcon color="success"
onClick={() => onClickSaveEditBtn(item.id)} />
                        ) : (
                          <EditIcon color="primary"
onClick={() => onClickEditIcon(item)} />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton >
                        <DeleteIcon color="error"
onClick={() => handleOpenConfirmDeleteItem(item.id)} />
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
          count={listCategory.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Snackbar  open={showToast}
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
                title="Xoá danh mục"
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
                Bạn có chắc chắc muốn xoá?
            </CustomizedDialogs>
    </>
  );
};

export default MedicalCategoryGroup;

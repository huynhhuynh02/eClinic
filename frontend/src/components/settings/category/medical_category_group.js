import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { v4 } from "uuid";

const MedicalCategoryGroup = ({ medicineCategories, ...rest }) => {
  const [listCategory, setListCategory] = useState(medicineCategories);
  const [editItem, setEditItem] = useState({});
  const [inputCode, setInputCode] = useState("");
  const [inputName, setInputName] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const onInputCodeChange = useCallback((e) => {
    setInputCode(e.target.value);
  }, []);

  const onInputNameChange = useCallback((e) => {
    setInputName(e.target.value);
  }, []);

  //Add new
  const onClickAddBtn = useCallback(() => {
    setListCategory([
      ...listCategory,
      {
        id: v4(),
        code:
          inputCode.trim().length === 0 ? generateCodeFromInputName(inputName) : inputCode.trim(),
        name: inputName.trim(),
      },
    ]);

    setInputCode("");
    setInputName("");
  }, [inputCode, inputName, listCategory]);

  //Edit item
  const onClickEditIcon = (item) => {
    setEditItem(item);
  };

  const onClickSaveEditBtn = (id) => {
    let index = listCategory.findIndex((el) => el.id === editItem.id);
    listCategory[index] = editItem;
    setListCategory(listCategory);
    setEditItem({});
  };

  const onEditInputCodeChange = (e) => {
    editItem.code = e.target.value;
    setEditItem(editItem);
  };

  const onEditInputNameChange = (e) => {
    editItem.name = e.target.value;
    setEditItem(editItem);
  };

  async function onDeleteItem(id) {
    // await CustomizedDialogs({title: "Xác nhận xoá", desription: ""})
    setListCategory(listCategory.filter((e) => e.id !== id));
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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

  return (
    <>
      <Typography sx={{ mb: 3 }} variant="h5">
        Danh mục nhóm thuốc
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
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

          <Grid item xs={8}>
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
          <Grid item xs={1}>
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
      <Card {...rest} sx={{ mt: 3 }}>
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
                {listCategory.map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    // selected={selectedCustomerIds.indexOf(item.id) !== -1}
                  >
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body1">
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
                      <IconButton href="#">
                        {Object.keys(editItem).length !== 0 && editItem.id === item.id ? (
                          <SaveIcon color="success" onClick={() => onClickSaveEditBtn(item.id)} />
                        ) : (
                          <EditIcon color="primary" onClick={() => onClickEditIcon(item)} />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton href="#">
                        <DeleteIcon color="error" onClick={() => onDeleteItem(item.id)} />
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
    </>
  );
};

export default MedicalCategoryGroup;

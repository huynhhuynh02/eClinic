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
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { v4 } from "uuid";

const MedicalCategoryGroup = ({ medicineCategories, ...rest }) => {
  const [listMedical, setListMedical] = useState(medicineCategories);
  const [editItem, setEditItem] = useState({});
  const [inputItem, setInputItem] = useState("");

  const onTextInputChange = useCallback((e) => {
    setInputItem(e.target.value);
  }, []);
  //Add new
  const onClickAddBtn = useCallback(() => {
    setListMedical([...listMedical, { id: v4(), name: inputItem, parent_id: "" }]);
    setInputItem("");
  }, [inputItem, listMedical]);
  //Edit item
  const onClickEditIcon = (item) => {
    setEditItem(item);
  };

  const onClickSaveEditBtn = (id) => {
    let index = listMedical.findIndex((el) => el.id === editItem.id);
    listMedical[index] = editItem;
    setListMedical(listMedical);
    setEditItem({});
  };

  const onEditInputChange = (e) => {
    editItem.name = e.target.value;
    setEditItem(editItem);
  };

  async function onDeleteItem(id) {
    // await CustomizedDialogs({title: "Xác nhận xoá", desription: ""})
    setListMedical(listMedical.filter((e) => e.id !== id));
  }

  return (
    <>
      <Typography sx={{ mb: 3 }} variant="h5">
        Danh mục nhóm thuốc
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Box>
              <TextField
                fullWidth
                id="standard-error-helper-text"
                defaultValue={inputItem}
                variant="standard"
                onChange={onTextInputChange}
                label="Thêm danh mục thuốc"
                value={inputItem}
              />
            </Box>
          </Grid>
          <Grid item xs={1} alignSelf="center" textAlign="right">
            <Button
              variant="contained"
              disabled={inputItem.length == 0}
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
                  <TableCell>Tên danh mục</TableCell>
                  <TableCell align="right">Chỉnh sửa</TableCell>
                  <TableCell align="right">Xoá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listMedical.map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    // selected={selectedCustomerIds.indexOf(item.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(item.id) !== -1}
                        onChange={(event) => handleSelectOne(event, item.id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell align="center">
                      <Typography color="textPrimary" variant="body1">
                        {listMedical.findIndex((el) => el.id == item.id) + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {Object.keys(editItem).length !== 0 && editItem.id === item.id ? (
                        <TextField
                          fullWidth
                          defaultValue={editItem.name}
                          variant="standard"
                          onChange={onEditInputChange}
                        />
                      ) : (
                        <Box>{item.name}</Box>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton href="#">
                        {Object.keys(editItem).length !== 0 && editItem.id === item.id ? (
                          <SaveIcon color="success" onClick={() => onClickSaveEditBtn()} />
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
        {/* <TablePagination
          component="div"
          count={medicines.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </Card>
    </>
  );
};

export default MedicalCategoryGroup;

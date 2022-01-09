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

const AcronymCategoryListResults = ({ acronyms, ...rest }) => {
  const [listAcronym, setListAcronym] = useState(acronyms);
  const [editItem, setEditItem] = useState({});
  const [inputCode, setInputCode] = useState("");
  const [inputName, setInputName] = useState("");

  const onInputCodeChange = useCallback((e) => {
    setInputCode(e.target.value);
  }, []);

  const onInputNameChange = useCallback((e) => {
    setInputName(e.target.value);
  }, []);

  //Add new
  const onClickAddBtn = useCallback(() => {
    setListAcronym([
      ...listAcronym,
      {
        id: v4(),
        code: inputCode.trim(),
        name: inputName.trim(),
      },
    ]);
    setInputCode("");
    setInputName("");
    console.log(listAcronym);
  }, [inputCode, inputName, listAcronym]);

  //Edit item
  const onClickEditIcon = (item) => {
    setEditItem(item);
  };

  const onClickSaveEditBtn = (id) => {
    let index = listAcronym.findIndex((el) => el.id === editItem.id);
    listAcronym[index] = editItem;
    setListAcronym(listAcronym);
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
    setListAcronym(listAcronym.filter((e) => e.id !== id));
  }

  return (
    <>
      <Typography sx={{ mb: 3 }} variant="h5">
        Danh mục từ viết tắt
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
                label="Mã viết tắt"
                value={inputCode}
              />
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Box>
              <TextField
                fullWidth
                id="standard-error-helper-text"
                defaultValue={inputName}
                variant="standard"
                onChange={onInputNameChange}
                label="Tên viết tắt"
                value={inputName}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              disabled={inputCode.length == 0 || inputName.length == 0}
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
                  <TableCell>Từ viết tắt</TableCell>
                  <TableCell>Nội dung</TableCell>
                  <TableCell align="right">Chỉnh sửa</TableCell>
                  <TableCell align="right">Xoá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAcronym.map((item) => (
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
                        {listAcronym.findIndex((el) => el.id == item.id) + 1}
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

export default AcronymCategoryListResults;

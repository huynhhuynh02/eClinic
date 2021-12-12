import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, 
    Typography, 
    Modal,
    FormGroup,
    FormControlLabel,
    Checkbox
  } from '@mui/material';
  import { Search as SearchIcon } from '../icons/search';
  import { Upload as UploadIcon } from '../icons/upload';
  import { Download as DownloadIcon } from '../icons/download';
  import ControlPointIcon from '@mui/icons-material/ControlPoint';
  import { useState } from 'react';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  export const ToolBar = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Box {...props}>
            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
                }}
            >
                <Typography
                sx={{ m: 1 }}
                variant="h4"
                >
                { props.title }
                </Typography>
                <Box sx={{ m: 1 }}>
                    { props.isExport && (
                        <Button
                            startIcon={(<UploadIcon fontSize="small" />)}
                            sx={{ mr: 1 }}
                        >
                            Nhập file excel
                        </Button>
                    ) }
                    { props.isImport && (
                        <Button
                            startIcon={(<DownloadIcon fontSize="small" />)}
                            sx={{ mr: 1 }}
                        >
                            Xuất file excel
                        </Button>
                    )}
                    { props.isNewButton && (
                        <Button
                            startIcon={(<ControlPointIcon/>)}
                            color="primary"
                            variant="contained"
                            onClick={ handleOpen }
                        >
                            { props.textButtonAdd }
                        </Button>
                    ) }
                </Box>
            </Box>
            { props.isSearchBox && (
                <Box sx={{ mt: 3 }}>
                    <Card>
                    <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SvgIcon
                                    color="action"
                                    fontSize="small"
                                >
                                    <SearchIcon />
                                </SvgIcon>
                                </InputAdornment>
                            )
                            }}
                            placeholder="Search customer"
                            variant="outlined"
                        />
                        </Box>
                    </CardContent>
                    </Card>
                </Box>
            ) }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box 
                    sx={style} 
                    component="form" 
                    noValidate 
                    autoComplete="off"
                >
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Thêm vai trò
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            my: 2
                        }}
                    >
                        <TextField fullWidth label="Nhập tên vai trò" id="roleName" />
                    </Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                     Chọn quyền
                    </Typography>
                    <FormGroup 
                        sx={{ 
                            overflow: 'auto',
                            maxHeight: 300,
                            position: 'relative',
                            mb: 2
                        }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Danh sách bệnh nhân" />
                        <FormControlLabel control={<Checkbox />} label="Thêm bệnh nhân" />
                        <FormControlLabel control={<Checkbox />} label="Chỉnh sửa bệnh nhân" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Xóa bệnh nhân" />
                        <FormControlLabel control={<Checkbox />} label="Danh sách đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Kê đơn thuốc" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Xóa bệnh nhân" />
                        <FormControlLabel control={<Checkbox />} label="Danh sách đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Kê đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Danh sách đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Kê đơn thuốc" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Xóa bệnh nhân" />
                        <FormControlLabel control={<Checkbox />} label="Danh sách đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Kê đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Danh sách đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Kê đơn thuốc" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Xóa bệnh nhân" />
                        <FormControlLabel control={<Checkbox />} label="Danh sách đơn thuốc" />
                        <FormControlLabel control={<Checkbox />} label="Kê đơn thuốc" />
                    </FormGroup>
                    <hr />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button onClick={ handleClose } sx={{ width: '40%', mx: 2 }} variant="outlined">
                            Hủy bỏ
                        </Button>
                        <Button sx={{ width: '40%', mx: 2 }} variant="contained">
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
  }
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import { useState } from 'react';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} style={{
      backgroundColor: ''
    }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ScheduleTimedDialogs({ open, onClose, scheduleTime, updateScheduleTime }) {
  const [scheduleDate, setScheduleDate] = useState(scheduleTime);
  const [description,setDescription] = useState("");
  return (
    <div>
      <BootstrapDialog
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" >
          Đổi giờ khám
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDateTimePicker
              displayStaticWrapperAs="desktop"
              style= {{
                maxWidth: '300px'
              }}
              value={scheduleDate}
              onChange={(newValue) => {
                setScheduleDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <Box padding={1}>
         <TextField fullWidth label="Ghi chú"  value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        </Box>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={()=>{ onClose(); updateScheduleTime(scheduleDate,description)}} 
            startIcon={<DoneIcon />}>
            Cập nhật
          </Button>
          <Button variant="outlined" color="primary" autoFocus onClick={onClose} 
            startIcon={<CancelIcon />}>
            Huỷ
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

ScheduleTimedDialogs.propTypes = {
  open: PropTypes.bool,
  scheduleId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

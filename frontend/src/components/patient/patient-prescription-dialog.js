import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomizedDialogs from '../common/dialog';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function PrescriptionDialogs(props) {
    const { open, patient, onClose, ...other } = props;
    return (
        <CustomizedDialogs
            maxWidth="lg"
            title="Kê đơn thuôc"
            open={open}
            onClose={onClose}
            actions={
                <>
                    <Button variant="contained">Lưu</Button>
                    <Button variant="contained">Lưu và in</Button>
                    <Button variant="outlined">Đóng</Button>
                </>
            }
        >
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item>Danh sách thuốc
                        <Stack direction="row" spacing={1}>
                            <Chip label="Clickable" />
                            <Chip label="Clickable" variant="outlined" />
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>Thông tin</Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>Tiến triễn bệnh</Item>
                </Grid>
            </Grid>
        </CustomizedDialogs>
    );
}

PrescriptionDialogs.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    patient: PropTypes.object,
};
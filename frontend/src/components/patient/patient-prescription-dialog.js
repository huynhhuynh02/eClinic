import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomizedDialogs from '../common/dialog';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { medicines_group } from '../../__mocks__/medicines';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function PrescriptionDialogs(props) {
    const { open, patient, onClose, ...other } = props;
    const [medicineGroupId, setMedicineGroupId] = useState('');
    const [medicines, setMedicines] = useState('');

    const handleSelectGroup = (id) => {
        setMedicineGroupId(id);
        let medicines = medicines_group.find(element => element.id = medicineGroupId);
        setMedicines(medicines);
        console.log(medicines);
    }

    // const medicinesList = () => {
    //     if (medicines) {
    //         medicines.map((item) => (
    //             <Grid item xs={6}>
    //                 <Button variant="outlined" size="small" fullWidth>{item.name}</Button>
    //             </Grid>
    //         ))
    //     }
    // }

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
                    <Typography variant="p" component="p" mb={1}>
                        Nhóm
                    </Typography>
                    {
                        medicines_group.map((group) => (
                            <Button onClick={() => handleSelectGroup(group.id)} variant="outlined" size="small" style={{ marginRight: '5px', marginBottom: '5px' }}>
                                {group.name}
                            </Button>
                        ))
                    }
                    <Typography variant="p" component="p" mb={1}>
                        Danh mục
                    </Typography>
                    <Grid container spacing={1}>
                        {/* {medicinesList} */}
                    </Grid>
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
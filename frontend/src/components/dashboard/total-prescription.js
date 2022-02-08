import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

export const TotalPrescriptions = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            ĐƠN THUỐC
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            123.456
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <DescriptionIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

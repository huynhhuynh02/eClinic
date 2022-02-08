import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

export const TotalReceipts = (props) => (
  <Card {...props}>
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
            HÓA ĐƠN
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            1530
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <ArticleIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

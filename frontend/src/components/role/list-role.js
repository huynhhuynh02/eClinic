import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

export const ListRole = ({ headings, roles, ...rest }) => {

  return (
    <>
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                    { headings.map((heading, i) => (
                        <TableCell key={ i }>
                            { heading.name }
                        </TableCell>
                    )) }
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role, i) => (
                <TableRow
                  hover
                  key={i}
                >
                  <TableCell>
                    {i+1}
                  </TableCell>
                  <TableCell>
                    {role.name}
                  </TableCell>
                  <TableCell>
                    {role.permissions.map((permission, i) => (
                        permission.name + ", "
                    ))}
                  </TableCell>
                  <TableCell>
                    2020/10/10
                  </TableCell>
                  <TableCell>
                    <IconButton href="#">
                      <DescriptionIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton href="#">
                      <DeleteIcon color="warning" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
    </>
  );
};

ListRole.propTypes = {
  roles: PropTypes.array.isRequired
};

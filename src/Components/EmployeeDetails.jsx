import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Fade,
  Divider,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
import { deleteEmployeeById, GetEmployeeDetailsById } from '../api';

// Styled components for enhanced visual appeal
const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)' 
    : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
  borderRadius: '16px',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  fontSize: '3rem',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 16px rgba(33, 150, 243, 0.3)'
    : '0 8px 16px rgba(254, 107, 139, 0.3)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  '&.header': {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '8px 24px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 5px 15px rgba(255, 255, 255, 0.1)'
      : '0 5px 15px rgba(0, 0, 0, 0.1)',
  }
}));

const EmployeeDetails = ({ toggleColorMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      const data = await GetEmployeeDetailsById(id);
      setEmployee(data);
    } catch (err) {
      console.error('Error fetching employee details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="h6" color="error">Employee not found</Typography>
        </Box>
      </Container>
    );
  }

  const handleEdit = () => {
    navigate(`/edit-employee/${employee.id}`);
  };

  const handleDeleteEmployee = async (emp) => {
    try {
        const { success } = await deleteEmployeeById(emp._id);
        if (success) {
            notify('Deleted successfully', 'success');
            fetchEmployees();
        } else {
            notify('Error deleting employee', 'error');
        }
    } catch (err) {
        console.error('Error deleting employee:', err);
        notify('Failed to delete Employee', 'error');
    }
};


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      

      <Fade in timeout={500}>
        <StyledCard>
          <CardHeader
            title={
              <Typography variant="h3" component="h1" align="center" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Employee Overview
              </Typography>
            }
            action={
              <Tooltip title="Back to Employees">
                <IconButton onClick={() => navigate('/employee')}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Grid container spacing={4} direction={isMobile ? 'column' : 'row'}>
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {employee.
                  profileImage ? (
                  <Box
                    component="img"
                    src={employee.
                      profileImage}
                    alt={employee.name}
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      boxShadow: 3,
                      border: '4px solid #ffffff',
                    }}
                  />
                ) : (
                  <StyledAvatar>{employee.name?.[0].toUpperCase()}</StyledAvatar>
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }}>
                  <Table>
                    <TableBody>
                      {[ 
                        { label: 'Name', value: employee.name },
                        { label: 'Email', value: employee.email },
                        { label: 'Phone', value: employee.phone },
                        { label: 'Department', value: employee.department },
                        { label: 'Salary', value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(employee.salary) }
                      ].map((row, index) => (
                        <TableRow key={index}>
                          <StyledTableCell className="header">{row.label}</StyledTableCell>
                          <StyledTableCell>{row.value}</StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={2} justifyContent="center">
              
              <Grid item>
                <ActionButton
                  variant="contained"
                  color="error"
                  onClick={handleDeleteEmployee(employee)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </ActionButton>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Fade>
    </Container>
  );
};

export default EmployeeDetails;

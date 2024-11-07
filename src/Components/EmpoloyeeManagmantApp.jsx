import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import { deleteEmployeeById, GetAllEmployees } from '../api';
import AddEmployee from './AddEmployee';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import {
    Box,
    Button,
    Typography,
    TextField,
    InputAdornment,
    Paper,
    Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';

const EmployeeManagementApp = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [updateEmpObject, setUpdateEmpObject] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        employees: [],
        pagination: {
            totalEmployees: 0,
            currentPage: 1,
            totalPages: 1,
            pageSize: 5,
        },
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        try {
            const response = await GetAllEmployees(search, page, limit);
            const employees = response?.data?.employees || [];
            const pagination = response?.data?.pagination || {
                totalEmployees: 0,
                currentPage: 1,
                totalPages: 1,
                pageSize: 5,
            };
            setEmployeeData({ employees, pagination });
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployeeData({
                employees: [],
                pagination: {
                    totalEmployees: 0,
                    currentPage: 1,
                    totalPages: 1,
                    pageSize: 5,
                },
            });
        }
    };

    const handleAddEmployee = () => {
        setShowModal(true);
    };

    const handleUpdateEmployee = (empObj) => {
        setUpdateEmpObject(empObj);
        setShowModal(true);
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

    const handleSearch = (e) => {
        const term = e.target.value;
        fetchEmployees(term);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
                transition: 'background-color 0.3s ease',
                py: 4,
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ width: '100%', color: theme.palette.text.primary }}
            >
                <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                        textShadow: theme.palette.mode === 'dark' 
                            ? '0 0 10px rgba(255,255,255,0.1)'
                            : '0 0 10px rgba(0,0,0,0.1)'
                    }}
                >
                    Employee Management App
                </Typography>

                <Paper
                    elevation={theme.palette.mode === 'dark' ? 4 : 2}
                    sx={{
                        width: '90%',
                        maxWidth: '1200px',
                        padding: 4,
                        backgroundColor: theme.palette.mode === 'dark' 
                            ? theme.palette.grey[800] 
                            : theme.palette.background.paper,
                        borderRadius: 3,
                        color: theme.palette.text.primary,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.palette.mode === 'dark' 
                                ? '0 8px 24px rgba(0,0,0,0.4)'
                                : '0 8px 24px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <Box mb={2} textAlign="center">
                        <Typography 
                            variant="h5" 
                            color="primary" 
                            gutterBottom
                            sx={{ fontWeight: 'medium' }}
                        >
                            Welcome to Employee Management App
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: theme.palette.mode === 'dark' 
                                    ? theme.palette.grey[400] 
                                    : theme.palette.grey[600]
                            }}
                        >
                            Manage your employees efficiently and effectively.
                        </Typography>
                    </Box>

                    <Divider 
                        sx={{ 
                            marginY: 2,
                            borderColor: theme.palette.mode === 'dark' 
                                ? 'rgba(255,255,255,0.1)' 
                                : 'rgba(0,0,0,0.1)'
                        }} 
                    />

                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                            Employee List
                        </Typography>

                        <TextField
                            onChange={handleSearch}
                            placeholder="Search Employee..."
                            variant="outlined"
                            sx={{
                                width: '40%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: theme.palette.mode === 'dark' 
                                            ? 'rgba(255,255,255,0.2)' 
                                            : 'rgba(0,0,0,0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <EmployeeTable
                        handleDeleteEmployee={handleDeleteEmployee}
                        handleUpdateEmployee={handleUpdateEmployee}
                        fetchEmployees={fetchEmployees}
                        employees={employeeData.employees}
                        pagination={employeeData.pagination}
                    />

                    <Box 
                        display="flex" 
                        justifyContent="center" 
                        gap={2}
                        mt={3}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddEmployee}
                            sx={{
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 3,
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Add New Employee
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<HomeIcon />}
                            onClick={() => navigate('/home')}
                            sx={{
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 2,
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Go to Home
                        </Button>
                    </Box>


                </Paper>
                    <AddEmployee
                        updateEmpObject={updateEmpObject}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        fetchEmployees={fetchEmployees}
                    />
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default EmployeeManagementApp;
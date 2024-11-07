import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Paper,
    Tooltip,
    TableSortLabel,
    Avatar,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeTable = ({ employees, pagination, handleUpdateEmployee, handleDeleteEmployee }) => {
    const theme = useTheme();
    const { currentPage, totalPages } = pagination;
    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderDirection, setOrderDirection] = useState('asc');
    const [sortedEmployees, setSortedEmployees] = useState([]);
    const [currentEmployees, setCurrentEmployees] = useState([]);
    const [sortFilter, setSortFilter] = useState('createdAt');

    useEffect(() => {
        const sortEmployees = () => {
            const sortedData = [...employees].sort((a, b) => {
                const aValue = a[orderBy];
                const bValue = b[orderBy];

                // Handle date sorting
                if (orderBy === 'createdAt' || orderBy === 'updatedAt') {
                    const dateA = new Date(aValue);
                    const dateB = new Date(bValue);
                    return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
                }

                // Handle string sorting
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return orderDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }

                // Handle number sorting
                return orderDirection === 'asc' ? aValue - bValue : bValue - aValue;
            });

            setSortedEmployees(sortedData);
        };

        sortEmployees();
    }, [employees, orderBy, orderDirection]);

    useEffect(() => {
        const startIdx = (currentPage - 1) * 5;
        const endIdx = startIdx + 5;
        setCurrentEmployees(sortedEmployees.slice(startIdx, endIdx));
    }, [sortedEmployees, currentPage]);

    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDropdownChange = (event) => {
        setSortFilter(event.target.value);
        setOrderBy(event.target.value);
    };

    // Optimized header configuration with width specifications
    const header = [
        { id: 'id', label: 'ID', width: '40px' },
        { id: 'profileImage', label: 'Image', width: '60px' },
        { id: 'name', label: 'Name', width: '120px' },
        { id: 'email', label: 'Email', width: '180px' },
        { id: 'phone', label: 'Phone', width: '120px' },
        { id: 'department', label: 'Dept', width: '100px' },
        { id: 'gender', label: 'Gender', width: '80px' },
        { id: 'course', label: 'Course', width: '100px' },
        { id: 'createdAt', label: 'Created', width: '150px' },
        { id: 'updatedAt', label: 'Updated', width: '150px' },
        { id: 'actions', label: 'Actions', width: '100px' },
    ];

    const TableRowComponent = ({ employee, index }) => (
        <TableRow 
            key={employee._id}
            sx={{
                '&:hover': { backgroundColor: theme.palette.action.hover },
                height: '60px'
            }}
        >
            <TableCell sx={{ padding: '4px 8px', width: header[0].width }}>{index + 1}</TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[1].width }}>
                <Link to={`/employee/${employee._id}`}>
                    {employee.profileImage ? (
                        <img
                            src={employee.profileImage}
                            alt={employee.name}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: `2px solid ${theme.palette.primary.main}`,
                            }}
                        />
                    ) : (
                        <Avatar sx={{ width: 40, height: 40, fontSize: '1.2rem', backgroundColor: theme.palette.primary.main }}>
                            {employee.name?.[0].toUpperCase()}
                        </Avatar>
                    )}
                </Link>
            </TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[2].width }}>
                <Tooltip title={employee.name}>
                    <Link 
                        to={`/employee/${employee._id}`} 
                        style={{ 
                            textDecoration: 'none', 
                            color: theme.palette.text.primary,
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '120px'
                        }}
                    >
                        {employee.name}
                    </Link>
                </Tooltip>
            </TableCell>
            <TableCell 
                sx={{ 
                    padding: '4px 8px', 
                    width: header[3].width,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                <Tooltip title={employee.email}>
                    <span>{employee.email}</span>
                </Tooltip>
            </TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[4].width }}>{employee.phone}</TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[5].width }}>{employee.department}</TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[6].width }}>{employee.gender}</TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[7].width }}>{employee.course}</TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[8].width }}>
                {new Date(employee.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[9].width }}>
                {new Date(employee.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell sx={{ padding: '4px 8px', width: header[10].width }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit">
                        <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={() => handleUpdateEmployee(employee)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleDeleteEmployee(employee)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </TableCell>
        </TableRow>
    );

    const handlePagination = (page) => {
        fetchEmployees('', page, 5, orderBy, orderDirection);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <FormControl size="small" sx={{ width: 150 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortFilter}
                        onChange={handleDropdownChange}
                        label="Sort By"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            '& .MuiSelect-select': {
                                padding: '8px 14px',
                            },
                        }}
                    >
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="createdAt">Created At</MenuItem>
                        <MenuItem value="updatedAt">Updated At</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer 
                component={Paper} 
                sx={{ 
                    maxHeight: 400,
                    borderRadius: 1,
                    boxShadow: theme.shadows[2],
                }}
            >
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            {header.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    sx={{
                                        width: headCell.width,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        backgroundColor: theme.palette.grey[200],
                                    }}
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? orderDirection : 'asc'}
                                        onClick={() => handleSortRequest(headCell.id)}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentEmployees.map((employee, index) => (
                            <TableRowComponent employee={employee} index={index} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employees.length}
                rowsPerPage={5}
                page={currentPage - 1}
                onPageChange={(event, newPage) => handlePagination(newPage + 1)}
                onRowsPerPageChange={(event) => handlePagination(1, event.target.value)}
            />
        </Box>
    );
};

export default EmployeeTable;

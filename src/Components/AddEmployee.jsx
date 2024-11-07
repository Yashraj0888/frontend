import React, { useEffect, useState } from 'react';
import { CreateEmployee, UpdateEmployeeById } from '../api'; // Assume you have an API endpoint to check email uniqueness
import { notify } from '../utils';
import { Select, MenuItem, FormControl, InputLabel, TextField, RadioGroup, FormControlLabel, Radio, Button, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';  // Add the AddIcon for the Add button

const AddEmployee = ({ showModal, setShowModal, fetchEmployees, updateEmpObject }) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null,
        gender: 'Male', // default gender value
        course: '' // added course field
    });
    const [updateMode, setUpdateMode] = useState(false);
    const [isEmailUnique, setIsEmailUnique] = useState(true); // To track email uniqueness

    useEffect(() => {
        if (updateEmpObject) {
            setUpdateMode(true);
            setEmployee(updateEmpObject);
        } else {
            setUpdateMode(false);
            resetEmployeeStates();
        }
    }, [updateEmpObject]);

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
            gender: 'Male', // Reset to default
            course: '' // Reset course
        });
        setIsEmailUnique(true); // Reset email uniqueness status
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setEmployee((prevEmployee) => ({ ...prevEmployee, profileImage: e.target.files[0] }));
    };

    const handleCloseButton = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    };

    const validateInputs = () => {
        if (employee.phone.length !== 10) {
            notify('Phone number must be 10 digits', 'error');
            return false;
        }

        if (!isEmailUnique) {
            notify('Email is not unique. Please provide a unique email address.', 'error');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs before submitting
        if (!validateInputs()) {
            return;
        }

        try {
            const { success, message } = updateMode
                ? await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);

            console.log('create OR update ', success, message);
            if (success) {
                notify(message, 'success');
                setShowModal(false);
                resetEmployeeStates();
            } else {
                notify(message, 'error');
                setShowModal(true);
            }

           
            
            fetchEmployees();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Employee', 'error');
        }
    };

    const handleEmailChange = async (e) => {
        const email = e.target.value;
        setEmployee((prevEmployee) => ({ ...prevEmployee, email }));

        // Check if email is unique (for existing employees in update mode)
        if (updateMode) return; // Skip checking if it's in update mode
    };

    const departments = [
        'HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'IT', 'Operations',
    ];

    const courses = [
        'Computer Science', 'Business Administration', 'Marketing', 'Electrical Engineering', 'Mechanical Engineering', 'Human Resources'
    ];

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden={!showModal}
            style={{ display: showModal ? 'block' : 'none' }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ padding: '10px' }}>
                    <div className="modal-header" style={{ position: 'relative', padding: '10px' }}>
                        <Typography variant="h6" color="textPrimary" style={{ padding: '0' }}>
                            {updateMode ? 'Update Employee' : 'Add Employee'}
                        </Typography>
                        <IconButton
                            onClick={handleCloseButton}
                            size="small"
                            color="inherit"
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="modal-body" style={{ padding: '10px' }}>
                        <form onSubmit={handleSubmit}>
                            <Box mb={1} p={0.5}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '5px' }}
                                />
                            </Box>

                            <Box mb={1} p={0.5}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    value={employee.email}
                                    onChange={handleEmailChange}
                                    required
                                    style={{ padding: '5px' }}
                                />
                            </Box>

                            <Box mb={1} p={0.5}>
                                <TextField
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '5px' }}
                                />
                            </Box>

                            <Box mb={1} p={0.5}>
                                <FormControl fullWidth>
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        name="department"
                                        value={employee.department}
                                        onChange={handleChange}
                                        label="Department"
                                        required
                                        style={{ padding: '5px' }}
                                    >
                                        <MenuItem value="">Select Department</MenuItem>
                                        {departments.map((dept, index) => (
                                            <MenuItem key={index} value={dept}>
                                                {dept}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box mb={1} p={0.5}>
                                <TextField
                                    label="Salary"
                                    variant="outlined"
                                    fullWidth
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    required
                                    style={{ padding: '5px' }}
                                />
                            </Box>

                            <Box mb={1} p={0.5}>
                                <Typography>Gender</Typography>
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={employee.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </Box>

                            {/* Course dropdown field */}
                            <Box mb={1} p={0.5}>
                                <FormControl fullWidth>
                                    <InputLabel id="course-label">Course</InputLabel>
                                    <Select
                                        labelId="course-label"
                                        id="course"
                                        name="course"
                                        value={employee.course}
                                        onChange={handleChange}
                                        label="Course"
                                        required
                                        style={{ padding: '5px' }}
                                    >
                                        <MenuItem value="">Select Course</MenuItem>
                                        {courses.map((course, index) => (
                                            <MenuItem key={index} value={course}>
                                                {course}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box mb={1} p={0.5}>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                    style={{ padding: '5px' }}
                                />
                            </Box>

                            <Box display="flex" justifyContent="center" mb={1} p={0.5}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
             // Add icon on the button
                                    style={{ padding: '5px' }}
                                >
                                    {updateMode ? 'Update use' : 'Create new'} {/* Button text change */}
                                </Button>
                            </Box>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;

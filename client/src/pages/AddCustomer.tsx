import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '../redux/Hooks';
import { addCustomerThunk } from '../customers/CustomersThunk';
import { CustomersType } from '../customers/Customers';

export interface AddCustomerProps {
    toggleCustomerSideBar: boolean;
    setToggleCustomerSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCustomerSideBar(props: AddCustomerProps) {
    const dispatch = useAppDispatch();
    const { toggleCustomerSideBar, setToggleCustomerSideBar } = props;

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required('FirstName is required'),
        lastName: yup
            .string()
            .required('LastName is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        gender: yup
            .string()
            .required('Gender is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addCustomerThunk(values as CustomersType));
        },
    });

    const toggleDrawer =
        () =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setToggleCustomerSideBar(false);
            };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Drawer
                PaperProps={{
                    sx: { width: "30%" },
                }}
                anchor="right"
                open={toggleCustomerSideBar}
                onClose={toggleDrawer()}
            >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader
                            title="Add Customer"
                            action={
                                <IconButton aria-label="close" onClick={() => {
                                    formik.resetForm()
                                    setToggleCustomerSideBar(false)
                                }
                                }>
                                    <Close />
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField select
                                fullWidth
                                id="gender"
                                name="gender"
                                label="Gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                helperText={formik.touched.gender && formik.errors.gender}
                            >
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Genderfluid">Genderfluid</MenuItem>
                            </TextField>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => {
                                formik.resetForm()
                                setToggleCustomerSideBar(false)
                            }
                            }>Cancel</Button>
                            <Button color="primary" variant="contained" type="submit">
                                Submit
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Drawer>
        </form>
    );
}

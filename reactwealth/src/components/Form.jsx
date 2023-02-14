import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { states, departments } from '../data/data';
import {useForm} from 'react-hook-form'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { WrapperDatePicker } from './WrapperDatePicker';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Modal from './Modal';

function Form() {

  const {register, handleSubmit, formState: { errors }} = useForm();

  const [state, setState] = useState("");

  const [department, setDepartment] = useState("");

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

  const onSubmit = data => {
    const employees = JSON.parse(localStorage.getItem('employe')) || [];
    localStorage.setItem("employe", JSON.stringify([...employees, data]))
    toggleModal()
  }

    return (
        <div className="container">
            <Button variant="contained" component={NavLink} className="employe" to="/employe">View Current Employees</Button>
            <Typography variant="h2">
            Create Employee
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} id="create-employee">
                <FormControl fullWidth>
                <TextField
                label="First Name"
                name='firstname'
                id="first-name"
                {...register("firstname", {
                  required: true
                })}
                variant="outlined"
                error={errors.firstname}
                 />
                 </FormControl>

                 <FormControl fullWidth>
                <TextField
                label="Last Name"
                name='lastname'
                id="last-name"
                {...register("lastname", {
                  required: true
                })}
                variant="outlined"
                error={errors.lastname}
                 />
                 </FormControl>

                <FormControl fullWidth>
                 <WrapperDatePicker
                 label="Date of Birth"
                 id="date-of-birth"
                 name='dateofbirth'
                 {...register("birthday", {
                  required: true
                })}
                error={errors.birthday}
                 />
                </FormControl>

                <FormControl fullWidth>
                 <WrapperDatePicker
                 label="Start Date"
                 id="start-date"
                 name='stardate'
                 {...register("startdate", {
                  required: true
                })}
                error={errors.startdate}
                 />
                </FormControl>

                <fieldset className="address">
                    <legend>Address</legend>

                    <FormControl fullWidth>
                    <TextField
                    label="Street"
                    id="street"
                    name='street'
                    {...register("street", {
                      required: true
                    })}
                    error={errors.street}
                    />
                </FormControl>

                <FormControl fullWidth>
                <TextField
                 label="City"
                 id="city"
                 name='city'
                 {...register("city", {
                  required: true
                })}
                 variant="outlined"
                 error={errors.city}
                 />
                </FormControl>


                <FormControl fullWidth>
                <InputLabel id="state">state</InputLabel>
                <Select
                {...register("state", {
                  required: true
                })}  
                name="state" 
                id="state" 
                value={state}
                error={errors.state}
                onChange={(e) => setState(e.target.value)}
                >
                    {states.map((state, id) => {
                    return <MenuItem key={id} value={state.name}>{state.name}</MenuItem>;
                    })}
                </Select>
                </FormControl>

                <FormControl fullWidth>
                <TextField
                 label="Zip Code"
                 id="zip-code"
                 name='zip'
                 type="number"
                 {...register("zip", {
                  required: true
                })}
                 variant="outlined"
                 error={errors.zip}
                 />
                </FormControl>
                </fieldset>

                <FormControl fullWidth>
                <InputLabel id="department">department</InputLabel>
                <Select
                {...register("department", {
                  required: true
                })}  
                name="department" 
                id="department" 
                error={errors.department}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                >
                    {departments.map((department, id) => {
                    return <MenuItem key={id} value={department.value}>{department.value}</MenuItem>;
                    })}
                </Select>
                </FormControl>

                <Button variant="contained" size='medium' sx={{ width: '40%', margin: 'auto'}} type='submit'>Save</Button>

            </form>
            
          <Modal isOpen={modal} onClose={toggleModal}>
            <Typography sx={{ position: 'absolute', top: 25, left: 15}}>User created!</Typography>
            </Modal>
        </div>
    );
}

export default Form;
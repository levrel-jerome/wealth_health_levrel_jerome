import React, { useState } from "react";
import Calendar from "react-calendar"
import { Card, Popover, TextField } from '@mui/material';

export const WrapperDatePicker = React.forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [startDate, setStartDate] = useState("");

    const onDateChange = (date) => {
      setStartDate(('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      date.getFullYear())
      setOpen(false)
    }

    const handleOnClick = event => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    };
      return (
        <>
        <TextField
          value={startDate}
          onClick={handleOnClick}
          {...props}
          ref={ref}
        />
		
		 <Popover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          elevation={1}
          sx={{ mt: 1 }}
        >
          <Card sx={{ width: '350px' }}>
            <Calendar lang="fr" onChange={onDateChange}/>
          </Card>
        </Popover>
        </>
      );
    });
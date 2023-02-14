/*
import React from 'react';
import { NavLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';


const columns = [

    { id: 'firstname', label: 'First name', minWidth: 50 },
    { id: 'lastname', label: 'Last name', minWidth: 50 },
    {
      id: 'startdate',
      label: 'Start date',
      minWidth: 50,
      align: 'right',
    },
    {
      id: 'department',
      label: 'Department',
      minWidth: 50,
      align: 'right',
    },
    {
      id: 'street',
      label: 'Street',
      minWidth: 50,
      align: 'right',
    },
    {
      id: 'city',
      label: 'City',
      minWidth: 50,
      align: 'right',
    },
    {
      id: 'state',
      label: 'State',
      minWidth: 50,
      align: 'right',
    },
    {
        id: 'birthday',
        label: 'Date of birth',
        minWidth: 50,
        align: 'right',
      }
  ];
  
 function Employe() {

  const employees = JSON.parse(localStorage.getItem('employe')) || [];

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      setData(employees)
    }, [])

    const sortTab = () => {

    }

    const handleChangeTab = (e) => {
      let value = e.target.value
      setSearchTerm(value)
    }


  


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <>

      <Typography className='title-employe' marginBottom={'50px'} variant="h2">
            Create Employee
      </Typography>
      <Paper sx={{ width: '60%', margin: 'auto', overflow: 'hidden', marginBottom:'50px' }}>
      <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
      id="outlined-basic" 
      label="Search" 
      onChange={handleChangeTab}
      variant="outlined" />
    </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((row) => {
                  return row.firstname.includes(searchTerm) || row.lastname.includes(searchTerm) || row.birthday.includes(searchTerm)
                })
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Button sx={{ display: 'flex', width: '10%', margin: 'auto'}} variant="contained" component={NavLink} className="home" to="/">Home</Button>
      </>
    );
  }

export default Employe;*/

import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import { TextField } from '@mui/material';

/*function createData(firstname, lastname, startdate, department, dateofbirth, street, city, state, zipcode) {
  return {
    firstname,
    lastname,
    startdate,
    department,
    dateofbirth,
    street,
    city,
    state,
    zipcode
  };
}*/
const rows = JSON.parse(localStorage.getItem('employe')) || [];

console.log(rows)

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function searchFilter(item, search) {
  if(search === '') {
    return true
  }
  const values = Object.values(item)
  return !!values.find((value) => value.includes(search))
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'firstname',
    numeric: false,
    disablePadding: true,
    label: 'First Name',
  },
  {
    id: 'lastname',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'startdate',
    numeric: true,
    disablePadding: false,
    label: 'Start Date',
  },
  {
    id: 'department',
    numeric: false,
    disablePadding: false,
    label: 'Department',
  },
  {
    id: 'dateofbirth',
    numeric: true,
    disablePadding: false,
    label: 'Date Of Birth',
  },
  {
    id: 'street',
    numeric: false,
    disablePadding: false,
    label: 'Street',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'state',
    numeric: false,
    disablePadding: false,
    label: 'State',
  },
  {
    id: 'zipcode',
    numeric: true,
    disablePadding: false,
    label: 'Zip Code',
  }
];

function EnhancedTableHead(props) {
  const {  order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
        <Typography
          sx={{ flex: '1 1 100%', textAlign: 'center' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Current Employees 
        </Typography>
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeTab = (e) => {
    let value = e.target.value
    setSearchTerm(value)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '80%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
      id="outlined-basic" 
      label="Search" 
      onChange={handleChangeTab}
      variant="outlined" />
    </Box>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((item) => searchFilter(item, searchTerm))
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell>{row.firstname}</TableCell>
                      <TableCell>{row.lastname}</TableCell>
                      <TableCell>{row.startdate}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.birthday}</TableCell>
                      <TableCell>{row.street}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.zip}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
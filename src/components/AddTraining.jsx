import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

export default function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [newTraining, setNewTraining] = React.useState({
        date: '', activity: '', duration: '', customer: ''
    })
    const [customers, setCustomers] = React.useState([]);

    useEffect(() => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }, []
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setNewTraining(
            {
                ...newTraining,
                [event.target.name]: event.target.value
            }
        )
    };

    const setTrainingDate = (value) => {
        newTraining.date = value;
    }

    const addNewTraining = () => {
        console.log(newTraining);
        props.saveTraining(newTraining);
        handleClose();
    };

    const customerList = customers.map(c => 
            <MenuItem value={c.links[0].href}>{c.firstname}</MenuItem>
        );

    return (
        <React.Fragment>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                Add New Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        autoFocus
                        margin="dense"
                        name="date"
                        value={newTraining.date}
                        onChange={setTrainingDate}
                        label="Date"
                        fullWidth
                        variant="standard"
                    />
                </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="activity"
                        value={newTraining.activity}
                        onChange={handleInputChange}
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={newTraining.duration}
                        onChange={handleInputChange}
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <Select
                        margin="dense"
                        name="customer"
                        value={newTraining.customer}
                        onChange={handleInputChange}
                        label="Customer"
                        fullWidth
                        variant="standard">
                        {customerList}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addNewTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

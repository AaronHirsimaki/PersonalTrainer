import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCustomer(props){

const [open, setOpen] = React.useState(false);
const [newCustomer, setNewCustomer] = React.useState({
    firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''
})

React.useEffect(() => {
    setNewCustomer(props.customerData);
}, [props.customerData]);

const handleClickOpen = () => {
    console.log(props.customerData);
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleInputChange = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value })
};

const updateCustomer = () => {
    props.updateCustomer(newCustomer);
    handleClose();
}

return (
    <React.Fragment>
        <Button onClick={handleClickOpen}>
            EDIT
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={newCustomer.firstname}
                    onChange={handleInputChange}
                    label="Firstname"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="lastname"
                    value={newCustomer.lastname}
                    onChange={handleInputChange}
                    label="Lastname"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="phone"
                    value={newCustomer.phone}
                    onChange={handleInputChange}
                    label="Phone"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="streetaddress"
                    value={newCustomer.streetaddress}
                    onChange={handleInputChange}
                    label="Streetaddress"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="postcode"
                    value={newCustomer.postcode}
                    onChange={handleInputChange}
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="city"
                    value={newCustomer.city}
                    onChange={handleInputChange}
                    label="City"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateCustomer}>Save</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
)
};

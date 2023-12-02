import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import { Button } from "@mui/material";
import EditCustomer from "./EditCustomer";
import { CSVLink } from "react-csv";

export default function Customer() {

    const [customers, setCustomers] = useState([]);

    const [csvData, setCSVData] = useState([]);

    const columns = [
        { field: 'firstname', headerName: 'Firstname', sortable: true, filter: true },
        { field: 'lastname', headerName: 'Lastname', sortable: true, filter: true },
        { field: 'streetaddress', headerName: 'Streetaddress', sortable: true, filter: true },
        { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true },
        { field: 'city', headerName: 'City', sortable: true, filter: true },
        { field: 'email', headerName: 'Email', sortable: true, filter: true },
        { field: 'phone', headerName: 'Phone', sortable: true, filter: true },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    DELETE
                </Button>,
            width: 120,
            sortable: false,
            filter: false
        },
        {
            cellRenderer: params => (
                <EditCustomer customerData={params.data} updateCustomer={updateCustomer} />
            ),
            width: 120,
            sortable: false,
            filter: false
        }
    ];

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData.content)
                setCustomers(responseData.content)
            })
            .catch(error => {
                console.log(error)
            })
    };

    const saveCustomer = (newCustomer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData:" + responseData.content);
                setCustomers(responseData.content);
            })
            .catch(error => console.error(error));
    };

    const deleteCustomer = (params) => {
        console.log(params.data.links[0].href);
        const idString = params.data.links[0].href;
        if (window.confirm('You sure?')) {
            fetch(idString, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        getCustomers();
                    } else {
                        alert('Something went wrong :(');
                    }
                })
                .catch(error => console.error(error));
        }
    }

    const updateCustomer = (newCustomer) => {
        console.log(newCustomer);
        fetch(newCustomer.links[0].href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData:" + responseData.content);
                setCustomers(responseData.content);
            })
            .catch(error => console.error(error));
            
    }


    const exportHeaders = [
        { label: 'Firstname', key: 'firstname' },
        { label: 'Lastname', key: 'lastname' },
        { label: 'Streetaddress', key: 'streetaddress' },
        { label: 'Postcode', key: 'postcode' },
        { label: 'City', key: 'city' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
    ];

    const exportData = customers.map(customer => ({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
    }));

    useEffect(() => getCustomers(), []);

    return (
        <>
            <AddCustomer saveCustomer={saveCustomer} />

            <div style={{ marginBottom: '10px' }}>
                <CSVLink data={exportData} headers={exportHeaders} filename={"customer_data.csv"}>
                    <Button variant="outlined">Export to CSV</Button>
                </CSVLink>
            </div>

            <div className="ag-theme-material"
                style={{ height: '700px', width: '85%', margin: 'auto' }}>

                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </>
    );
}

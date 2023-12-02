import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { Button } from "@mui/material";
import AddTraining from "./AddTraining";

export default function Training() {
    
    const [trainings, setTrainings] = useState([]);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleDateString('fi-FI', options);
    };

    const columns = [
        { field: 'date', 
        valueFormatter: (params) => formatDate(params.value), headerName: 'Date', sortable: true, filter: true },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
        { field: 'customer', headerName: 'Customer',
         valueGetter: (params) => { return params.data.customer.firstname + ' ' + params.data.customer.lastname;}, sortable: true, filter: true },
        { cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteTraining(params)}>
                    DELETE
                </Button>,
            width: 120,
            sortable: false, 
            filter: false
        }
    ];

    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings';

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData)
                setTrainings(responseData)
            })
            .catch(error => {
                console.log(error)
            })
    };

    const deleteTraining = (params) => {
        console.log(params.data);
        const idString = 'https://traineeapp.azurewebsites.net/api/trainings/' + params.data.id;
        if(window.confirm('You sure?')){
        fetch(idString , { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    getTrainings();
                } else {
                    alert('jokin meni vikaan');
                }
            })
            .catch(error => console.error(error));
    }
    }

    const saveTraining = (newTraining) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        }).then(response => response.json)
        .then(responseData => console.log(responseData))
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("NewData:" + responseData);
                setTrainings(responseData);
            })
            .catch(error => console.error(error));
    };

    return(
        <>
        <AddTraining saveTraining={saveTraining} />

        <div className="ag-theme-material"
            style={{ height: '700px', width: '85%', margin: 'auto' }}>

            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}>
            </AgGridReact>
        </div>
        </>
        );
}
import React from 'react';
import MaterialTable from 'material-table';
import {tableIcons} from "./tableIcons";

export default function EnhancedTable(props) {
    const {headers, records, title} = props.data
    console.log(props)
    console.log(headers, records, title)
    return (
        <MaterialTable
            icons={tableIcons}
            title={title}
            columns={headers}
            data={records}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        console.log("Adding ...")
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        console.log("Saving ...")
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        console.log("Deleting...")
                    }),
            }}
        />
    );
}

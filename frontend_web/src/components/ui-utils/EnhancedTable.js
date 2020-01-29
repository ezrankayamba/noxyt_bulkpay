import React from 'react';
import MaterialTable from 'material-table';
import {tableIcons} from "./tableIcons";
import {SimpleDialog} from "./SimpleDialog";

let {Delete} = tableIcons;

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedIds: []
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOk = this.handleOk.bind(this)
    }

    handleClose() {
        this.setState({open: false})
    }

    handleOk() {
        this.setState({open: false})
        this.props.onDeleteAll({
            ids: this.state.selectedIds,
            cb: (res) => {
                console.log("Done ...", res)
            }
        })
    }

    render() {
        const {headers, records, title} = this.props.data
        const {onAdd, onDelete, onUpdate} = this.props
        const {open} = this.state
        return (
            <div>
                <MaterialTable
                    icons={tableIcons}
                    title={title}
                    columns={headers}
                    data={records}
                    options={{
                        exportButton: true,
                        selection: true
                    }}
                    actions={[
                        {
                            tooltip: 'Remove all selected',
                            icon: () => <Delete/>,
                            onClick: (evt, data) => {
                                this.setState({
                                    selectedIds: data.map(item => item.id)
                                }, () => {
                                    console.log(this.state)
                                })
                                this.setState({open: true})
                            }
                        }
                    ]}
                    editable={{
                        onRowAdd: newData => new Promise(resolve => {
                            onAdd({...newData, cb: resolve})
                        }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                onUpdate({...newData, cb: resolve})
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                onDelete({...oldData, cb: resolve})
                            }),
                    }}
                />
                <SimpleDialog open={open} handleClose={this.handleClose} handleOk={this.handleOk} title="Confirmation"
                              description="Are you sure you want to delete selected records?"/>
            </div>
        );
    }
}

export default EnhancedTable;
import React from 'react';
import MaterialTable from 'material-table';
import {tableIcons} from "./tableIcons";
import {SimpleDialog} from "./SimpleDialog";

let {Delete, Add} = tableIcons;

class BasicCrudView extends React.Component {
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
        const {headers, records, title, exportable} = this.props.data
        const {onAdd, onDelete, onUpdate, isLoading, onRowClick} = this.props
        const {open} = this.state
        let actions = this.props.actions ? this.props.actions : []
        const toolbar = this.props.toolbar || actions.length > 0 || onAdd
        actions = [
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
            },
            ...actions
        ]
        return (
            <div>
                <MaterialTable
                    icons={tableIcons}
                    title={title}
                    columns={headers}
                    data={records}
                    isLoading={isLoading}
                    options={{
                        exportButton: exportable,
                        selection: true,
                        padding: 'dense',
                        toolbar: toolbar
                    }}
                    onRowClick={onRowClick}
                    actions={actions}
                    editable={{
                        onRowAdd: onAdd ? newData => new Promise(resolve => {
                            onAdd({...newData, cb: resolve})
                        }) : null,
                        onRowUpdate: onUpdate ? (newData, oldData) =>
                            new Promise(resolve => {
                                onUpdate({...newData, cb: resolve})
                            }) : null,
                        onRowDelete: onDelete ? oldData =>
                            new Promise(resolve => {
                                onDelete({...oldData, cb: resolve})
                            }) : null,
                    }}
                />
                <SimpleDialog open={open} handleClose={this.handleClose} handleOk={this.handleOk} title="Confirmation"
                              description="Are you sure you want to delete selected records?"/>
            </div>
        );
    }
}

export default BasicCrudView;
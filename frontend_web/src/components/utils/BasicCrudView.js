import React from 'react';
import {SimpleDialog} from "./SimpleDialog";
import CrudTable from "./CrudTable";

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

            }
        })
    }

    render() {
        const {headers, records, title} = this.props.data
        const {onAdd, onDelete, onUpdate, isLoading, onRowClick, pagination} = this.props
        const {open} = this.state
        let actions = this.props.actions ? this.props.actions : []
        let options = this.props.options ? this.props.options : {}
        actions = [
            {
                tooltip: 'Remove all selected',
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
                <CrudTable
                    title={title}
                    columns={headers}
                    data={records}
                    pagination={pagination}
                    isLoading={isLoading}
                    options={{
                        selection: true,
                        ...options
                    }}
                    onRowClick={onRowClick}
                />
                <SimpleDialog open={open} handleClose={this.handleClose} handleOk={this.handleOk} title="Confirmation"
                              description="Are you sure you want to delete selected records?"/>
            </div>
        );
    }
}

export default BasicCrudView;

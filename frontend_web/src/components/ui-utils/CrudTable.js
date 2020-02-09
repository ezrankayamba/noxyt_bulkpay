import React from 'react';
import Modal from "../modal/Modal";


class CrudTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showAdd: false}

        this.onSubmitAdd = this.onSubmitAdd.bind(this)
        this.onCloseAdd = this.onCloseAdd.bind(this)
        this.showAddModal = this.showAddModal.bind(this)
    }

    showAddModal(e) {
        this.setState({showAdd: true})
    }

    onCloseAdd(e) {
        e.preventDefault()
        this.setState({showAdd: false})
    }

    onSubmitAdd(e) {
        e.preventDefault()
        this.setState({showAdd: false})
        let fd = new FormData(e.target)
        let data = {}
        for (let entry of fd.entries()) {
            data[entry[0]] = entry[1]
        }
        this.props.onAdd(data)
    }

    render() {
        const {columns, data, onAdd, onRowClick} = this.props
        const {showAdd} = this.state
        return (
            <div>
                <table className="table table-sm table-hover table-borderless">
                    <thead>
                    <tr>
                        <td colSpan={columns.length}>
                            <div className="d-inline float-right">
                                {onAdd &&
                                <button className="btn btn-sm btn-primary" onClick={this.showAddModal}>Add</button>}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        {columns.map(col => (
                            <th className="p-2" key={col.field}>{col.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(row => <tr onClick={onRowClick ? (e) => onRowClick(e, row) : null} key={row.id}
                                         className="border">
                        {columns.map(col => (
                            <td className="p-2" key={col.field}>{col.render ? col.render(row) : row[col.field]}</td>
                        ))}
                    </tr>)}
                    </tbody>
                </table>
                <Modal modalId="manageRecord" title="Manage Record" handleClose={this.onCloseAdd} show={showAdd}
                       children={
                           <form onSubmit={this.onSubmitAdd}>
                               {columns.map(col => !col.render && <div key={col.field} className="form-group">
                                   <label htmlFor={col.field}>{col.title}</label>
                                   <input name={col.field} className="form-control"/>
                               </div>)}
                               <div className="btn-group float-right">
                                   <button onClick={this.onCloseAdd} className="btn btn-outline-danger">Cancel</button>
                                   <button type="submit" className="btn btn-outline-primary">Save record</button>
                               </div>
                           </form>
                       }
                />
            </div>
        );
    }
}

export default CrudTable;
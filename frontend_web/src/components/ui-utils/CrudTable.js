import React from 'react';
import Pagination from "./Pagination";
import LoadingIndicator from "./LoadingIndicator";
import CommonForm from "./CommonForm";
import CloseableModel from "../modal/ClosableModal";
import Icons from "./Incons";


class CrudTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageSize: 10, pageNo: 1}
    }

    onPageChange(pageNo) {
        this.setState({pageNo})
    }

    render() {
        const {columns, data, onRowClick, isLoading, newRecord, tableId, pages, count} = this.props
        const {pageSize, pageNo} = this.state
        let from = (pageNo - 1) * pageSize
        let to = from + pageSize
        let form = {
            title: "Add Record",
            fields: [
                ...columns.filter(col => !col.render).map(col => {
                    return {
                        name: col.field, label: col.title, validator: col.validator
                    }
                })
            ],
            onSubmit: newRecord && newRecord.onAdd
        }
        return (
            <div>
                {newRecord &&
                <button className="btn btn-sm btn-outline-info float-right" onClick={newRecord.show}><Icons.plus/>
                </button>}
                <table className="table table-sm table-hover table-borderless">
                    <thead>
                    <tr className="border-bottom">
                        {columns.map(col =>
                            <th key={col.field}>{col.title}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {data.slice(from, to).map(row => <tr onClick={onRowClick ? (e) => onRowClick(e, row) : null}
                                                         key={row.id}
                                                         className="border-none">
                        {columns.map(col => (
                            <td className="p-2" key={col.field}>{col.render ? col.render(row) : row[col.field]}</td>
                        ))}
                    </tr>)}
                    </tbody>
                </table>
                <LoadingIndicator isLoading={isLoading}/>
                {pages > 1 && <Pagination pageNo={pageNo} pages={pages} onPageChange={this.onPageChange.bind(this)}/>}
                {newRecord && <CloseableModel modalId="manageRecord" handleClose={newRecord.hide} show={newRecord.open}
                                              content={<CommonForm meta={form} onClose={newRecord.hide}/>}
                />}
            </div>
        );
    }
}

export default CrudTable;
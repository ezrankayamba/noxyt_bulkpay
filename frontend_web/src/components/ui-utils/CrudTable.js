import React, {Component} from 'react';


class CrudTable extends Component {
    render() {
        const {columns, data} = this.props
        console.log(columns)
        return (
            <div>
                <table className="table table-sm table-hover table-borderless">
                    <thead>
                    <tr>
                        {columns.map(col => (
                            <th className="p-2" key={col.field}>{col.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(row => <tr key={row.id} className="border">
                        {columns.map(col => (
                            <td className="p-2" key={col.field}>{col.render ? col.render(row) : row[col.field]}</td>
                        ))}
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CrudTable;
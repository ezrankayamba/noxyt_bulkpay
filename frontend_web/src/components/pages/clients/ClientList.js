import React, {Component} from 'react';
import {deleteClient, fetchClients} from "../../../_services/ClientsService";
import {connect} from "react-redux";
import EnhancedTable from "../../ui-utils/EnhancedTable";

const headCells = [
    {field: 'name', title: 'Name'},
    {field: 'account', title: 'Account'},
]

@connect((state) => {
    return {
        user: state.auth.user
    }
})
class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            order: 'asc',
            orderBy: null,
            selected: []
        }
    }

    refresh() {
        fetchClients(this.props.user.token, (res) => {
            if (res) {
                this.setState({clients: res})
            }
        })
    }

    componentDidMount() {
        this.refresh()
    }

    delete(id) {
        deleteClient(this.props.user.token, id, (res) => {
            if (res) {
                this.refresh()
            }
        })
    }

    render() {
        let {clients} = this.state;
        let data = {
            records: clients,
            headers: headCells,
            title: 'List of clients'
        }
        return (
            <div className="row">
                <div className="col">
                    {/*<div className="d-flex align-items-center pb-2 pt-2">*/}
                    {/*    <div>*/}
                    {/*        <button className="btn btn-sm btn-primary"*/}
                    {/*                onClick={() => this.props.switchView('add')}>Create New*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <EnhancedTable clients={clients} data={data}/>
                </div>
            </div>
        );
    }
}

export default ClientList;
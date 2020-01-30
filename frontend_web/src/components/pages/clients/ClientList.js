import React, {Component} from 'react';

import {
    createClient,
    deleteClient,
    deleteSelectedClients,
    fetchClients,
    updateClient
} from "../../../_services/ClientsService";
import {connect} from "react-redux";
import BasicCrudView from "../../ui-utils/BasicCrudView";
import {tableIcons} from "../../ui-utils/tableIcons";
let {Delete, Add} = tableIcons;

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
        this.doAdd = this.doAdd.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doDeleteSelected = this.doDeleteSelected.bind(this)
        this.doUpdate = this.doUpdate.bind(this)
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

    doDelete(params) {
        deleteClient(this.props.user.token, params.id, (res) => {
            params.cb()
            this.refresh()
        })
    }

    doDeleteSelected(params) {
        deleteSelectedClients(this.props.user.token, params.ids, (res) => {
            params.cb(res)
            this.refresh()
        })
    }

    doAdd(params) {
        let body = {name: params.name, account: params.account}
        createClient(this.props.user.token, body, (res) => {
            params.cb()
            this.refresh()
        });
    }

    doUpdate(params) {
        let body = {id: params.id, name: params.name, account: params.account}
        updateClient(this.props.user.token, body, params.id, (res) => {
            params.cb()
            this.refresh()
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
                    <BasicCrudView clients={clients} data={data} onDeleteAll={this.doDeleteSelected}
                                   onUpdate={this.doUpdate} onDelete={this.doDelete} onAdd={this.doAdd}/>
                </div>
            </div>
        );
    }
}

export default ClientList;
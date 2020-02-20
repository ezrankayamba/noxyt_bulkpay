import React, {Component} from 'react';

import {
    createClient,
    deleteClient,
    deleteSelectedClients,
    fetchClients,
    updateClient
} from "../../../_services/ClientsService";
import {connect} from "react-redux";
import BasicCrudView from "../../utils/BasicCrudView";
import CommonForm from "../../utils/CommonForm";
import CloseableModel from "../../modal/ClosableModal";
import LoadingIndicator from "../../utils/LoadingIndicator";
import dayjs from "dayjs";
import {DateTime} from "../../../_helpers/DateTime";

const headCells = [
    {
        field: 'name', title: 'Name', validator: {
            valid: (val) => val ? val.length >= 4 : false,
            error: "Invalid client name"
        }
    },
    {
        field: 'account', title: 'Account', validator: {
            valid: (val) => RegExp("^(|255|0)\\d{9}$").test(val),
            error: "Invalid phone number"
        }
    },
    {
        field: 'created_at', title: 'Created', render: (row) => DateTime.fmt(row.created_at)
    },
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
            selected: [],
            showAdd: false,
            pages: 1,
            pageNo: 1,
            isLoading: false,
        }

        this.doDelete = this.doDelete.bind(this)
        this.doDeleteSelected = this.doDeleteSelected.bind(this)
        this.doUpdate = this.doUpdate.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onPageChange = this.onPageChange.bind(this)
        this.doAdd = this.doAdd.bind(this)
    }

    onPageChange(pageNo) {
        this.setState({pageNo})
        this.refresh(pageNo)
    }

    refresh(page = 1) {
        this.setState({isLoading: true}, () =>
            fetchClients(this.props.user.token, page, (res) => {
                if (res) {
                    this.setState({
                        clients: res.data, isLoading: false,
                        pages: parseInt(res.pages)
                    })
                }
            }))
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

    doAdd(params, cb) {
        this.setState({isLoading: true})
        let body = {...params}
        createClient(this.props.user.token, body, (res) => {
            if (cb) cb(true)
            this.setState({showAdd: false}, () => this.refresh())
        });
    }

    doUpdate(params) {
        let body = {id: params.id, name: params.name, account: params.account}
        updateClient(this.props.user.token, body, params.id, (res) => {
            params.cb()
            this.refresh()
        })
    }

    onClose(e) {
        this.setState({showAdd: false})
    }

    render() {
        let {clients, pages, pageNo} = this.state;
        let data = {
            records: clients,
            headers: headCells,
            title: 'List of clients'
        }
        let form = {
            title: "Add Record",
            fields: [
                ...headCells.filter(col => !col.render).map(col => {
                    return {
                        name: col.field, label: col.title, validator: col.validator
                    }
                })
            ],
            onSubmit: this.doAdd
        }

        const pagination = {pages, pageNo, onPageChange: this.onPageChange}
        return (
            <div className="row">
                <div className="col">
                    <div className="row pt-2 pb-2 d-flex">
                        <div className="col-md">
                            <h5>List of clients</h5>
                        </div>
                        <div className="col-md">
                            <div className="btn-group float-md-right">
                                <button className="btn btn-primary" onClick={() => this.setState({showAdd: true})}>Add
                                    new
                                    client
                                </button>
                            </div>
                        </div>
                    </div>
                    <BasicCrudView pagination={pagination} clients={clients} data={data}
                                   onDeleteAll={this.doDeleteSelected}
                                   onUpdate={this.doUpdate} onDelete={this.doDelete} onAdd={this.doAdd} toolbar={true}/>
                    {this.state.showAdd && <CloseableModel
                        modalId="manageRecord"
                        handleClose={this.onClose}
                        show={this.state.showAdd}
                        content={<CommonForm meta={form} onClose={this.onClose}/>}/>
                    }
                    {this.state.isLoading && <LoadingIndicator isLoading={this.state.isLoading}/>}
                </div>
            </div>
        );
    }
}

export default ClientList;

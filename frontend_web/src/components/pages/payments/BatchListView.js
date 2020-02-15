import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    createBatch, createBatchFileUpload,
    createBatchManual,
    deleteBatch,
    deleteSelectedBatches,
    fetchBatches
} from "../../../_services/PaymentsService";
import BasicCrudView from "../../ui-utils/BasicCrudView";
import ManualEntryForm from "./ManualEntryForm";
import FileUploadForm from "./FileUploadForm";
import BatchDetailPopup from "./BatchDetailPopup";
import BatchActionView from "./BatchActionView";
import {refreshFSM} from "../../../redux/fsm/actions";


@connect((state) => {
    return {
        user: state.auth.user,
        fsm: state.fsm
    }
}, {refreshFSM: refreshFSM})
class BatchListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            manualEntry: false,
            fileUpload: false,
            isLoading: false,
            detail: false,
            selectedBatch: null,
            showModel: true
        }
        this.doAdd = this.doAdd.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doDeleteSelected = this.doDeleteSelected.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
        this.translate = this.translate.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    onRowClick(e, row) {
        this.setState({selectedBatch: row, detail: true})
    }

    translate(code) {
        let state = this.props.fsm.states.find(s => s.code === code)
        return state.name
    }

    manualEntryComplete(data) {
        this.setState({manualEntry: false})
        if (data.records.length) {
            this.setState({isLoading: true})
            createBatchManual(this.props.user.token, data, (res) => {
                console.log(res)
                this.refresh()
            })
        }else{
            console.error("The batch is empty")
        }
    }

    detailComplete(data) {
        this.setState({detail: false})
    }

    fileUploadComplete(data) {
        this.setState({fileUpload: false})
        if (data) {
            this.setState({isLoading: true})
            createBatchFileUpload(this.props.user.token, data, (res) => {
                console.log(res)
                this.refresh()
            })
        }
    }

    refresh() {
        this.setState({isLoading: true}, () => {
            fetchBatches(this.props.user.token, (res) => {
                if (res) {
                    this.setState({
                        payments: res.map(item => {
                            return {
                                ...item,
                                count: item.records.length,
                                statusText: this.translate(item.status),
                            }
                        }),
                        isLoading: false
                    })
                }
            })
        })
    }

    componentDidMount() {
        this.props.refreshFSM(this.props.user.token, (res) => {
            this.refresh()
        })
    }

    doDelete(params) {
        deleteBatch(this.props.user.token, params.id, (res) => {
            params.cb()
            this.refresh()
        })
    }

    doDeleteSelected(params) {
        deleteSelectedBatches(this.props.user.token, params.ids, (res) => {
            params.cb(res)
            this.refresh()
        })
    }
    testModel(e){
        this.setState({showModel: true})
    }

    doAdd(params) {
        let body = {name: params.name, comments: params.comments}
        createBatch(this.props.user.token, body, (res) => {
            params.cb()
            this.refresh()
        });
    }


    render() {
        let data = {
            records: this.state.payments,
            headers: [
                {field: 'id', title: 'BatchID'},
                {field: 'name', title: 'Name'},
                {field: 'comments', title: 'Comments'},
                {field: 'count', title: 'Count'},
                {field: 'created_at', title: 'Created'},
                {field: 'statusText', title: 'Status'},
                {
                    field: 'action', title: 'Action',
                    render: rowData => <BatchActionView rowData={rowData} complete={this.refresh}/>
                },
            ],
            title: 'List of batches'
        }
        const {isLoading, selectedBatch} = this.state
        let actions = [
            {
                tooltip: 'Refresh',
                isFreeAction: true,
                onClick: (evt, data) => {
                    this.refresh()
                }
            }
        ]

        return (
            <div className="row">
                <div className="col">
                    <div className="row pt-2 pb-2 d-flex">
                        <div className="col-md">
                            <h5>List of batches</h5>
                        </div>
                        <div className="col-md">
                            <div className="btn-group float-md-right">
                                <button className="btn btn-outline-primary" onClick={() => {
                                    this.setState({manualEntry: true})
                                }}>Manual Entry</button>
                                <button className="btn btn-outline-primary" onClick={() => {
                                    this.setState({fileUpload: true})
                                }}>Upload File</button>
                            </div>
                        </div>
                    </div>
                    <BasicCrudView data={data} onDeleteAll={this.doDeleteSelected} isLoading={isLoading}
                                   actions={actions} onRowClick={this.onRowClick}/>
                    <ManualEntryForm open={this.state.manualEntry} complete={this.manualEntryComplete.bind(this)}/>
                    <FileUploadForm open={this.state.fileUpload} complete={this.fileUploadComplete.bind(this)}/>
                    <BatchDetailPopup open={this.state.detail} complete={this.detailComplete.bind(this)}
                                      batch={selectedBatch}/>
                </div>
            </div>
        )
    }
}

export default BatchListView;
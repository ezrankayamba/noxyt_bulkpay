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
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ManualEntryForm from "./ManualEntryForm";
import FileUploadForm from "./FileUploadForm";
import RefreshIcon from '@material-ui/icons/Refresh';
import BatchDetailPopup from "./BatchDetailPopup";

@connect((state) => {
    return {
        user: state.auth.user
    }
})
class BatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            manualEntry: false,
            fileUpload: false,
            isLoading: false,
            detail: false,
            selectedBatch: null
        }
        this.doAdd = this.doAdd.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doDeleteSelected = this.doDeleteSelected.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
    }

    onRowClick(e, row) {
        console.log(row);
        this.setState({selectedBatch: row, detail: true})
    }

    manualEntryComplete(data) {
        console.log(data)
        this.setState({manualEntry: false})
        if (data) {
            this.setState({isLoading: true})
            createBatchManual(this.props.user.token, data, (res) => {
                console.log(res)
                this.refresh()
            })
        }
    }

    detailComplete(data) {
        console.log(data)
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
                                status: `${item.status === 0 ? "Loading..." : "Loaded"}`
                            }
                        }),
                        isLoading: false
                    })
                }
            })
        })

    }

    componentDidMount() {
        this.refresh()
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
                {field: 'id', title: '#'},
                {field: 'name', title: 'Name'},
                {field: 'comments', title: 'Comments'},
                {field: 'count', title: 'Count'},
                {field: 'status', title: 'Status'},
            ],
            title: 'List of batches'
        }
        const {isLoading, selectedBatch} = this.state
        let actions = [
            {
                tooltip: 'Refresh',
                icon: () => <RefreshIcon/>,
                isFreeAction: true,
                onClick: (evt, data) => {
                    this.refresh()
                }
            }
        ]
        return (
            <div className="row">
                <div className="col">
                    <Container className="p-2 d-flex justify-content-end">
                        <Button variant="contained" color="default" onClick={() => {
                            this.setState({manualEntry: true})
                        }}>
                            Manual Entry
                        </Button>
                        <Button variant="contained" color="primary" className="ml-2" onClick={() => {
                            this.setState({fileUpload: true})
                        }}>
                            File Upload
                        </Button>
                    </Container>
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

export default BatchList;
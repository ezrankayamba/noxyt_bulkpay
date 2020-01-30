import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    createBatch,
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
            fileUpload: false
        }
        this.doAdd = this.doAdd.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doDeleteSelected = this.doDeleteSelected.bind(this)
    }

    manualEntryComplete(data) {
        console.log(data)
        this.setState({manualEntry: false})
        if (data) {
            createBatchManual(this.props.user.token, data, (res) => {
                console.log(res)
            })
        }
    }

    fileUploadComplete(data) {
        console.log(data)
        this.setState({fileUpload: false})
        if(data){
            createBatchManual(this.props.user.token, data, (res) => {
                console.log(res)
            })
        }
    }

    refresh() {
        fetchBatches(this.props.user.token, (res) => {
            if (res) {
                this.setState({payments: res})
            }
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
                {field: 'name', title: 'Name'},
                {field: 'comments', title: 'Comments'},
            ],
            title: 'List of batches'
        }
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
                    <BasicCrudView data={data} onDeleteAll={this.doDeleteSelected}
                                   onUpdate={this.doUpdate} onDelete={this.doDelete}/>
                    <ManualEntryForm open={this.state.manualEntry} complete={this.manualEntryComplete.bind(this)}/>
                    <FileUploadForm open={this.state.fileUpload} complete={this.fileUploadComplete.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default BatchList;
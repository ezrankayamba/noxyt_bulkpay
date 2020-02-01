import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Dialog, DialogActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BasicCrudView from "../../ui-utils/BasicCrudView";
import Typography from "@material-ui/core/Typography";

class BatchDetailPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {batch} = this.props
        if (batch === null) {
            return null
        }
        const {records} = batch
        let data = {
            records: records,
            headers: [
                {field: 'account', title: 'MSISDN'},
                {field: 'amount', title: 'Amount'},
                {field: 'reason', title: 'Reason'},
            ],
            title: null,
            exportable: false
        }
        const {open} = this.props
        return (
            <Dialog  open={open} fullWidth={true} onClose={()=>{this.props.complete(false)}} keepMounted>
                <DialogTitle className="pb-0">{batch.name}</DialogTitle>
                <DialogContent>
                    <Typography component="p">
                        Comments: {batch.comments}
                    </Typography>
                    <BasicCrudView data={data}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={this.props.complete}>Cancel</Button>
                    <Button color="primary" onClick={this.props.complete}>Submit</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default BatchDetailPopup;
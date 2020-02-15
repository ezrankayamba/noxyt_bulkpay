import React, {Component} from 'react';
import Modal from "../../modal/Modal";
import CrudTable from "../../ui-utils/CrudTable";

class BatchDetailPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {batch} = this.props
        if (!batch) {
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
        console.log(records)
        return (
            <Modal large={true} modalId="batchDetail" title={batch.name} show={open} handleClose={() => {
                this.props.complete(false)
            }} content={<CrudTable tableId="batchDetailTable" columns={data.headers} data={records}/>}/>
        );
    }
}

export default BatchDetailPopup;
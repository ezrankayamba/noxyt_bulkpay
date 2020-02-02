import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {refreshFSM} from "../../../redux/fsm/actions";
import {executeAction} from "../../../_services/FSMService";

@connect((state) => {
    return {
        user: state.auth.user,
        fsm: state.fsm
    }
}, {refreshFSM: refreshFSM})
class BatchActionView extends Component {
    constructor(props) {
        super(props);
        this.executeAction = this.executeAction.bind(this)
    }

    executeAction(e, action, id) {
        e.preventDefault()
        e.stopPropagation()
        executeAction(this.props.user.token,{
            action: action, id: id, cb: (res) => {
                if(res){
                    this.props.complete()
                }
            }
        })
    }

    getFsmState(code) {
        let state = this.props.fsm.states.find(s => s.code === code)
        return state
    }

    render() {
        const {rowData} = this.props
        const {actions} = this.getFsmState(rowData.status)
        return actions ? (
            <ButtonGroup>
                {actions.map(a => <Button key={a.name} variant="outlined" size="small"
                                          color={a.warn ? "secondary" : "primary"}
                                          onClick={(e) => this.executeAction(e, a.name, rowData.id)}>{a.title}</Button>)}
            </ButtonGroup>
        ) : <Typography>Wait, batch is processing</Typography>
    }
}

export default BatchActionView;
import {apiGet} from "../../_services/WebService";
import {BASE_URL} from "../../conf";
import {dateAdd} from "../../_helpers/datetime";
import moment from "moment";

export const FSM_REFRESH_REQUEST = 'FSM_REFRESH_REQUEST'
export const FSM_REFRESH_SUCCESS = 'FSM_REFRESH_SUCCESS'
export const FSM_REFRESH_FAIL = 'FSM_REFRESH_FAIL'
export let refreshFSM = (token, cb) => {
    let success = ({states}) => {
        return {
            type: FSM_REFRESH_SUCCESS,
            payload: {
                states: states,
                at: Date.now()
            }
        }
    }

    let fail = (error) => {
        return {
            type: FSM_REFRESH_FAIL
        }
    }
    let request = () => {
        return {
            type: FSM_REFRESH_REQUEST
        }
    }
    console.log(token, cb)
    return (dispatch, getState) => {

        let fsm = getState().fsm
        let expired = (last) => {
            let duration = moment(last).add(5, 'minutes').diff(moment())
            return duration < 0
        }
        console.log("Refreshing fsm: ", fsm)
        if (fsm.states && fsm.at && !expired(fsm.at)) {
            console.log("Still valid: ", fsm.at)
            cb(true)
            return
        } else {
            console.log("Expired: ", fsm.at, moment().format())
        }
        dispatch(request())
        apiGet(BASE_URL + "/payments/fsm-states", token)
            .then(states => {
                dispatch(success({states}))
                cb(true)
            }).catch(error => {
            cb(false)
            dispatch(fail("FSM refresh failed"))
        })
    }
}
import {faHome, faTrash, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const Icons = {
    home: () => <FontAwesomeIcon icon={faHome}/>,
    trash: () => <FontAwesomeIcon icon={faTrash}/>,
    plus: () => <FontAwesomeIcon icon={faPlus}/>,
}

export default Icons
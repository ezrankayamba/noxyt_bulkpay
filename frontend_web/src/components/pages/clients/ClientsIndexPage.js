import React, {Component} from 'react';
import ClientList from "./ClientList";
import ClientAddForm from "./ClientAddForm";
import ClientEditForm from "./ClientEditForm";

class ClientsIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'list',
            selectedId: -1
        }
        this.switchView = this.switchView.bind(this)
    }

    switchView(name, id = -1) {
        this.setState({view: name, selectedId: id})
    }

    render() {
        switch (this.state.view) {
            case "add":
                return <ClientAddForm switchView={this.switchView}/>
            case "edit":
                return <ClientEditForm switchView={this.switchView} selectedId={this.state.selectedId}/>
            default:
                return <ClientList switchView={this.switchView}/>
        }
    }
}

export default ClientsIndexPage;
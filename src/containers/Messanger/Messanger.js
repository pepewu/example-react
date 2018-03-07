import React, {Component} from 'react';

class Messanger extends Component {
    state = {
        msgs: []
    }

    postMsg = (msg) => {
        let msgs = [...this.state.msgs];
        const id = Math.random();
        msgs.push({
            id: id,
            text: msg
        });

        this.setState({msgs: msgs});
        setTimeout(() => this.removeMsg(id), 5000);
    }

    removeMsg = (id) => {
        let msgs = [...this.state.msgs];
        let index = msgs.findIndex(msg => msg.id === id);
        msgs.splice(index, 1);

        this.setState({msgs: msgs});
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.msg === this.props.msg) return;

        this.postMsg(nextProps.msg);
    }

    render() {
        return(
            <div className="messanger">
                {this.state.msgs.map(msg => (
                    <div key={msg.id} className="msg">{msg.text}</div>
                ))}
            </div>
        );
    }
};

export default Messanger;
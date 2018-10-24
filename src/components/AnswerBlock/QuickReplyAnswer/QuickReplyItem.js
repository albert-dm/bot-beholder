import React, { Component } from 'react'

class QuickReplyItem extends Component {
    handleChange = e => {
        const { name, value } = e.target;
        let newItem = { ...this.props.item };
        newItem[name] = value;
        this.props.setItem(newItem, this.props.index);
    }

    addPayload = () => {
        let newItem = { ...this.props.item };
        newItem["payload"] = "payload";
        this.props.setItem(newItem, this.props.index);
    }

    render() {
        return (
            <div className="chip">
                <i onClick={this.props.delete} className="far fa-trash-alt right icon-btn delete"></i>
                <p><input onChange={this.handleChange} type='text' name="title" value={this.props.item.title} /></p>
                {
                    this.props.item.payload ? 
                        (<p><b>Payload:</b> <input onChange={this.handleChange} type="text" name="payload" value={this.props.item.payload} /></p>) :
                        (<button onClick={this.addPayload}>Adicionar Payload</button>)
                }
            </div>
        )
    }
}

export default QuickReplyItem
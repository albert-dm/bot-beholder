import React, { Component } from 'react'

class CarouselItemButton extends Component {
    handleChange = e => {
        const { name, value } = e.target;
        let newButton = { ...this.props.button };
        newButton[name] = value;
        this.props.setButton(newButton, this.props.index);
    }

    render() {
        return (
            <div className="block">
                <i onClick={this.props.delete} className="far fa-trash-alt right delete"></i>
                <p><b>Texto:</b> <input onChange={this.handleChange} type="text" name="text" value={this.props.button.text} /></p>
                <p><b>Payload:</b> <input onChange={this.handleChange} type="text" name="payload" value={this.props.button.payload} /></p>
                <p><b>URL:</b> <input onChange={this.handleChange} type="text" name="url" value={this.props.button.url} /></p>
            </div>
        )
    }
}

export default CarouselItemButton
import React, { Component } from 'react'
import './Block.css'

class Block extends Component {
    render () {
        return (
            <div className={"Block block" + (this.props.selected ? " selected": "")} onClick={this.props.onClick}>
                <i onClick={this.props.deleteBlock} className="far fa-trash-alt right delete"></i>
                <p>
                {
                    this.props.block.blockName ? 
                    this.props.block.blockName :
                    "Bloco sem nome" 
                }
                </p>
                <p>Mensagens: {this.props.block.expected.length}</p>
            </div>
        )
    }
}

export default Block
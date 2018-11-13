import React, { Component } from 'react';
import './Block.scss';

class Block extends Component {
    render() {
        let { block, deleteBlock, selected, ...otherProps } = this.props;
        return (
            <div
                className={`Block block${selected ? ' selected' : ''}`}
                {...otherProps}
            >
                <i onClick={deleteBlock} className="far fa-trash-alt right delete" />
                <p>{block.blockName ? block.blockName : 'Bloco sem nome'}</p>
                <p>Mensagens: {block.expected.length}</p>
            </div>
        );
    }
}

export default Block;

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Select from '../Select'
import './SelectMany.scss';

const Chip = (props) => {
    let { children, remove } = props;
    return <span className='chip' title={children}>{children}<i onClick={remove} className="fas fa-times-circle"></i></span>
}

class SelectMany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: []
        }
    }
    addItem = item => {
        this.setState(prevState => {
            return { selectedItems: [...prevState.selectedItems, item] };
        },
            () => this.props.onChange(this.state.selectedItems)
        );
    }
    removeItem = idx => {
        this.setState(prevState => {
            return prevState.selectedItems.splice(idx, 1);
        },
            () => this.props.onChange(this.state.selectedItems)
        );
    }
    selectAll = () => {
        this.setState({ selectedItems: this.props.list },
            () => this.props.onChange(this.state.selectedItems)
        );
    }
    removeAll = () => {
        this.setState({ selectedItems: [] },
            () => this.props.onChange(this.state.selectedItems)
        );
    }
    render() {
        let { selectedItems } = this.state;
        let { displayProperty, keyProperty, list, label } = this.props;
        displayProperty = displayProperty || 'name';
        keyProperty = keyProperty || 'id';
        return (
            <div className="SelectMany">
                {
                    label &&
                    <span className="label">{label}</span>
                }
                <span>{selectedItems.length > 0 ? selectedItems.map((item, idx) => <Chip key={item[keyProperty]} remove={() => { this.removeItem(idx) }}  >{item[displayProperty]}</Chip>) : 'Selecione'}</span>
                <div className="buttons">
                    <button onClick={this.selectAll}>Todos</button> <button onClick={this.removeAll}>Nenhum</button>
                </div>
                <Select
                    list={list}
                    selected={selectedItems}
                    onChange={(item) => { this.addItem(item) }}
                    displayProperty={displayProperty}
                    keyProperty={displayProperty}
                    position='left'
                />
            </div>
        )
    }
}

SelectMany.propTypes = {
    list: PropTypes.array.isRequired,
    displayProperty: PropTypes.string,
    keyProperty: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    labe: PropTypes.string
}

export default SelectMany
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Select.scss';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            filter: ''
        }
    }
    selectItem = (item) => {
        this.props.onChange(item);
    }
    render() {
        let { list, displayProperty, keyProperty, iconClass, position, selected } = this.props;
        let { showList, filter } = this.state;
        displayProperty = displayProperty || 'name';
        keyProperty = keyProperty || 'id';
        iconClass = iconClass || 'fas fa-chevron-circle-down';
        if (selected) {
            list = list.filter(item => selected.indexOf(item) === -1);
        }
        return (
            <div className="Select">
                <i className={showList ? 'fas fa-times-circle 3x' : `${iconClass} 3x`} onClick={() => this.setState((prevState) => ({ showList: !prevState.showList, filter: '' }))}></i>
                {
                    showList &&
                    <div className={`items ${position}`} onClick={() => this.setState({ showList: false })}>
                        <div className="item search" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="text"
                                placeholder="Filtro"
                                onChange={(e) => {
                                    let value = e.target.value;
                                    this.setState({ filter: value })
                                }}
                            />
                        </div>
                        {
                            list
                                .filter(item => item[displayProperty].toLowerCase().includes(filter.toLowerCase()))
                                .sort((item1, item2) => (item1[displayProperty] > item2[displayProperty]) ? 1 : ((item2[displayProperty] > item1[displayProperty]) ? -1 : 0))
                                .map(item => <div className="item" key={item[keyProperty]} onClick={(e) => { e.stopPropagation(); return this.selectItem(item) }}>{item[displayProperty]}</div>)
                        }
                    </div>
                }
            </div>
        );
    }
}

Select.propTypes = {
    list: PropTypes.array.isRequired,
    displayProperty: PropTypes.string,
    keyProperty: PropTypes.string,
    position: PropTypes.oneOf(['left', 'center']),
    selected: PropTypes.array
}

export default Select;
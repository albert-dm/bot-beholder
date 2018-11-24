import React, {Component} from 'react';
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
        let { list, displayProperty, keyProperty, iconClass } = this.props;
        let {showList, filter} = this.state;
        displayProperty = displayProperty || 'name'
        iconClass = iconClass || 'fas fa-chevron-circle-down 3x';
        return (
            <div className="Select">
                <i className={iconClass} onClick={() => this.setState((prevState) => ({ showList: !prevState.showList, filter: '' }))}></i>
                {
                    showList &&
                    <div className="items" onClick={() => this.setState({ showList: false })}>
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
                                .map(item => <div className="item" key={item[keyProperty]} onClick={() => this.selectItem(item)}>{item[displayProperty]}</div>)
                        }
                    </div>
                }
            </div>
        );
    }
}

Select.propTypes = {
    list: PropTypes.array,
    displayProperty: PropTypes.string,
    keyProperty: PropTypes.string
}

export default Select;
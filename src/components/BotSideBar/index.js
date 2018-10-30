import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
});

class BotSideBar extends Component {
    render() {
        return (
            <div className="bp-ff-nunito" style={{ padding: '5px' }}>
                <h1>Bot Side Bar</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BotSideBar);
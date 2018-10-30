import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Tracing from './Tracing';
import Testing from './Testing';
import Icon from '../../static/img/Dark_Beholder.png';

import BotSideBar from "../../components/BotSideBar/"

const grid = {
    display: 'grid',
    gridTemplateColumns: '200px auto',
    gridTemplateRows: '125px minmax(calc(100vh - 225px), auto) 100px',
    gridTemplateAreas: `"header header header header"
        "tools main main main"
        "footer footer footer footer"`,
};

const header = {
    gridArea: 'header',
    textAling: 'center',
    display: 'grid',
    gridTemplateColumns: '150px auto',
    gridTemplateRows: '100px 25px',
    gridTemplateAreas: `"icon title"
        "icon nav"`,
};
const icon = {
    padding: '5px',
    gridArea: 'icon',
    display: 'block',
    justifySelf: 'stretch',
    alignSelf: 'stretch',
};
const title = {
    gridArea: 'title',
    justifySelf: 'center',
    alignSelf: 'center',
};

const tools = {
    gridArea: 'tools',
};

const main = {
    gridArea: 'main',
};

const footer = {
    gridArea: 'footer',
    borderTop: 'solid 2px #8ca0b3',
};

class AdminRoot extends Component {
    render() {
        return (
            <div style={grid}>
                <header className="bp-bg-desk" style={header}>
                    <img src={Icon} alt="Bot Beholder" style={icon} />
                    <h1 className="bp-c-offwhite" style={title}>
                        Bot Beholder
                    </h1>
                </header>
                <div className="bp-bg-offwhite" style={tools}>
                    <BotSideBar />
                </div>
                <div className="bp-bg-offwhite" style={main}>
                    <Route exact path="/" component={Tracing} />
                    <Route exact path="/testing" component={Testing} />
                </div>
                <div className="bp-bg-breeze" style={footer}>
                    footer
                </div>
            </div>
        );
    }
}

export default AdminRoot;

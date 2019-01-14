import React, { Component } from 'react';
import './ToolBar.scss';
import AnswerModels from '../../models/AnswerModels';

import textImg from '../../static/img/Toolbar/text.svg';
import imageImg from '../../static/img/Toolbar/image.svg';
import carouselImg from '../../static/img/Toolbar/carousel.svg';
import menuImg from '../../static/img/Toolbar/menu.svg';
import quickReplyImg from '../../static/img/Toolbar/quickreply.svg';
import trackImg from '../../static/img/Toolbar/track.svg';
import iaImg from './ia.png';
import jsonImg from './json.png';

class ToolBar extends Component {
    render() {
        return (
            <div className="ButtonBar">
                <img
                    onClick={() => this.props.addAnswer(AnswerModels.text)}
                    alt="Texto"
                    title="Texto"
                    src={textImg}
                />
                <img
                    onClick={() => this.props.addAnswer(AnswerModels.menu)}
                    alt="Menu"
                    title="Menu"
                    src={menuImg}
                />
                <img
                    onClick={() => this.props.addAnswer(AnswerModels.quickReply)}
                    alt="Quick Reply"
                    title="Quick Reply"
                    src={quickReplyImg}
                />
                <img
                    onClick={() => this.props.addAnswer(AnswerModels.carousel)}
                    alt="Carrossel"
                    title="Carrossel"
                    src={carouselImg}
                />
                <img
                    onClick={() => this.props.addAnswer(AnswerModels.image)}
                    alt="Imagem"
                    title="Imagem"
                    src={imageImg}
                />
                <img
                    onClick={() => this.props.addAnswer(AnswerModels.track)}
                    alt="Track"
                    title="Track"
                    src={trackImg}
                />
                {(this.props.answers.length === 0 || this.props.answers[0].type !== 'ai') && (
                    <img
                        onClick={() => this.props.addAnswer(AnswerModels.ai)}
                        alt="IA"
                        title="IA"
                        src={iaImg}
                    />
                )}
                <img
                    onClick={() => this.props.addAnswer(AnswerModels.json)}
                    alt="Json"
                    title="Json"
                    src={jsonImg}
                />
            </div>
        );
    }
}

export default ToolBar;

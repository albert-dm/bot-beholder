import React, { Component } from 'react';
import './ToolBar.scss';
import AnswerModels from '../../models/AnswerModels';

import textImg from './img/text.png';
import imageImg from './img/image.png';
import carouselImg from './img/carousel.png';
import menuImg from './img/menu.png';
import quickReplyImg from './img/quickreply.png';
import trackImg from './img/track.png';
import iaImg from './img/ia.png';
import jsonImg from './img/json.png';

class ToolBar extends Component {
    render() {
        return (
            <div className="ToolBar">
                <img
                    className="action"
                    onClick={() => this.props.addAnswer(AnswerModels.text)}
                    alt="Text"
                    title="Text"
                    src={textImg}
                />
                <img
                    className="action"
                    onClick={() => this.props.addAnswer(AnswerModels.menu)}
                    alt="Menu"
                    title="Menu"
                    src={menuImg}
                />
                <img
                    className="action"
                    onClick={() => this.props.addAnswer(AnswerModels.quickReply)}
                    alt="QuickReply"
                    title="QuickReply"
                    src={quickReplyImg}
                />
                <img
                    className="action"
                    onClick={() => this.props.addAnswer(AnswerModels.carousel)}
                    alt="Carousel"
                    title="Carousel"
                    src={carouselImg}
                />
                <img
                    className="action"
                    onClick={() => this.props.addAnswer(AnswerModels.image)}
                    alt="Image"
                    title="Image"
                    src={imageImg}
                />
                <img
                    className="action"
                    onClick={() => this.props.addAnswer(AnswerModels.track)}
                    alt="Track"
                    title="Track"
                    src={trackImg}
                />


                {(this.props.answers.length === 0 || this.props.answers[0].type !== 'ai') && (
                    <img
                        className="action"
                        onClick={() => this.props.addAnswer(AnswerModels.ai)}
                        alt="IA"
                        title="IA"
                        src={iaImg}
                    />
                )}
                <img
                    className="action"
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

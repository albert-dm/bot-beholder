import React, { Component } from 'react';
import './ToolBar.scss';
import AnswerModels from '../../models/AnswerModels';
import SVG from 'react-inlinesvg';

import textImg from './img/text.svg';
import imageImg from './img/image.svg';
import carouselImg from './img/carousel.svg';
import menuImg from './img/menu.svg';
import quickReplyImg from './img/quickreply.svg';
import trackImg from './img/track.svg';
import iaImg from './img/ia.png';
import jsonImg from './img/json.png';

class ToolBar extends Component {
    render() {
        return (
            <div className="ToolBar">
                <button onClick={() => this.props.addAnswer(AnswerModels.text)} >
                    <SVG src={textImg} className="button">
                        Texto
                    </SVG>
                </button>
                <button onClick={() => this.props.addAnswer(AnswerModels.menu)} >
                    <SVG src={menuImg} className="button">
                        Menu
                </SVG>
                </button>
                <button onClick={() => this.props.addAnswer(AnswerModels.quickReply)} >
                    <SVG src={quickReplyImg} className="button">
                        QuickReply
                </SVG>
                </button>
                <button onClick={() => this.props.addAnswer(AnswerModels.carousel)} >
                    <SVG src={carouselImg} className="button">
                        Carousel
                </SVG>
                </button>
                <button onClick={() => this.props.addAnswer(AnswerModels.image)} >
                    <SVG src={imageImg} className="button">
                        Imagem
                </SVG>
                </button>
                <button onClick={() => this.props.addAnswer(AnswerModels.track)} >
                    <SVG src={trackImg} className="button">
                        Track
                </SVG>
                </button>


                {(this.props.answers.length === 0 || this.props.answers[0].type !== 'ai') && (
                    <img
                        className="btn"
                        onClick={() => this.props.addAnswer(AnswerModels.ai)}
                        alt="IA"
                        title="IA"
                        src={iaImg}
                    />
                )}
                <img
                    className="btn"
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

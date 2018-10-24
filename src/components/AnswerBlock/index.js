import React, { Component } from 'react'
import TextAnswer from './TextAnswer/';
import MenuAnswer from './MenuAnswer/';
import QuickReplyAnswer from './QuickReplyAnswer/';
import ImageAnswer from './ImageAnswer/';
import CarouselAnswer from './CarouselAnswer/';
import TrackAnswer from './TrackAnswer/';
import JsonAnswer from './JsonAnswer/';
import './AnswerBlock.css'
import AiAnswer from './AiAnswer';

class AnswerBlock extends Component {
    constructor(){
        super();
        this.state = {
            editing: false
        }
    }
    render () {
        return (
            <div className={"AnswerBlock" + (this.props.selected ? " selected": "")} onDoubleClick={() => this.setState({editing: true})}>
                <i onClick={this.props.deleteAnswer} className="far fa-trash-alt right icon-btn delete"></i>
                {
                    (() => {
                        if(this.state.editing){
                            return <i onClick={() => this.setState({editing: false})} className="fas fa-check right icon-btn"></i>
                        } else{
                            return <i onClick={() => this.setState({editing: true})} className="far fa-edit right icon-btn"></i>
                        }
                    })()
                }
                <br />
                {
                    (() => {
                        switch(this.props.answer.type){
                            case "text":
                            return (<TextAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing}/>);
                            case "menu":
                            return (<MenuAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing}/>);
                            case "quickreply":
                            return (<QuickReplyAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing}/>);
                            case "carousel":
                            return (<CarouselAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing} delete={this.props.deleteAnswer}/>);
                            case "image":
                            return (<ImageAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing}/>);
                            case "track":
                            return (<TrackAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing}/>);
                            case "ai":
                            return (<AiAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing} intents={this.props.intents} entities={this.props.entities}/>);
                            case "json":
                            return (<JsonAnswer answer={this.props.answer} setAnswer={this.props.setAnswer} index={this.props.index} editing={this.state.editing}/>);
                            default:
                            return (<p>Invalid Answer</p>)
                        }
                    })()
                }
            </div>
        )
    }
}

export default AnswerBlock
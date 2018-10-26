import React, { Component } from 'react'
import './Properties.css'
import ToolBar from '../ToolBar/';
import AnswerBlock from '../AnswerBlock/';

class Properties extends Component {
    constructor(){
        super();
        this.div = React.createRef();
    }
    handleChange = e => {
        const { name, value } = e.target;
        let newBlock = {...this.props};
        newBlock[name] = value;
        this.props.setBlock(newBlock);
    }

    addAnswer = (answer) => {
        let newBlock = {...this.props};
        let expected = [...this.props.expected] ;
        newBlock.expected = expected;
        if(answer.type==="ai"){
            newBlock.expected.unshift(answer);
        }else{
            newBlock.expected.push(answer);
        }
        this.props.setBlock(newBlock);
    }

    deleteAnswer = (index) => {
        let newBlock = {...this.props};
        let expected = [...this.props.expected];
        expected.splice(index, 1);
        newBlock.expected = expected;
        this.props.setBlock(newBlock);
    }

    setAnswer = (answer, index) => {
        let newBlock = {...this.props};
        let expected = [...this.props.expected];
        expected[index] = answer;
        newBlock.expected = expected;
        this.props.setBlock(newBlock);
    }

    scrollBottom = () => {
        console.log(this.div.current.scrollHeight)
        this.div.current.scrollTop = this.div.current.scrollHeight;
    }

    componentDidUpdate = () => {
        this.scrollBottom();
    }


    render() {
        return (
            <div className="Properties" ref={this.div} style={this.props.style}>
                <h2>Propriedades</h2>
                {
                     this.props.selected!=="" ?
                        (<React.Fragment>
                            <form>
                                <b>Nome do bloco:</b>
                                    <input onChange={this.handleChange} type='text' name="blockName" value={this.props.blockName} required />
                                <br /><br />
                                <b>Input que leva ao bloco:</b>
                                    <input onChange={this.handleChange} type='text' name="input" value={this.props.input} required />
                                <br />
                            </form>
                            <h3>Mensagens do bloco:</h3>
                            {this.props.expected.map((answer, index) => 
                                (<AnswerBlock key={index} answer={answer} index={index} deleteAnswer={() => {this.deleteAnswer(index) }} setAnswer={this.setAnswer.bind(this)} intents={this.props.intents} entities={this.props.entities}/>)                        
                            )}
                            <br />
                            <ToolBar addAnswer={this.addAnswer.bind(this)} answers={this.props.expected}/>
                        </React.Fragment>)
                        :
                        (<p>Selecione um bloco</p>)
                }

            </div>
        )
    }
}


export default Properties;
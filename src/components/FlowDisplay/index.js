import React, { Component } from 'react'
import './FlowDisplay.scss'
import InputFile from '../InputFile/'
import SweetAlert from 'sweetalert2-react'

const newBlock = () => ({ 
    input: "Nome do Input",
    blockName: "Novo Bloco",
    expected: []
});

class FlowDisplay extends Component {

    fileSelected = (e) => {
        let reader = new FileReader();
        var uploadJson = this.props.uploadJson;
        var file = e.target.files[0];
        var fileName = file.name.match(/([^/]+)(?=\.\w+$)/)[0];
        reader.onload = function (event) {
            let newData = JSON.parse(event.target.result);
            uploadJson(newData, fileName);
        };
        e.target.value = "";
        reader.onerror = function (event) {
            console.error("File could not be read! Code " + event.target.error.code);
        };
        reader.readAsText(file);

    }
    handleTitleChange = (e) => {
        let newTitle = e.target.value;
        this.props.setTitle(newTitle);
    }

    render() {
        return (
            <div className="FlowDisplay" style={this.props.style}>
                <ul className="ToolbarBtns">
                    <li>
                        <button title="Novo Bloco" onClick={() => this.props.addBlock(newBlock())}>
                            <i className="fas fa-plus"></i>
                        </button>
                        <div className="label">
                        Novo Bloco
                        </div>
                    </li>
                    <li>
                        <button title="Limpar Fluxo" onClick={this.props.clearFlow}>
                            <SweetAlert
                                show={false}
                                title="Tem certeza que quer limpar o fluxo?"
                                text="Some text"
                                onConfirm={this.props.clearFlow}
                            />
                            <i className="fas fa-eraser"></i>
                        </button>
                        <div className="label">
                        Limpar Fluxo
                        </div>
                    </li>
                    <li>
                        <button title="Baixar JSON" onClick={this.props.download}>
                            <i className="fas fa-download"></i>
                        </button>
                        <div className="label">
                        Baixar JSON
                        </div>
                    </li>
                    <li>
                        <InputFile label="Carregar JSON" onChange={this.fileSelected.bind(this)} accept="application/json" />
                        <div className="label">
                        Carregar JSON
                        </div>
                    </li>
                    <li>
                        <button title="Configurações" onClick={this.props.openConfig}>
                            <i className="fas fa-cogs"></i>
                        </button>
                        <div className="label">
                            Configurações
                        </div>
                    </li>
                </ul>
                <h2><input onChange={this.handleTitleChange} type='text' value={this.props.flowTitle} /></h2>
                <div className="block-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default FlowDisplay;
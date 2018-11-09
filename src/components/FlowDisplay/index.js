import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FlowDisplay.scss';
import SweetAlert from 'sweetalert2-react';
import InputFile from '../InputFile';

const newBlock = () => ({
    input: 'Nome do Input',
    blockName: 'Novo Bloco',
    expected: [],
});

class FlowDisplay extends Component {
    fileSelected = e => {
        const reader = new FileReader();
        const uploadJson = this.props.uploadJson;
        const file = e.target.files[0];
        const fileName = file.name.match(/([^/]+)(?=\.\w+$)/)[0];
        reader.onload = function (event) {
            const newData = JSON.parse(event.target.result);
            uploadJson(newData, fileName);
        };
        e.target.value = '';
        reader.onerror = function (event) {
            console.error(`File could not be read! Code ${event.target.error.code}`);
        };
        reader.readAsText(file);
    };

    handleTitleChange = e => {
        const newTitle = e.target.value;
        this.props.setTitle(newTitle);
    };

    render() {
        return (
            <div className="FlowDisplay" style={this.props.style}>
                <ul className="ToolbarBtns">
                    <li>
                        <button title="Novo Bloco" onClick={() => this.props.addBlock(newBlock())}>
                            <i className="fas fa-plus" />
                        </button>
                        <div className="label">Novo Bloco</div>
                    </li>
                    <li>
                        <button title="Limpar Fluxo" onClick={this.props.clearFlow}>
                            <SweetAlert
                                show={false}
                                title="Tem certeza que quer limpar o fluxo?"
                                text="Some text"
                                onConfirm={this.props.clearFlow}
                            />
                            <i className="fas fa-eraser" />
                        </button>
                        <div className="label">Limpar Fluxo</div>
                    </li>
                    <li>
                        <button title="Baixar JSON" onClick={this.props.download}>
                            <i className="fas fa-download" />
                        </button>
                        <div className="label">Baixar JSON</div>
                    </li>
                    <li>
                        <InputFile
                            label="Carregar JSON"
                            onChange={this.fileSelected.bind(this)}
                            accept="application/json"
                        />
                        <div className="label">Carregar JSON</div>
                    </li>
                    <li>
                        <button title="Configurações" onClick={this.props.openConfig}>
                            <i className="fas fa-cogs" />
                        </button>
                        <div className="label">Configurações</div>
                    </li>
                    <li className="delete">
                        <Link to="">
                            <button title="Excluir" onClick={this.props.delete}>
                                <i className="fas fa-trash-alt" />
                            </button>
                            <div className="label">Excluir</div>
                        </Link>
                    </li>
                </ul>
                <h2>
                    <input
                        onChange={this.handleTitleChange}
                        type="text"
                        value={this.props.flowTitle}
                    />
                </h2>
                <div className="block-container">{this.props.children}</div>
            </div>
        );
    }
}

export default FlowDisplay;

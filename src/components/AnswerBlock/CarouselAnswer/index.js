import React, { Component } from 'react';
import CarouselItem from './CarouselItem';
import './CarouselAnswer.scss';

class CarouselAnswer extends Component {
    constructor() {
        super();
        this.state = {
            itemForm: {
                title: '',
                subtitle: '',
                url: '',
                buttons: [],
            },
        };
    }

    handleItemChange = e => {
        const { name, value } = e.target;
        const newItemForm = { ...this.state.itemForm };
        newItemForm[name] = value;
        this.setState({
            itemForm: newItemForm,
        });
    };

    addItem = () => {
        const newAnswer = { ...this.props.answer };
        const newItem = {
            title: this.state.itemForm.title,
            subtitle: this.state.itemForm.subtitle,
            url: this.state.itemForm.url,
            buttons: [],
        };
        newAnswer.items = [...newAnswer.items, newItem];
        this.updateAnswer(newAnswer);
        this.setState({
            itemForm: {
                title: '',
                subtitle: '',
                url: '',
                buttons: [],
            },
        });
    };

    setItem = (item, index) => {
        const newAnswer = { ...this.props.answer };
        newAnswer.items[index] = item;
        this.updateAnswer(newAnswer);
    };

    deleteItem = index => {
        if (this.props.answer.items.length === 1) {
            this.props.delete();
        } else {
            const newAnswer = { ...this.props.answer };
            newAnswer.items.splice(index, 1);
            this.updateAnswer(newAnswer);
        }
    };

    updateAnswer = newAnswer => {
        // (TODO)validar resposta, provavelmente usando um schema
        this.props.setAnswer(newAnswer, this.props.index);
    };

    render() {
        return (
            <div className="CarouselAnswer">
                <React.Fragment>
                    {this.props.editing && (
                        <React.Fragment>
                            <h4>Mensagem de Carrossel</h4>
                        </React.Fragment>
                    )}
                    <div className="carousel-container">
                        {this.props.answer.items.map((item, index) => (
                            <CarouselItem
                                editing={this.props.editing}
                                item={item}
                                index={index}
                                setItem={this.setItem}
                                key={index}
                                delete={() => this.deleteItem(index)}
                                deleteCarousel={this.props.delete}
                            />
                        ))}
                        {this.props.editing && (
                            <div className="carousel carousel-placeholder" onClick={this.addItem}>
                                <i className="fas fa-plus" />
                            </div>
                        )}
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default CarouselAnswer;

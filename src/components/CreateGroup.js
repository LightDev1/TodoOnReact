import React from 'react';

export default class CreateGroup extends React.Component {
    constructor(props) {
        super(props);

        this.inputChange = this.inputChange.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    inputChange(e) {
        this.props.onInputChange(e.target.value);
    }

    buttonClick() {
        this.props.onButtonClick();
    }

    render() {
        return (
            <div className='create__group__ctn'>
                <input name='create' onChange={this.inputChange} value={this.props.valueInput}  />
                <button className='create__group__btn' onClick={this.buttonClick}>Создать группу</button>
            </div>
        );
    }
}
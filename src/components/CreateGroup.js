import React, { Component } from 'react';
import axios from 'axios';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.inputChange = this.inputChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.clearField = this.clearField.bind(this);
  }

  inputChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  clearField() {
    this.setState({
      text: '',
    });
  }

  buttonClick() {
    if (!this.state.text) {
      alert('Введите название списка');
      return;
    }

    axios
      .post('https://todo-app22.herokuapp.com/lists', {
        name: this.state.text,
      })
      .then(({ data }) => {
        const listobj = { ...data, tasks: [] };
        this.props.onAddList(listobj);
        this.clearField();
      })
      .catch(() => {
        alert('Ошибка при добавлении списка');
      });
  }

  render() {
    return (
      <div className="create__group__ctn">
        <input name="create" onChange={this.inputChange} value={this.state.text} />
        <button className="create__group-btn" onClick={this.buttonClick}>
          Добавить группу
        </button>
      </div>
    );
  }
}

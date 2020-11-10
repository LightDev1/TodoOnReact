import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Task from './Task';

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    clearField() {
        this.setState({
            text: ''
        });
    }

    addTask() {
        const newTask = {
            listId: this.props.groups.id,
            text: this.state.text,
            completed: false,
        }

        axios.post('http://localhost:3001/tasks', newTask).then(({data}) => {
            this.props.onAdd(this.props.groups.id, data);
            this.clearField();
        })
        .catch(() => {
                alert('Ошибка при добавлении задачи')
        });
    }

    handleChange(e) {
       this.setState({
            text: e.target.value
       });
    }

    render() {
        return (
            <div className='main__contant'>
                {!this.props.withoutAdd &&
                    <div className='create__task__ctn'>
                        <input name='create' onChange={this.handleChange} value={this.state.text} />
                        <button className='create__task__btn' onClick={this.addTask}>Добавить задачу</button>
                    </div>
                }
                <div  className='task__list'>
                    <Link to={`/lists/${this.props.groups.id}`}>
                        <span>
                            {this.props.groups.name}
                        </span>
                    </Link>
                    <ul>
                    {!this.props.withoutEmpty && !this.props.groups.tasks.length && <h2>Задачи отсутствуют</h2>}
                        {this.props.groups &&
                            this.props.groups.tasks.map(task => (
                            <Task 
                                key={task.id}
                                onRemove={this.props.onRemove}
                                onComplete={this.props.onComplete}
                                groups={this.props.groups}
                                {...task}
                            />
                        ))}
                    </ul>
                </div>
                </div>
        );
    }
}
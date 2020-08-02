import React, {Component} from 'react';
import Task from './Task';
import TaskList from './TaskList';

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [],
            text: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.handleDeleteElement = this.handleDeleteElement.bind(this);
    }

    handleChange(e) {
       this.setState({
            text: e.target.value
       });
    }

    handleClick(e) {
        if (this.state.text.length === 0) {
            return;
        }

        const newTask = {
            text: this.state.text,
            id: Date.now(),
        }

        this.setState({
            tasks: this.state.tasks.concat(newTask),
            text: '',
        });
    }

    componentDidUpdate() {
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }

    handleDeleteElement(id){
        this.setState(prevState => ({
          tasks: prevState.tasks.filter(el => el.id != id),
        }));
      };

    render() {
        return (
            <div>
                <div className='create__task__ctn'>
                    <input name='create' onChange={this.handleChange} value={this.state.text} />
                    <button className='create__task__btn' onClick={this.handleClick}>Создать задачу</button>
                </div>
                <div  className='task__list'>
                    <span>Список задач:</span>
                    <ul>
                        {this.state.tasks.map(task => (
                            <Task key={task.id} textContent={task.text}
                             onDelete={() => {this.handleDeleteElement(task.id)}}
                            />
                        ))}
                    </ul>
                </div>
                </div>
        );
    }
}
import React, { Component } from 'react';
import axios from 'axios';

import CreateGroup from './components/CreateGroup';
import Group from './components/Group';
import TodoApp from './components/TodoApp';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: null,
            activeItem: null
        }

        this.onRemoveList = this.onRemoveList.bind(this);
        this.onAddList = this.onAddList.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onClickGroup = this.onClickGroup.bind(this);
        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onCompleteTask = this.onCompleteTask.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/lists?_embed=tasks').then(({data}) => {
            this.setState({
                groups: data
            })
        });
    }

    onAddList(obj) {
        const newList = [...this.state.groups, obj];

        this.setState({
            groups: newList
        });
    }

    onRemoveList(id) {
        const newList = this.state.groups.filter(list => list.id !== id);

        this.setState({
            groups: newList
        });
    }

    onAddTask(listId, taskObj) {
        const newList = this.state.groups.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        });
        this.setState({
            groups: newList
        })
    }

    onCompleteTask(listId, taskId, completed) {
        const newList = this.state.groups.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.filter(task => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                });
            }
            return list;
        });

        this.setState({
            groups: newList
        });

        axios.patch('http://localhost:3001/tasks/' + taskId, {
            completed
        })
        .catch(() => {
            alert('Не удалось обновить задачу');
        });
    }

    onRemoveTask(listId, taskId) {
        if (window.confirm('Вы точно хотите удалить эту задачу?')) {
            const newList = this.state.groups.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId);
                }
                return item;
            });

            this.setState({
                groups: newList
            });

            axios.delete('http://localhost:3001/tasks/' + taskId)
                .catch(() => {
                    alert('Ошибка при удалении задачи');
                });
        }
    }

    onClickGroup(item) {
        this.setState({
            activeItem: item
        });
    }

    render() {
        return (
           <div className='main__container'>
            <div className='sidebar__container'>
                {this.state.groups ? (
                    <div className='group__app'>
                        <CreateGroup
                            onAddList={this.onAddList}
                        />
                        <div className='group__list'>
                            <span>Список групп задач: </span>
                            <ul>
                                {this.state.groups &&
                                    this.state.groups.map(item => {
                                        if (item) {
                                            return (
                                                <Group  
                                                    key={item.id}
                                                    textContent={item.name}
                                                    id={item.id}
                                                    item={item}
                                                    onClickGroup={this.onClickGroup}
                                                    activeItem={this.state.activeItem}
                                                    onRemove={this.onRemoveList}
                                                />
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                ) : (
                    'Загрузка...'
                )}
            </div>
            <div className='main__contant'>
               {this.state.groups &&
                    this.state.activeItem && 
                        <TodoApp
                            onAdd={this.onAddTask}
                            groups={this.state.activeItem}
                            onRemove={this.onRemoveTask}
                            onComplete={this.onCompleteTask}
                        />
                }
            </div>
           </div>
        );
    }
}
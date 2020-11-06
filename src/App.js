import React, { Component } from 'react';
import axios from 'axios';

import GroupApp from './components/GroupApp';
import TodoApp from './components/TodoApp';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: null
        }

        this.onRemoveList = this.onRemoveList.bind(this);
        this.onAddList = this.onAddList.bind(this);
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


    render() {
        return (
           <div className='main__container'>
            <div className='sidebar__container'>
                {this.state.groups ? (
                    <GroupApp
                        items={this.state.groups}
                        onRemove={this.onRemoveList}
                        onAdd={this.onAddList}
                    />
                ) : (
                    'Загрузка...'
                )}
            </div>
            <div className='main__contant'>
               <TodoApp/>
            </div>
           </div>
        );
    }
}
import React, {Component} from 'react';
import axios from 'axios';

import CreateGroup from './CreateGroup';
import Group from './Group';

export default class GroupApp extends Component {
    constructor(props) {
        super(props);
        this.handleDelClick = this.handleDelClick.bind(this);
    }

    handleDelClick(id) {
       if (window.confirm('Вы действительно хотите удалить список?')) {
           axios.delete('http://localhost:3001/lists/' + id).then(() => {
                this.props.onRemove(id)
           });
       }
    }

    render() {
        return (
            <div className='group__app'>
                <CreateGroup
                    onAddList={this.props.onAdd}
                />
                <div className='group__list'>
                    <span>Список групп задач: </span>
                    <ul>
                        {
                            this.props.items.map(item => (
                                <Group  key={item.id}
                                 textContent={item.name}
                                 id={item.id}
                                 onDelClick={this.handleDelClick}
                                 onGroupAppClick={this.props.onGroupAppClick}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
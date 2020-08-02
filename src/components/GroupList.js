import React, {Component} from 'react';

export default class GroupList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='group__list'>
               <span>Список групп задач: </span>
               <ul>
                   {this.props.groups.map(group => (
                       <li key={group.id}>{group.text}</li>
                   ))}
               </ul>
            </div>
        );
    }
}
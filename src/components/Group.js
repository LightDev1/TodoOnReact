import React, {Component} from 'react';
import axios from 'axios';
import classNames from 'classnames';

import Delete from '../img/delete.svg';

export default class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };

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
                <li
                    onClick={() => {
                        this.props.onClickGroup(this.props.item);;
                    }}
                    className={classNames({
                        active: this.props.activeItem && this.props.activeItem.id === this.props.item.id
                    })}
                >
                    <span>
                        {this.props.textContent}
                        {this.props.item.tasks && ` (${this.props.item.tasks.length})`}
                    </span>
                    <img className='delete__btn' src={Delete} alt='delete' onClick={() => {
                        this.handleDelClick(this.props.id)
                        }}
                    />
                </li>
            );
    }
}
import React, {Component} from 'react';
import Delete from '../img/delete.svg';

export default class Task extends Component {
    constructor(props) {
        super(props);

        this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
    }

    onChangeCheckBox(e) {
        this.props.onComplete(this.props.groups.id, this.props.id, e.target.checked);
    }

    render() {
        return (
           <div className="task">
                <div className="checkbox">
                    <input
                        onChange={this.onChangeCheckBox}
                        id={`task-${this.props.id}`}
                        type="checkbox"
                        checked={this.props.completed}
                    />
                    <label htmlFor={`task-${this.props.id}`}>
                        <svg 
                            width="11" 
                            height="8"
                            viewBox="0 0 11 8" 
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                stroke="#000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </label>
                </div>
                <li>
                    {this.props.text}
                    <img className='delete__btn' src={Delete} alt='delete' onClick={
                        () => {this.props.onRemove(this.props.groups.id, this.props.id)}
                    }/>
                </li>   
           </div>
        );
    }
}
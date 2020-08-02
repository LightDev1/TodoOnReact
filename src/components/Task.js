import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Delete from '../img/delete.svg';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.props.onDelete();
    }
    
   

    render() {
        // if (this.state.isClicked) {
            return (
                <li onClick={this.handleClick}>
                    {this.props.textContent}
                    <img className='delete__btn' src={Delete} alt='delete' onClick={this.handleClick}/>
                </li>   
            );
        // }

        // return (
        //     <li onClick={this.handleClick}>{this.props.textContent}</li>
        // );
    }
}
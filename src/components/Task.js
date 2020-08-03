import React, {Component} from 'react';
import Delete from '../img/delete.svg';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };

        this.handleDelClick = this.handleDelClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    handleDelClick() {
        this.props.onDelete();
    }

    handleClick() {
        this.setState({
            isClicked: !this.state.isClicked,
        });
    }
    
   

    render() {
        if (this.state.isClicked) {
            return (
                <li onClick={this.handleClick}>
                    {this.props.textContent}
                    <img className='delete__btn' src={Delete} alt='delete' onClick={this.handleDelClick}/>
                </li>   
            );
        }

        return (
            <li onClick={this.handleClick}>{this.props.textContent}</li>
        );
    }
}
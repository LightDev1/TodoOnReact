import React, {Component} from 'react';
import Delete from '../img/delete.svg';

export default class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.setState({
            isClicked: !this.state.isClicked,
        })
    }

    render() {
        if (this.state.isClicked) {
            return (
                <li onClick={this.handleClick}>
                    {this.props.textContent}
                    <img className='delete__btn' src={Delete} alt='delete' onClick={() => {
                        this.props.onDelClick(this.props.id)
                        }}
                    />
                 </li>
            );
        } else {
            return (
                <li onDoubleClick={() => this.handleDoubleClick()} onClick={this.handleClick}>{this.props.textContent}</li>
            );
        }
       
    }
}
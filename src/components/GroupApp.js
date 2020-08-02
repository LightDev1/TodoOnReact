import React, {Component} from 'react';
import CreateGroup from './CreateGroup';
import GroupList from './GroupList';

export default class GroupApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: localStorage.getItem("groups") ? JSON.parse(localStorage.getItem("groups")) : [],
            text: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(text) {
        this.setState({
            text: text
        });
    }

    handleClick() {
        if (this.state.text.length === 0) return;

        const newGroup = {
            text: this.state.text,
            id: new Date(),
        }

        this.setState({
            groups: this.state.groups.concat(newGroup),
            text: ''
        });
    }

    componentDidUpdate() {
        localStorage.setItem("groups", JSON.stringify(this.state.groups));
    }

    render() {
        return (
            <div className='group__app'>
                <CreateGroup onInputChange={this.handleChange}
                    onButtonClick={this.handleClick}
                    valueInput={this.state.text} 
                  />
                <GroupList groups={this.state.groups} />
            </div>
        );
    }
}
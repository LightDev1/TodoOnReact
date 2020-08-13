import React, {Component} from 'react';
import CreateGroup from './CreateGroup';
import Group from './Group';

export default class GroupApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: localStorage.getItem("groups") ? JSON.parse(localStorage.getItem("groups")) : [],
            text: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelClick = this.handleDelClick.bind(this);
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

    handleDelClick(id) {
        this.setState(prevState => ({
            groups: prevState.groups.filter(el => el.id !== id),
        }));
    }

    componentDidUpdate() {
        localStorage.setItem("groups", JSON.stringify(this.state.groups));
    }

    render() {
        return (
            <div className='group__app'>
                <CreateGroup text={this.state.text} onCGroupSubmit={this.props.onGroupAppSubmit} onInputChange={this.handleChange}
                    onButtonClick={this.handleClick}
                    valueInput={this.state.text} 
                  />
                <div className='group__list'>
                    <span>Список групп задач: </span>
                    <ul>
                        {
                            this.state.groups.map(group => (
                                <Group  key={group.id}
                                 textContent={group.text}
                                 id={group.id}
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
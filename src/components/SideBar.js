import React from 'react';
import GroupApp from './GroupApp';


export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='sidebar__container'>
                <GroupApp />
                {/* <Options /> */}
            </div>
        );
    }
}
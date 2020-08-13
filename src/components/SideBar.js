import React from 'react';
import GroupApp from './GroupApp';


export default class SideBar extends React.Component {
    render() {
        return (
            <div className='sidebar__container'>
                <GroupApp />
            </div>
        );
    }
}
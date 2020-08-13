import React from 'react';
import SideBar from './components/SideBar';
import MainContent from './components/MainContant';

export default class App extends React.Component {
    render() {
        return (
           <div className='main__container'>
                <SideBar />
                <MainContent />
           </div>
        );
    }
}
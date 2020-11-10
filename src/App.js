import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Route, useHistory, useLocation } from 'react-router-dom';

import CreateGroup from './components/CreateGroup';
import Group from './components/Group';
import Tasks from './components/Tasks';

export default function App() {
    const [groups, setGroups] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_embed=tasks').then(({data}) => {
            setGroups(data);
        });
    }, []);
 
    const onAddList = (obj) => {
        const newList = [...groups, obj];
        setGroups(newList);
    };

    const onRemoveList = (id) => {
        const newList = groups.filter(list => list.id !== id);
        setGroups(newList);
    };

    const onAddTask = (listId, taskObj) => {
        const newList = groups.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        });
        setGroups(newList);
    };

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = groups.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.filter(task => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                });
            }
            return list;
        });

        setGroups(newList);

        axios.patch('http://localhost:3001/tasks/' + taskId, {
            completed
        })
        .catch(() => {
            alert('Не удалось обновить задачу');
        });
    };

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Вы точно хотите удалить эту задачу?')) {
            const newList = groups.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId);
                }
                return item;
            });

            setGroups(newList);

            axios.delete('http://localhost:3001/tasks/' + taskId)
                .catch(() => {
                    alert('Ошибка при удалении задачи');
                });
        }
    };

    const onClickGroup = (list) => {
        history.push(`/lists/${list.id}`);
    };

    useEffect(() => {
        const listId = location.pathname.split('lists/')[1];

        if (groups) {
            const group = groups.find(list => list.id === Number(listId));
            setActiveItem(group);
        }
    }, [groups, location.pathname]);

    return (
           <div className='main__container'>
            <div className='sidebar__container'>
                {groups ? (
                    <div className='group__app'>
                        <CreateGroup
                            onAddList={onAddList}
                        />
                        <div className='group__list'>
                            <span>Список групп задач: </span>
                            <ul>
                                <Group
                                    onClickGroup={group => {
                                        history.push('/');
                                    }}
                                    idForButton='all__groups'
                                    textContent='Все задачи'
                                    item={
                                        {
                                            active: location.pathname === '/',
                                        }
                                    }
                                    withoutRemove
                                    withIcon
                                />
                                {groups &&
                                    groups.map(item => {
                                        if (item) {
                                            return (
                                                <Group  
                                                    key={item.id}
                                                    textContent={item.name}
                                                    id={item.id}
                                                    item={item}
                                                    onClickGroup={onClickGroup}
                                                    activeItem={activeItem}
                                                    onRemove={onRemoveList}
                                                />
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                ) : (
                    'Загрузка...'
                )}
            </div>
            <div className='main__container-tasks'>
               <Route exact path='/'>
                    {groups &&
                        groups.map(list => (
                            <Tasks
                                key={list.id}
                                onAdd={onAddTask}
                                groups={list}
                                onRemove={onRemoveTask}
                                onComplete={onCompleteTask}
                                withoutAdd
                            />
                        ))
                    }
               </Route>
               <Route path='/lists/:id'>
                    {groups &&
                        activeItem && 
                            <Tasks
                                onAdd={onAddTask}
                                groups={activeItem}
                                onRemove={onRemoveTask}
                                onComplete={onCompleteTask}
                            />
                    }
               </Route>
            </div>
           </div>
        );
    
}
import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    const task1=[
        {id:1, title:'HTML&CSS1',isDone:true},
        {id:2, title:'JS1',isDone:true},
        {id:3, title:'React1',isDone:true}
    ]

    const task2=[
        {id:1, title:'HTML&CSS2',isDone:true},
        {id:2, title:'JS2',isDone:true},
        {id:3, title:'React2',isDone:true}
    ]

    return (
        <div className="App">
            <Todolist
            title1={"Todolist1"}
            task={task1}
            />
            <Todolist
                title1={"Todolist2"}
                task={task2}
            />
        </div>
    );
}

export default App;

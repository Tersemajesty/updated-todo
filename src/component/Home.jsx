import React from 'react'
import Todo from "../component/Todo"
import "./Home.css"
import NewTaskModal from './new-task-modal'


 const Home = () => {
    return (
        <div className='home-container'>
           <Todo /> 
           <NewTaskModal />
        </div>
    )
}
export default Home
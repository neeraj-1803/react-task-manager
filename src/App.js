import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  const [tasks, setTasks] = useState([])

  //to delete a task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {method: 'DELETE'});
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  //to toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTaskWithId(id);
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder};
    const re = await fetch(`http://localhost:8000/tasks/${id}`, {method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify(updateTask)});
    const data = await re.json();
    setTasks(tasks.map((task)=> task.id === id ? {...task, reminder : data.reminder} : task))
  }

  //to add a task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000)+1;
    // console.log(id);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    const setDataOnServer = await fetch('http://localhost:8000/tasks', {method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(task)});
    const data = await setDataOnServer.json();
    setTasks([...tasks, data]);
  }

  //toggle the view on click of Add button
  const [showAddTask, setShowAddTask] = useState(false);

  //to fetch from db.json(server)
  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  //fetch from server
  const fetchTasks = async() => {
    const res = await fetch("http://localhost:8000/tasks");
    const data = await res.json();
    return data;
  }

  //fetch task with specific id
  const fetchTaskWithId = async(id) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`);
    const data = await res.json();
    return data;
  }



  return (
    <Router>
    <div className="container">
      <Header onAdd={(e)=> setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {/* way to write a ternanary operator using &&. */}
      {/* {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to display today. Well Done!'} */}
      <Route path='/' exact render={(props)=>(
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to display today. Well Done!'}
        </>
      )} />
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}

export default App;

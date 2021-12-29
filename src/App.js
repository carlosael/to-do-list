import { useState } from 'react';
import close from './assets/delete.svg';

function Task(props) {
  return (
    <div className="itens">
      <li >
        <div className="text">
          <span
            onClick={() => props.handleComplete(props.id)}
            style={{ textDecoration: props.completed ? 'line-through' : '' }}
          >
            {props.children}
          </span>
        </div>
      </li>
      <div className="close-btn">
        <img src={close} onClick={() => props.handleDelete(props.id)} alt="Close Button" />
      </div>
    </div>
  )
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);

  function handleKeyDown(event) {
    if (event.key !== "Enter") return;
    if (event.target.value === '') return;
    const newTasks = [...tasks, { id: Math.random(), text: event.target.value, completed: false }]

    setTasks(newTasks);
    setTaskCount(tasks.length + 1);

    event.target.value = '';
  }

  function handleDelete(id) {
    const undeletedTask = tasks.filter(function (task) {
      return task.id !== id;
    })

    setTasks(undeletedTask);
    setTaskCount(tasks.length - 1)
  }

  function handleComplete(id) {
    const completedTasks = [...tasks];

    const completedTask = completedTasks.find(function (task) {
      return task.id === id
    })

    completedTask.completed = !completedTask.completed;

    setTasks(completedTasks)
    setTaskCount(completedTask.completed ? taskCount - 1 : taskCount + 1)
  }

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") {
      return task.completed === true
    } else if (filter === "active") {
      return task.completed === false
    }
    return true
  })

  function handleAllTasks() {
    setFilter("all")
  }

  function handleActiveTasks() {
    setFilter("active")
  }

  function handleCompletedTasks() {
    setFilter("completed")
  }

  function clearCompletedTasks() {
    const completedTasks = tasks.filter(task => !task.completed);

    setTasks(completedTasks)
    setTaskCount(completedTasks.length)
  }

  return (
    <>
      <div className="App">
        <div className="card">
          <h1>TAREFAS</h1>
          <input type="text" placeholder="Criar uma nova tarefa" onKeyDown={handleKeyDown} ></input>
        </div>
      </div>
      <div className="list">
        <ul>
          {filteredTasks.map(function (task) {
            return (
              <Task
                key={task.id}
                id={task.id}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
                completed={task.completed}
              >
                {task.text}
              </Task>
            )
          })}
        </ul>
        <div className="tasks-btns">
          <span>{taskCount} itens restantes</span>
          <span onClick={handleAllTasks} style={{ color: filter === 'all' ? '#3A7CFD' : '#9495A5' }}>Todas</span>
          <span onClick={handleActiveTasks} style={{ color: filter === 'active' ? '#3A7CFD' : '#9495A5' }}>Ativas</span>
          <span onClick={handleCompletedTasks} style={{ color: filter === 'completed' ? '#3A7CFD' : '#9495A5' }}>Completada</span>
          <span onClick={clearCompletedTasks}>Limpar Completadas</span>
        </div>
      </div>
    </>
  );
}


export default App;

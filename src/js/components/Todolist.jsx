import React, { useState, useEffect, } from "react";
import "../../styles/index.css"
//creamos el componente todo list
export const TodoList = () => {
  const [tasks, setTasks] = useState([]) //funcion para almacenar las tareas tasks almacena imformacion y setTask utilizamos para actualizar la imformacion de las tareas
  const [newTask, setNewTasks] = useState("") //funcion para almacenar la nueva tarea que se va a añadir a la lista de tareas "Tasks"


  const loadTasks = async () => { //CRUD create (POST) read (GET) update (PUT) delete (DELETE)
    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/Adriana");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTasks(data) //Guardamos la información que nos llega desde la API en Tasks
      } else {
        setTasks([]) // Si no es un array, inicializamos con array vacío
      }
    } catch (error) {
      console.log(error)
    }
  }
  const createTasks = async (taskLabel) => {
    try {
      const response = await fetch("https://playground.4geeks.com/todo/todos/Adriana", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: taskLabel, is_done: false })
      })
      const newTask = await response.json();
      setTasks([...tasks, newTask]) //agregamos la tarea que hemos creado con el metodo post a nuestra lista de tareas de usestate
      setNewTasks("")//limpiamos el input donde estamos escribiendo nuestra nuevas tareas
    } catch (error) {
      console.log(error)

    }
  }
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
        method: "DELETE"
      });
      setTasks(tasks.filter(task => task.id !== taskId)) // actualizamos las tareas guardadas en nuestro usestate utilizando el metod de array .filter
      //.filter va a crear un nuevo array de task con toda las task que tenga la id extrictamente distinta a la que pasamos como parametro en la funcion de async

    } catch (error) {
      console.log(error)
    }
  }
  // falta funcion para eliminar todas las tareas 
  //falta crear el input para poder agregar nuevas tareas y hacer el mapeado de las tareas para mostrarlas 
  const deleteAllTasks = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/todo/todos/Adriana", { method: 'DELETE' });
      setTasks([]); // Limpiamos la lista de tareas
    } catch (error) {
      console.log(error); // Guardamos el mensaje de error en el estado
    }
  };
  useEffect(() => {
    loadTasks()
  }, [])
  console.log(tasks)
  return (
    <div className="todo-list">
      <h1>escribe las tareas</h1>
      <input type="text" placeholder="escribec tu tarea aqui" value={newTask} onChange={(e) => setNewTasks(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && newTask.trim() !== '' && createTasks(newTask.trim())} />
      <button className="delete-all-button" onClick={deleteAllTasks}>pulsa aqui para eliminarlo</button>


      <ul>
        {
          tasks.map(task => (
            <li key={task.id}>{task.label}</li>
          ))
        }
      </ul>
    </div>
  )


}

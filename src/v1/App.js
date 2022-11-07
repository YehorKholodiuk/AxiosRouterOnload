import axios from 'axios';
import React, { useState } from 'react';

// server https://taskapp-serv.herokuapp.com/

function V1App() {

  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({});

  const onLoadAll = () => {
    axios({
      url: 'https://taskapp-serv.herokuapp.com/v1/task/search',
      method: 'POST',
    })
        .then((response) => {
              setTasks(response.data);
            }
        ).catch((err) => {
          console.log(err);
        }
    );

  };

  // create task
  const onCreate = (e) => {
    e.preventDefault();
    axios({
      url: 'https://taskapp-serv.herokuapp.com/v1/task',
      method: 'POST',
      data: formData,
    })
        .then(() => {
              onLoadAll();
            }
        ).catch((err) => {
          console.log(err);
        }
    );
  };

  const onChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const onDelete = (id) => {
    axios({
      url: `https://taskapp-serv.herokuapp.com/v1/task/${id}`,
      method: 'DELETE',
    })
        .then(() => {
              onLoadAll();
            }
        ).catch((err) => {
          console.log(err);
        }
    );
  };

  return (
      <div>


        <h1>V1</h1>
        <button onClick={onLoadAll}>Load all tasks</button>

        <ul>
          {tasks.map((task) => (
              <li key={task.id}>
                ({task.id}) <strong>{task.title}</strong>{' '}<span>{task.description}</span>

                <button onClick={() => onDelete(task.id)}>Delete</button>
              </li>
          ))}
        </ul>


        <hr />
        <h4>Create task</h4>
        <form onChange={onChangeForm} onSubmit={onCreate}>
          <input type="text" placeholder="Title" name="title" />
          <input type="text" placeholder="Description" name="description" />
          <button type="submit">Create</button>
        </form>


      </div>
  );
}

export default V1App;

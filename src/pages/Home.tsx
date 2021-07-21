import React, { useState } from 'react';
import {Alert} from 'react-native';
import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
  edit: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [countTasks, setCountTasks] = useState(0);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task if it's not empty

    let exists = false;

    if(newTaskTitle === '') {
      Alert.alert('Digite a sua tarefa para adicioná-la');
      return;
    }

    tasks.map(item => {
      if(item.title === newTaskTitle && item.done === false) {
        Alert.alert('Já existe uma tarefa com essa descrição');
        exists = true;
        return;
      }            
    });

    if (!exists) {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
        edit: false,
      }
  
      setTasks(oldState => [...oldState, data]);
  
      setCountTasks(oldState => oldState + 1);
    }

  }

  function handleMarkTaskAsDone(id: number) {
    //TODO - mark task as done if exists
    tasks.map(item => {
      if(item.id === id) {
        item.done = item.done === true ? false : true;

        setCountTasks(oldState => item.done === true ? oldState - 1 : oldState + 1);
      }            
    });

    let newState = tasks;

    setTasks([...newState]);

  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover tarefa',
      'Deseja realmente remover essa tarefa?',
      [
        {
          text: 'Não',
          onPress: () => {
              return;
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            //TODO - remove task from state
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ));

            setCountTasks(oldState => oldState !== 0 ? oldState - 1 : oldState);
          }
        },
      ],
    )    
  }

  function handleEditTask(id: number) {
    tasks.map(item => {
      if (item.id === id) {
        item.edit = item.edit === true ? false : true;
      }
    }); 

    let newState = tasks;

    setTasks([...newState]);

  }

  function handleEditTaskApply(id: number, editTask: string) {
    tasks.map(item => {
      if (item.id === id) {
        item.title = editTask;
        item.edit = item.edit === true ? false : true;
      }
    });

    let newState = tasks;

    setTasks([...newState]);

    editTask = '';
  }

  return (
    <>
      <Header count={countTasks}/>

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
        onPressEdit={handleEditTask}
        onPressEditApply={handleEditTaskApply}
      />
    </>
  )
}
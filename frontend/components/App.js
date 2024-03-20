import React from 'react'
import Form from './Form'
import Todo from './Todo'
import TodoList  from './TodoList'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'


export default class App extends React.Component {
  constructor(props){
  super(props);
  this.state = {

    todos:[],
    inputValue:'',
  }
 }

 handleInputChange= (event) =>{
  this.setState({inputValue:event.target.value})
 }

 handleSubmit = (e) =>{
  e.preventDefault();

  if(this.state.inputValue.trim() !== ''){

    const newTodo = {
      id: Date.now(),
      task: this.state.inputValue,
      completed: false,
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      inputValue: '',
    }))
  }
 }

 toggleTodo =(id) =>{
if(Array.isArray(this.state.todos)){
  this.setState((prevState) => ({
    todos:prevState.todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)
  }))
 }
 };
      clearCompleted = () => {
        this.setState((prevState) => ({
          todos:prevState.todos.filter((todo) => !todo.completed)
        }))
      }
      
      componentDidMount() {
        axios.get(URL).then(response => {
          if(Array.isArray(response.data)){
          this.setState({todos:response.data});
        } else {
          console.error('invalid response data format:', response.data);
        }
      })
        .catch(error => {
          console.log('Error fetching todos', error)
        })

      }
  render() {
    return (
      <div>
       <h2>Todos:</h2>
      <TodoList todos={this.state.todos} toggleTodo= {this.toggleTodo} />
      <form onSubmit={this.handleSubmit}>

      <input placeholder='type todo'
      value={this.state.inputValue}
      onChange={this.handleInputChange} />

      <button type= "submit">Submit</button>
      </form>
      <button onClick={this.clearCompleted}>clear Completed</button>
      </div>
    )
  }
}

 



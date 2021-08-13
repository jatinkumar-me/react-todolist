import React, { Component } from 'react';
import './App.css';
import Todos from './Todos'
import ItemInput from './ItemInput'
import { Todoitemslist } from './Todoitemslist'
import Operations from './Operations'

class App extends Component {
  constructor() {
    super();

    this.state = {
      displayTodos: [],
      searchField: '',
      nameInput: '',
      dateInput: '',
      timeInput: '',
      showingCompleted: true,
      sortMethod: 'dateAdded',
    }
  }


  addItem = () => {
    if (this.state.nameInput !== "") {
      Todoitemslist.push({
        id: Math.random() * 1000,
        name: this.state.nameInput,
        date: this.state.dateInput,
        time: this.state.timeInput,
        countDownDate: new Date(`${this.state.dateInput === "" ? "3000-12-29" : this.state.dateInput } ${this.state.timeInput === "" ? "00:00" : this.state.timeInput}`).getTime(),
        dateAdded: new Date(),
        completed: false
      });
      this.updateDisplay()

      // Resetting input fields
      this.setState({
        nameInput: '',
        dateInput: '',
        timeInput: '',
        searchField: '',
      }, this.sortItems(this.sortMethodSelector))   //Sorting items if a new item is added
    } else alert('Please enter valid input!')
  }

  updateDisplay = () => {
    this.setState({ displayTodos: Todoitemslist })
  }

  setName = (event) => {
    this.setState({ nameInput: event.target.value })
  }
  setDate = (event) => {
    this.setState({ dateInput: event.target.value })
  }
  setTime = (event) => {
    this.setState({ timeInput: event.target.value })
  }

  deleteItem = (event) => {
    let elementWithId = (listItem) => listItem.id === parseFloat(event.target.id)
    Todoitemslist.splice(Todoitemslist.findIndex(elementWithId), 1)
    this.updateDisplay()
  }

  toggleDone = (event) => {
    Todoitemslist.map(
      obj => (obj.id === parseFloat(event.target.id) ? Object.assign(obj, { completed: !obj.completed }) : obj)
    )
    this.updateDisplay()
  }

  onSearchChange = (event) => {
    // Using Closures =================================================================================
    // This.setState is an async function
    this.setState({ searchField: event.target.value },
      this.filterTodos(todo => todo.name.toLowerCase().includes(this.state.searchField.toLowerCase())
      ))
  }

  sortEventHandler = (event) => {
    this.setState({ sortMethod: event.target.value }, this.sortItems(this.sortMethodSelector))
  }

  sortMethodSelector = (a, b) => {
    switch (this.state.sortMethod) {
      case "name": return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
      case "dateAdded": return (a.dateAdded.getTime() > b.dateAdded.getTime()) ? 1 : ((b.dateAdded.getTime() > a.dateAdded.getTime()) ? -1 : 0);
      case "timeRemaining": return (a.countDownDate > b.countDownDate) ? 1 : ((b.countDownDate > a.countDownDate) ? -1 : 0);
      default: return "";
    }
    
  }

  sortItems = (compareMethod) => {
    return function () {
      this.setState({
        displayTodos: Todoitemslist.sort(compareMethod)
      })
    }

  }


  filterTodos = (filterMethod) => {
    return function () {
      this.setState({
        displayTodos: Todoitemslist.filter(filterMethod)
      })
    }
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1>Todos List</h1>
        </header>

        <div className="sticky">
          <ItemInput
            onSubmit={this.addItem}
            nameChange={this.setName}
            dateChange={this.setDate}
            timeChange={this.setTime}
            name={this.state.nameInput}
            date={this.state.dateInput}
            time={this.state.timeInput}
          />
        </div>

        <Operations
          onSearchChange={this.onSearchChange}
          searchField={this.state.searchField}
          sortMethod={this.state.sortMethod}
          sort={this.sortEventHandler}
          hideDone={this.hideDone}
        />

        <Todos
          totalTodoItems={Todoitemslist}
          todoItems={this.state.displayTodos}
          deleteItem={this.deleteItem}
          toggleDone={this.toggleDone}
          searchField={this.state.searchField} />
      </div>
    )
  }
}

export default App;



    // const compareMethod = (a, b) => {
    //   if (isNaN(a.countDownDate)) {
    //     a.countDownDate = Infinity
    //   }
    //   switch (this.state.sortMethod) {
    //     case "name": return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    //     case "dateAdded": return (a.dateAdded.getTime() > b.dateAdded.getTime()) ? 1 : ((b.dateAdded.getTime() > a.dateAdded.getTime()) ? -1 : 0);
    //     case "timeRemaining": return (a.countDownDate > b.countDownDate) ? 1 : ((b.countDownDate > a.countDownDate) ? -1 : 0);
    //     default: return "";
    //   }
    // }

  // hideDone = () => {
  //   console.log("hideDone clicked!")
  //   this.setState({showingCompleted : !this.state.showingCompleted}, this.filterTodos(todo => !todo.completed))

  // }
  // console.log(todo.name.toLowerCase())
  // console.log(this.state.searchField.toLowerCase())
  // console.log(todo.name.toLowerCase().includes(this.state.searchField.toLowerCase()))



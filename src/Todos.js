import React from 'react'
import Todoitem from './Todoitem'
import './Todos.scss'


const Todos = ({totalTodoItems, todoItems, deleteItem, toggleDone, searchField }) => {
    return (

        <div>
            {searchField === '' ?

                <h4>You have {totalTodoItems.length} item{totalTodoItems.length === 1 ? "" : "s"} to do. </h4> :
                <h4>{ todoItems.length === 0 ? `No item named "${searchField}" exists. ` : `Showing ${todoItems.length} results for "${searchField}"`}</h4>

            }

            <div className="itemList">
                {
                    todoItems.map((item, pos) => {
                        return (
                            <Todoitem
                                name={item.name}
                                date={item.date}
                                time={item.time}
                                id={item.id}
                                completed={item.completed}
                                key={pos}
                                deleteItem={deleteItem}
                                toggleDone={toggleDone}
                                countDownDate={item.countDownDate}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Todos

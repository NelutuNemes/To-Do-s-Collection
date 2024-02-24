import React from "react";
import TodoItem from "./TodoItem";


function ListItem(props) {
  return (
    <div>
      <ul>
        {props.todoItems.map((todoItem, todoIndex) => {
          return (
            <TodoItem
              key={todoIndex}
              id={todoIndex}
              deleteItem={props.deleteItem}
              todoItem={todoItem}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ListItem;

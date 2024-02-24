import { useState } from "react";
import "./App.css";
import ListItem from "./componets/ListItems";
import Input from "./componets/Input";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  function addItem(userInput) {
    setTodoItems((prevValue) => {
      return [...prevValue, userInput];
    });
  }
  function deleteItem(id) {
    setTodoItems((prevValue) => {
      return prevValue.filter((prevValueElement, prevValueIndex) => {
        // console.log(prevValueElement);
        return prevValueIndex !== id;
      });
    });
  }

  return (
    <div className='container'>
      <div className='heading'>
        <h1>To Do List</h1>
      </div>
      <Input addItem={addItem} />
      <div className='list-item'>
        <ListItem deleteItem={deleteItem} todoItems={todoItems} />
      </div>
    </div>
  );
}

export default App;

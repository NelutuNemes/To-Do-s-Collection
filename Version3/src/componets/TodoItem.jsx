import React from "react";
import { useState } from "react";

function TodoItem(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      style={{
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={ () => setIsHovered( false ) }
      
      onClick={() => {
        props.deleteItem(props.id);
      }}>
      {props.todoItem}

      {isHovered && <p className='tooltip'>Click to delete this task !</p>}
    </li>
  );
}

export default TodoItem;

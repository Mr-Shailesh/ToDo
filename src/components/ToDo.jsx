import React, { useState, useEffect } from "react";
import todo from "../Images/Todo.png";

const ToDo = () => {
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState();

  const itemsLength = items ? items.length : 0;

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(items));
  }, [items]);

  const addHandler = () => {
    if (!data) {
      alert("Please enter something 🤔");
    } else if (data && !toggle) {
      setItems(
        items.map((item) => {
          if (item.id === edit) {
            return { ...item, name: data };
          }
          return item;
        })
      );
      setToggle(true);
      setData("");
      setEdit(null);
    } else {
      const allData = { id: new Date().getTime().toString(), name: data };
      setItems([...items, allData]);
      setData("");
    }
  };

  const removeHandler = (index) => {
    const updatedItems = items.filter((item) => {
      return index !== item.id;
    });
    setItems(updatedItems);
  };

  const removeAllHandler = () => {
    setItems([]);
  };

  const editHandler = (id) => {
    let newEditItem = items.find((item) => {
      return item.id === id;
    });
    console.log(newEditItem);

    setToggle(false);
    setData(newEditItem.name);
    setEdit(id);
  };

  const inputEvent = (e) => {
    setData(e.target.value);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todo logo" />
            <figcaption>Add Your List Here 👍 </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items ✍️..."
              onChange={inputEvent}
              value={data}
            />
            {toggle ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Items"
                onClick={addHandler}
              />
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update Items"
                onClick={addHandler}
              />
            )}
          </div>
          <div className="showItems">
            {itemsLength &&
              items.map((item) => {
                return (
                  <div className="eachItem" key={item.id}>
                    <h3>{item.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                        title="Edit Items"
                        onClick={() => editHandler(item.id)}
                      />
                      <i
                        className="far fa-trash-alt add-btn"
                        title="Delete Items"
                        onClick={() => removeHandler(item.id)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllHandler}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;

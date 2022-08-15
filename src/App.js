import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import Products from "./components/Products/Products";

const App = () =>{

  const [cartItems, setCartItems] = useState([]);
  const [eventQueue, setEventQueue] = useState({
    id : "",
    type: ""
  })

  const handleonAddItem = item =>{
        let items = [...cartItems];
        let index = items.findIndex(i => i.id === item.id)
        if(index > -1){
          items[index] = item;
        }
        else{
          items.push(item);
        }
        setCartItems([...items]);
        //setCartItems(countItems + 1);
  }
  const handleRemoveItem = item =>{   
    let items = [...cartItems];
    let index = items.findIndex(i => i.id === item.id)
    if(items[index].quantity === 0){
      items.splice(index, 1);
    }
    else{
      items[index] = item;
    }
    setCartItems([...items]);
    //setCartItems(countItems - 1);
  }

  //type=== -1 decrease the quantity
  //type=== 1 increse the quantity
  const handleQueue = (id, type) =>{
    console.log({id, type});
    setEventQueue({
      id,
      type
    })
  }

  return( 
    <div>
        <Header count={cartItems.length} items={cartItems} onHandleEvent={handleQueue}/>
        <Subheader/>
        <Products onAddItems={handleonAddItem} onRemoveItems={handleRemoveItem} eventList={eventQueue}/>
    </div>
  )
}

// function App() {
//   return (
//     <h1>Hello Nitin!</h1>
//   );
// }

export default App;

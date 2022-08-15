import axios from "axios"
import { useState, useEffect } from "react"
import Loader from "../UI/Loader"
import ListItem from "./ListItems/ListItem"

const Products = ({ onAddItems, onRemoveItems, eventList }) => {
    const [items, setitems] = useState([])
    const [loader, setLoader] = useState(true);
    //const [presentItems, setPresentItems] = useState([]);

    useEffect(()=>{
            // fetch(`https://geeks-994b3-default-rtdb.firebaseio.com/items.json`)
            // .then(response => response.json())
            // .then(data => {
            //     console.log(data)
            // })
            // .catch(error => {
            //     console.log(error)
            // })
            async function fetchitems(){
                try {
                    const response = await axios.get('https://geeks-994b3-default-rtdb.firebaseio.com/items.json')
                    const data = response.data;
                    const transformedData = data.map((item, index)=>{
                        return {
                            ...item,
                            quantity: 0,
                            id: index
                        }
                    })
                    setitems(transformedData);
                    //console.log(transformedData);
                } catch (error) {
                    console.log("error", error);
                    alert("Error occured");
                }
                finally{
                    setLoader(false);
                }   
            }
            fetchitems();

    },[])

    useEffect(()=>{
        if(eventList.id >-1){
            if(eventList.type === 1){
                handleAddItem(eventList.id)
            }
            else if(eventList.type === -1){
                handleRemoveItem(eventList.id)
            }
        }
    }, [eventList])

    const handleAddItem = id =>{
        // if(presentItems.indexOf(id) > -1){
        //     return;
        // }
        // setPresentItems([...presentItems, id])
        let data = [...items];
        let index = data.findIndex(i => i.id === id);
        data[index].quantity +=1
        setitems([...items]);
        onAddItems(data[index]);
    }

    const handleRemoveItem = id =>{
        // let index = presentItems.indexOf(id);
        // if(index > -1){
        //     let items = [...presentItems];
        //     items.splice(index, 1);
        //     setPresentItems([...items]);
        //     onRemoveItems();
        // }
        let data = [...items];
        let index = data.findIndex(i => i.id === id);
        if(data[index].quantity !==0){
            data[index].quantity -=1;
            setitems([...items]);
            onRemoveItems(data[index]);
        }

    }

    return (
        <>
        <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
                {/* <ListItem data={items[0]}></ListItem>
                <ListItem data={items[1]}></ListItem> */}
                {
                  items.map(item =>{
                    return (<ListItem onAdd={handleAddItem} onRemove={handleRemoveItem} key={item.id} data={item}/>)
                  })
                }
            </div>
        </div>
        {loader && <Loader/>}
        </>
    )
}

export default Products
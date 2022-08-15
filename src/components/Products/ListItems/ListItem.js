import { Fragment, useState } from "react";
import AddtoCartIcon from "../../../assets/icons/add_cart.svg";
import Modal from "../../UI/Modal";

// const data ={
//     discountedPrice : 340,
//     price: 450,
//     title: "Title of the item",
//     thumbnail: "placeholder.png"
// }

const ListItem = ({ data, onAdd, onRemove }) =>{
    
    //const [counter, setCounter] = useState(0);
    const [showModal, setshowModal] = useState(false);

    const increaseCounterbyone = (event) =>{
        event.stopPropagation();
        onAdd(data.id);
        //setCounter(counter+1);
    }
    const decreaseCounterbyone = (event) =>{
        event.stopPropagation();
        onRemove(data.id);
        // if(counter === 0){
        //     return;
        // }
        // if(counter === 1){
        //     onRemove(data.id);
        // }
        //setCounter(counter-1);
    }

    const handleModal = () =>{
        setshowModal(previousState => !previousState);
    }

      return(
        <Fragment>
            <div onClick={handleModal} className={"item-card"}>
                <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                <div className={"item-card__information"}>
                    <div className={"pricing"}>
                        <span>₹{data.discountedPrice}</span>
                        <small>
                            <strike>{data.price}</strike>
                        </small>
                    </div>
                    <div className={"title"}>
                        <h3>{data.title}</h3>
                    </div>
                </div>
                {
                    data.quantity < 1 ?
                    <button className={"cart-add"} onClick={increaseCounterbyone}>
                        <span>Add to cart</span>
                        <img src={AddtoCartIcon} alt="cart icon"/>
                    </button> 
                    :
                    <div className={"cart-addon"}>
                        <button onClick={decreaseCounterbyone}><span>-</span></button>
                        <span>{data.quantity}</span>
                        <button onClick={increaseCounterbyone}><span>+</span></button>
                    </div>
                }
            </div>
            {showModal && 
                <Modal onClose={handleModal}>
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                                <span>₹{data.discountedPrice}</span>
                                <small>
                                    <strike>{data.price}</strike>
                                </small>
                            </div>
                            <p>{data.description}</p>
                            {
                                data.quantity < 1 ?
                                <button className={"cart-add card_add__modal"} onClick={increaseCounterbyone}>
                                    <span>Add to cart</span>
                                    <img src={AddtoCartIcon} alt="cart icon"/>
                                </button> 
                                :
                                <div className={"cart-addon card_addon__modal"}>
                                    <button onClick={decreaseCounterbyone}><span>-</span></button>
                                    <span>{data.quantity}</span>
                                    <button onClick={increaseCounterbyone}><span>+</span></button>
                                </div>
                            }
                        </div>                        
                    </div>
                </Modal>
            }
        </Fragment>
      )
}

export default ListItem;
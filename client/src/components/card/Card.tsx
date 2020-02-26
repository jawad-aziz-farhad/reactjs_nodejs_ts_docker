import React from "react";
import "./Card.css";
import {connect} from 'react-redux';
import {updateItem, getItemsList} from '../../actions'
 
function Card(props) {

  const [titleFocus, setTitleFocus]= React.useState(false);
  const [priceFocus, setPriceFocus]= React.useState(false);
  const [item, setItem]= React.useState(props.item)
  let [quantity, setQuantity]= React.useState(0)

  function onChanged(event){
    setItem({
      ...item,
      [event.target.name]:event.target.value
    })
  }
  function updateItemDetail() {
    setTitleFocus(false);
    setPriceFocus(false);
    props.updateItem(item)
  }
  return (
    <div className="card">
      <div className="card-image">
        <img alt="item-logo" src={item.productImage} />
      </div>
      <div className="card-title">
        
        {titleFocus===true?<input name="productName" onChange={(e)=>{onChanged(e)}} onBlur={()=>console.log('out')} type="text" value={item.productName}/>: <h3 onClick={()=>setTitleFocus(true)}>{item.productName}</h3>}
        <span>12 Unit . 330oz bottle</span>
      </div>
      <div className="card-content">
        <p className="product-price">{props.item.productCurrency}<span className="amount">{priceFocus===true?<input name="productPrice" onChange={(e)=>{onChanged(e)}} onBlur={()=>console.log('out')} type="number" value={item.productPrice}/>: <span onClick={()=>setPriceFocus(true)}>{item.productPrice<0?0:item.productPrice}</span>}</span>/Unit</p>
        <span className="offer">Buy 3, get 1 free</span>
        <a href="#" className="detail-btn">view details</a>
      </div>
      <div className="card-footer">
        <div className="change-quantity">
            <button disabled={quantity<1} className="counter-btn" onClick={()=>{setQuantity(--quantity)}}>-</button>
            <span className="counter">{quantity}</span>
            <button onClick={()=>{setQuantity(++quantity)}} className="counter-btn">+</button>
        </div>  
        <button onClick={updateItemDetail} className="btn">update</button>      
      </div>
    </div>
  );
}

const mapStateToProps=(state)=>{
    const  items =state.items;
    return {items}
}

const mapDispatchToProps = (dispatch) => {
    return {
    updateItem: (data) => dispatch(updateItem(data)),
    getItemsList:()=>dispatch(getItemsList())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
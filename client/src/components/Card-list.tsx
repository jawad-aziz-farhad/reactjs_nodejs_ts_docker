import React from "react";
import Card from "./card/Card";
import {connect} from "react-redux";
import {addItems, getItemsList, addItem} from "../actions";
import { SERVER_URL } from "src/config/config";
import Spinner from './common/Spinner'

 const  CardList = (props) => {

const [loading,setLoading]= React.useState(false)
const [addProduct,setAddProduct]= React.useState(true)
const [product,setProduct]= React.useState({
                productName: "",
                productPrice:"",
                productCurrency: "$USD",
                productDesc: "",
                productImage: "https://store.schoolspecialty.com/OA_HTML/xxssi_ibeGetWCCImage.jsp?docName=F4120624&Rendition=Large"
});

const { productName, productPrice , productDesc, productImage } = product;

     React.useEffect(() => {
         setLoading(true);
       getProducts()
     }, [])
const getProducts=()=>{
     fetch(SERVER_URL+"getAllProducts").then(res => {
            setLoading(false);
            return res.json();
        });
         
       props.getItemsList().then((response: any) => {
           props.addItems(response.data)
       }).catch(err=>console.log("error",err))
}
     function addDummyData():any{
         setLoading(true);
         
    props.addItem(product).then(res=>{
    setLoading(false);
    setProduct({
        productName: "",
        productPrice:"",
        productCurrency: "",
        productDesc: "",
        productImage: "https://store.schoolspecialty.com/OA_HTML/xxssi_ibeGetWCCImage.jsp?docName=F4120624&Rendition=Large"
    })
    getProducts()
}).catch(err=>console.log(err))
     }
     const handleChange = name => event => {
      setProduct({ ...product, [name]: event.target.value });
      (productName!==""&& productPrice!==""&& productImage!==""&& productDesc!=="")?setAddProduct(false):setAddProduct(true);
  
    };
    const {items} = props
    if(items.length<1){
        //addDummyData()
        return (
        loading===true?<Spinner/>: (
         <form className="col-lg-3 col-md-5">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            onChange={handleChange("productName")}
            value={productName}
            className="form-control"
            required={true}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            onChange={handleChange("productPrice")}
            value={productPrice}
            className="form-control"
            required={true}
          />
        </div>
           <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            onChange={handleChange("productImage")}
            value={productImage}
            className="form-control"
            required={true}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            onChange={handleChange("productDesc")}
            value={productDesc}
            className="form-control"
            required={true}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            onClick={addDummyData}
            className="btn btn-primary"
            disabled={addProduct}
          >
            Add Product
          </button>
        </div>
      </form>
      )
         
      )
    }
 
    return (
        <div className="cards-wrap">
            <div className="container">
            <div className="row">

                <div className="inner col-lg-9 col-md-7">
                    {items.map(item => { return <Card item={item} key={item._id}/> })}
                </div>
             <form className="col-lg-3 col-md-5">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          onChange={handleChange("productName")}
          value={productName}
          className="form-control"
          required={true}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          onChange={handleChange("productPrice")}
          value={productPrice}
          className="form-control"
          required={true}
        />
      </div>
         <div className="form-group">
        <label>Image URL</label>
        <input
          type="url"
          onChange={handleChange("productImage")}
          value={productImage}
          className="form-control"
          required={true}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          onChange={handleChange("productDesc")}
          value={productDesc}
          className="form-control"
          required={true}
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          onClick={addDummyData}
          className="btn btn-primary"
          disabled={addProduct}
        >
          Add Product
        </button>
      </div>
    </form>
            
    </div> 
            </div>
        </div>
    );
}

const mapStateToProps = (state:any) => {
    const  items =state.items;
    return {items };
};
  
const mapDispatchToProps = (dispatch:any) => {
    return {
    addItems: (data) => dispatch(addItems(data)),
    getItemsList:()=>dispatch(getItemsList()),
    addItem:(item)=>dispatch(addItem(item))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CardList)
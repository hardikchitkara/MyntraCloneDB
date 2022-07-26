import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import "./maincomponent.css"

const Maincomponent=(props)=>{
  const [allshirts, setallshirts] = useState([]);
  
  const loadItems=async()=>{
      // let loginUid=props.senduid;
      // console.log(loginUid);
    console.log("items component mounted with data");
    let track=await fetch("https://myntra-server-mysql.herokuapp.com/items",);
    console.log(track);
    let json=await track.json();
    console.log(json);
    // console.log(props.uid);
    setallshirts(json);  
    
  }

useEffect(()=>{
   loadItems();
   
},[]);
useEffect(()=>{
  props.receiveItemsLength(allshirts.length);
},[allshirts]);


  function checkingprices(p1,p2){
    for(let i=0;i<p1.length;i++)
    {
      if(parseInt(p1[i].split(',')[0])<=parseInt(p2) && parseInt(p2)<=parseInt(p1[i].split(',')[1])) {
        return true;
      }
    }
    return false;
  }

  let shirtstodisplay=[];
  if (props.sendstringdata.length==0) {
    shirtstodisplay=allshirts;
  }
  else{
    let strToCompare = props.sendstringdata.toLowerCase();
    shirtstodisplay = allshirts.filter((el) => {
      if(
        el.filter.toString().toLowerCase().includes(strToCompare) || 
        el.brand.toString().toLowerCase().includes(strToCompare) || 
        el.price.toString().toLowerCase().includes(strToCompare) || 
        el.discount.toString().toLowerCase().includes(strToCompare)
      )
      {
        return true;
      }
      return false;
    });
  }
    shirtstodisplay = shirtstodisplay.filter((el) => {
    if(
      (props.sendsexdata.length==0 || props.sendsexdata.includes(el.sex))
      &&(props.sendbranddata.length==0 || props.sendbranddata.includes(el.brand))
      &&(props.sendcolordata.length==0 || props.sendcolordata.includes(el.color))
      &&(props.senddiscountrangedata.length==0 || Math.max(...props.senddiscountrangedata.map((i)=>Number(i)))<=parseInt(el.discount) )
      &&(props.sendpricedata.length==0 || checkingprices(props.sendpricedata,el.price))
      )
      {
          return true;
      }
    });
    if(props.sendsortingchoice=="choi5")
    {
        shirtstodisplay.sort(function(a,b){
          return a.price-b.price;
        })
    }
    else if(props.sendsortingchoice=="choi4")
    {
      shirtstodisplay.sort(function(a,b){
        return b.price-a.price;
      })
    }
    else if(props.sendsortingchoice=="choi3")
    {
      shirtstodisplay.sort(function(a,b){
        return b.discount-a.discount;
      })
    }
    
  return(    
    
        <div className="alltickets">
          {
            
          shirtstodisplay.map((el)=>{
            
              return (
                
                <Link
                to={{pathname:"/details",state:[{ 
                  filter: el.filter,
                  brand: el.brand,
                  price: el.price,
                  discount:el.discount,
                  color: el.color,
                  imgurl:el.imgurl,
                  sex: el.sex,
                  itemid:el.itemid,
                  uid:props.senduid,
                }]}}
                style={{ textDecoration: 'none' ,color:'black'}} >

                  <div className="ticket" >
                    <img src={el.imgurl}></img>

                    {/* <div  id="idofwish" onClick={()=>{
                      alert("Wishlist is just for UI as it requires login");
                    }}>WishList</div> */}
                    
                    <div className="product-details">
                        <h3 class="product-brand">{el.brand}</h3>
                        <h4 class="product-product">{el.filter}</h4>
                        <span class="product-discountedPrice">Rs. {el.price}</span>
                        <span class="product-discountPercentage">({el.discount}% OFF)</span>
                    </div>
                  </div>
                </Link>
              )
            }
          )
          
          }
      </div>
    )
    
}
export default Maincomponent;

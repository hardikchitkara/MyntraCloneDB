import React from "react";
import './Mainelementdetails.css'
class mainelementdeatils extends React.Component{
    state={
        sex:"",
        filter: "",
        brand: "",
        price: "",
        discount:"",
        color: "",
        imgurl:"",
        size:"",
        uid:"",
        itemid:""
    }
    
    componentDidMount(){
        
        
        this.setState({
            sex:this.props.sendsexticket,
            filter:this.props.sendfilterticket,
            brand:this.props.sendbrandticket,
            price:this.props.sendpriceticket,
            color:this.props.sendcolorticket,
            imgurl:this.props.sendimgurlticket,
            discount:this.props.senddiscountticket,
            uid:this.props.senduid,
            itemid:this.props.senditemid
        })

    }
    changesize(param){
        this.setState({
            size:param
        })
    }
   
    sendCartData=async(param)=>{
        console.log(param);
        const res=await fetch("https://myntra-server-mysql.herokuapp.com/insert",{
            method:"POST",
            headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
                uid:param.uid,
                itemid:param.itemid,
                size:param.size
            })
          })
        const json=await res.json();
    }
    // sendWishlistData=async(param)=>{
    //     const res=await fetch("/insertWishlist",{
    //         method:"POST",
    //         mode:"no-cors",
    //         headers:{
    //           "Accept":"application/json",
    //           "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             uid:param.uid,
    //             itemid:param.itemid,
    //             size:param.size
    //         })
    //       })
    // }


    render(){
        
        if( document.getElementById(this.state.size)!=null)
        {
            let list=document.getElementsByClassName("size-buttons-size-button");
            for(let i=0;i<list.length;i++)
            {
                list[i].style.borderColor="#D3D3D3";
            }
            document.getElementById(this.state.size).style.borderColor="#ff3e6c";
        }
       
        return(
            
            <div>
                <div className="documentofimage">
                    
                    <div class="wholeimage">
                        <img className="full-image" src={this.state.imgurl}></img> 
                    </div>

                    <button class="p-modal__close" id="closebutton" aria-label="Close active modal" aria-controls="modal" onClick={(el)=>{
                                document.getElementsByClassName("documentofimage")[0].style.visibility="hidden";
                        }}>Close</button>
                </div>
                <div id="stop-scroll">
                {/* <div className="ad"></div> */}
                <div className="mid">
                    <div className="mid_1">
                        Home / Clothing / {this.state.sex} Clothing /<span className="mid_1_3">Shirts / {this.state.brand} Shirts /</span>
                    </div>
                </div>
                <div className="display">
                    <div className="picsdisplay">
                        <img className="imagemain" src={this.state.imgurl} onClick={(el)=>{
                             document.getElementsByClassName("documentofimage")[0].style.visibility="visible";
                        }}></img>
                    </div>
                    <div className="detailsdisplay">
                        <div className="namebrand">{this.state.brand}</div>
                        <div className="namefilter">{this.state.filter}</div>
                        <div className="nameprice">
                            Rs. {this.state.price}<span className="discountcolor">({this.state.discount}%OFF)</span>
                        </div>
                        <div className="incofalltaxes">inclusive of all taxes</div>
                        <div className="namesize">Select Size</div>
                        <div className="buttons">
                           <button id="S" class="size-buttons-size-button size-buttons-size-button-default" onClick={(e)=>{
                                this.changesize("S");
                                
                            }}><span class="size-buttons-size-strike-hide"></span><p class="size-buttons-unified-size" >S</p></button>
                            <button id="M" class="size-buttons-size-button size-buttons-size-button-default"onClick={(e)=>{
                                this.changesize("M");
                                
                            }}><span class="size-buttons-size-strike-hide"></span><p class="size-buttons-unified-size">M</p></button>
                            <button id="L" class="size-buttons-size-button size-buttons-size-button-default"onClick={(e)=>{
                                this.changesize("L");
                                
                            }}><span class="size-buttons-size-strike-hide"></span><p class="size-buttons-unified-size">L</p></button>
                            <button id="XL" class="size-buttons-size-button size-buttons-size-button-default"onClick={(e)=>{
                                this.changesize("XL");
                                
                            }}><span class="size-buttons-size-strike-hide"></span><p class="size-buttons-unified-size">XL</p></button>
                            <button id="XXL" class="size-buttons-size-button size-buttons-size-button-default"onClick={(e)=>{
                                this.changesize("XXL");
                                
                            }}><span class="size-buttons-size-strike-hide"></span><p class="size-buttons-unified-size">XXL</p></button>
                            <button id="XXXL" class="size-buttons-size-button size-buttons-size-button-default"onClick={(e)=>{
                                this.changesize("XXXL");
                                
                            }}><span class="size-buttons-size-strike-hide"></span><p class="size-buttons-unified-size">XXXL</p></button>
                        </div>
                        <div className="Buttonsaddandwish">
                            <div class="addtobag" onClick={()=>{
                                
                                this.props.receivesexdata(this.state.sex);
                                this.props.receivepricedata(this.state.price);
                                this.props.receivebranddata(this.state.brand);
                                this.props.receivediscountrangedata(this.state.discount);
                                this.props.receivecolordata(this.state.color);
                                this.props.receivesizedata(this.state.size);

                                if(this.state.size=="")
                                {
                                    alert("please select size first");
                                }
                                else{
                                    
                                    this.sendCartData({uid:this.state.uid,itemid:this.state.itemid,size:this.state.size});
                                    
                                    setTimeout (function () { alert("Item is successfully inserted into the bag") }, 1000);
                                }
                            }}>
                            <span class="addtobagname"></span>ADD TO BAG
                            </div>
                            {/* <div class="wishlist" onClick={(el)=>{
                                if(this.state.size=="")
                                {
                                    alert("please select size first");
                                }
                                else{
                                    this.sendWishlistData({uid:this.state.uid,itemid:this.state.itemid,size:this.state.size});
                                    alert("Item is successfully added to bag");
                                }
                                
                            }}>
                            <span class="wishlistname" ></span>WISHLIST
                            </div> */}
                        </div>
                        <div className="deliveryoptions" >
                                <span >
                                Delivery Option:
                                </span>
                                <ul>
                                    <li>Please enter PIN code to check delivery time & Pay on Delivery Availability</li>
                                    <li>100% Original Products</li>
                                    <li>Pay on delivery might be available</li>
                                    <li>Easy 30 days returns and exchanges</li>
                                    <li>Try & Buy might be available</li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
                </div>
               
               
            
        )
    }
}
export default mainelementdeatils;

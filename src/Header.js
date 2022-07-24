import React from "react";
import {Link} from "react-router-dom"
import './Header.css';

class Header extends React.Component{
    state={
        loading:[],
        sum:0,
        newdata:[]
    }
    
    deleteFromDatabase=(param)=>
    {
        (async()=>{
            let res=await  fetch(`https://myntra-server-mysql.herokuapp.com/deleteItemCart/${param}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    'Accept': 'application/json'
                }
            });
            let json=await res.json();
            console.log(json);
            window.location.reload (); 
        })();
    }
    componentDidUpdate(){

        // console.log(this.props.sendalldata);
        let jaye=true;
        if(this.props.sendalldata!=undefined && this.state.newdata!=[] && this.props.sendalldata.sex==this.state.newdata[0] && this.props.sendalldata.price==this.state.newdata[1] && this.props.sendalldata.brand==this.state.newdata[2] && this.props.sendalldata.discount==this.state.newdata[3] && this.props.sendalldata.color==this.state.newdata[4] && this.props.sendalldata.size==this.state.newdata[5])
        {
            jaye=false;
        }
        
        if(this.props.sendalldata!=undefined && this.props.sendalldata.sex!='' && jaye==true)
        {
            console.log("Yes header re renders");
            let stateloading=this.state.loading;
            let comingdata=[this.props.sendalldata.sex,this.props.sendalldata.price,this.props.sendalldata.brand,this.props.sendalldata.discount,this.props.sendalldata.color,this.props.sendalldata.size];
            console.log(comingdata);
            stateloading.push(comingdata);
            let mysum=this.state.sum+this.props.sendalldata.price;
            this.setState({loading:stateloading,sum:mysum});
            this.setState({newdata:comingdata});
            window.location.reload () ;
            alert("This item will be added to cart");
        }

    }
    componentDidMount(){
        (async()=>{
            let res=await fetch("https://myntra-server-mysql.herokuapp.com/cartItems");
            let json=await res.json(); 
            let price=0;
            json.forEach(function(el){
                price=price+el[1];
            });
            this.setState({loading:json,sum:price});  
            
        })();
        
    }
   
    render(){
        return (
            <nav className="header">
                <div className="firstbox">
                    <img className="desktop-logo"src="https://images.indianexpress.com/2021/01/myntra.png"></img>
                    <div className="header_1"><span>Men</span></div>
                    <div className="header_2"><span>WoMen</span></div>
                    <div className="header_3"><span>kids</span></div>
                    <div className="header_4"><span>HomenLiving</span></div>
                    <div className="header_5"><span>Beauty</span></div>
                </div>
                <div className="secondbox">
                    <input placeholder="Search for fitting like casual" className="header_6" type="text" onChange={
                        (el)=>{
                            if(this.props.receivestringdata!=undefined)
                            {
                                this.props.receivestringdata(el.currentTarget.value)
                            }
                        }
                    }></input>
                </div>

                <div className="thirdbox">
                    <i class="p-icon--user" style={{cursor:"pointer"}}onClick={()=>{
                        if(document.getElementById("modalite").style.visibility!="visible")
                        {
                            document.getElementById("modalite").style.visibility="visible";
                        }
                        // alert("It is not working, it requires login ");
                    }}></i>
                    
                    {/* <span class="myntraweb-sprite desktop-iconWishlist sprites-headerWishlist" onClick={()=>{
                        alert("It is not working, it requires login ");
                    }}></span> */}
                    <div className="bag" onClick={()=>{
                            // this.addingdata();
                            
                            if(document.getElementById("modal").style.visibility!="visible")
                            {
                                document.getElementById("modal").style.visibility="visible";
                            }
                            
                            
                            // console.log(window.$count);
                            // let x=[];
                            // for (let i=0;i<window.$count;i++)
                            // {
                            //     if(window.localStorage.getItem(`user${i}`)!=undefined)
                            //     {
                            //         let obj=JSON.parse(window.localStorage.getItem(`user${i}`));
                            //         x.push(obj);
                            //         this.setState({loading:x});
                            //     }   
                            // }
                        }}> 
                        <span class="myntraweb-sprite desktop-iconBag sprites-headerBag" data-reactid="856" ></span>
                        {/* <span class="desktop-userTitle" data-reactid="858">Bag</span> */}
                    </div>
                    <div class="p-modal" id="modalite">
                        <section class="p-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
                            <div className="profileclass">
                                <div>
                                    {"Want to Sign Out? Visit Again..."}
                                </div>
                                <button id="profileclosebutton" class="p-modal__close" aria-label="Close active modal" aria-controls="modal" onClick={()=>{
                                    document.getElementById("modalite").style.visibility="hidden";
                                }}
                                >Close</button>
                            </div>
                            
                            <Link to="/">
                                <div class="atb">        
                                    <span class="atbn"></span>Sign Out
                                </div>
                            </Link>
                            
                        </section>
                    </div>
                    <div class="p-modal" id="modal">
                        <section class="p-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
                            <p id="modal-description">These are the items in your bag </p>
                            <button class="p-modal__close" aria-label="Close active modal" aria-controls="modal" onClick={()=>{
                                document.getElementById("modal").style.visibility="hidden";
                            }}
                            >Close</button>
                            <div class="p-heading-icon--small">
                                {                            
                                this.state.loading.map((el)=>{
                                    return(
                                        <div class="p-heading-icon__header">

                                                <span>{el[2]}</span>
                                                <span>{el[0]}</span>
                                                <span>{el[1]+"Rs."}</span>
                                                <span>{el[3]+"%OFF"}</span>
                                                <span>{el[4]}</span>
                                                <span>{el[5]}</span>
                                                <span className="nameremove" onClick={async()=>{
                                                    
                                                    
                                                        this.deleteFromDatabase(el[9]);
                                                        let price=this.state.sum;
                                                        price=price-el[1];

                                                        let x=this.state.loading;
                                                        let idx=x.indexOf(el);
                                                        x.splice(idx, 1);
                                                        this.setState({loading:x,sum:price})
                                                    
                                                    
                                                    
                                                    // document.getElementById("modal").style.visibility="hidden";
                                                    alert("items has been successfully removed")
                                                }}>REMOVE</span>
                                        </div>   
                                    )
                                }) 
                                }
                                <div className="baw">
                                    <div className="totalheading">
                                        {"Your Total is : "+this.state.sum+" Rs. "}
                                    </div>
                                    <div class="atb" onClick={()=>{
                                        if(this.state.sum==0) alert("Please Select some items to buy")
                                        else alert("Your Order Is Placed, Thank You for Choosing Us !!");
                                    }}>
                                        <span class="atbn"></span>Place Order
                                    </div>
                                </div>
                            </div>
                        </section>
                        </div>
                    </div>
                
            </nav>
    )
    }
   
}
export default Header;

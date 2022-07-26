import './App.css';
import Middle from './Middle';
import Header from './Header';
import Leftpane from './leftpane';
import Maincomponent from './maincomponent.jsx'
import React from 'react';
class App extends React.Component{
  state={
    sexdata:[],
    pricedata:[],
    branddata:[],
    discountrangedata:[],
    colordata:[],
    searchedstring:"",
    sortingchoice:"",
    itemsLength:0
  }
  
  receivesexdata=(param)=>{
    this.setState({ 
      sexdata:param
    })
  }
  receivepricedata=(param)=>{
    this.setState({ 
      
      pricedata:param
    })
  }
  receivebranddata=(param)=>{
    this.setState({ 
      
      branddata:param
    })
  }
  receivediscountrangedata=(param)=>{
    this.setState({ 
      
      discountrangedata:param
    })
  }
  receivecolordata=(param)=>{
    this.setState({ 
      
      colordata:param
    })
  }
  receivestringdata=(param)=>{
    this.setState({
      searchedstring:param

    })
}
  receivesortingdata=(param)=>{
    this.setState({
      sortingchoice:param
    })
  }
  receiveItemsLength=(param)=>{
    this.setState({
      itemsLength:param
    })
  }
  // receiveitemsdata=(param)=>{
  //   this.setState({
  //     itemdata:param
  //   })
  // }
  render(){
    // console.log("cart data --->", this.props.location.state.uid);
    
    return (
      <React.Fragment>
        <div>
          <div className="App">
            <Header
              receivestringdata={this.receivestringdata}
              senduid={this.props.location.state.uid}
              // receiveitemsdata={this.receiveitemsdata}
            />
            <Middle
              receivesortingdata={this.receivesortingdata}
              sendItemsLength={this.state.itemsLength}
            />
          </div>
          <div className="App2">
            <div className="leftpane">
              <Leftpane
                receivesexdata={this.receivesexdata}
                receivepricedata={this.receivepricedata}
                receivebranddata={this.receivebranddata}
                receivediscountrangedata={this.receivediscountrangedata}
                receivecolordata={this.receivecolordata}
              />
            </div>
            <div className="rightpane">
              <Maincomponent
                sendsexdata={this.state.sexdata}
                sendpricedata={this.state.pricedata}
                sendbranddata={this.state.branddata}
                senddiscountrangedata={this.state.discountrangedata}
                sendcolordata={this.state.colordata}
                sendstringdata={this.state.searchedstring}
                sendsortingchoice={this.state.sortingchoice}
                senduid={this.props.location.state.uid}
                receiveItemsLength={this.receiveItemsLength}
              />
            </div>
        </div>
      </div>
      </React.Fragment>
       );
  }
 
}

export default App;

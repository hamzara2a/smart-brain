import React, { Component } from "react";
import Navigation from "./Components/Navigation/Navigation"
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition"
import Signin from "./Components/Signin/Signin"
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Register from "./Components/Register/Register";
import Rank from "./Components/Rank/Rank";
import "tachyons";
import './App.css';



const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  imageBox: "",
  isSignedIn: false,
  route: "signin",
  user: {
    name: "",
    id: "",
    email: "",
    entries: 0,
    joined: ""
  }


}

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {

      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    
    })
  }





//CALCULATE PARAMETERS OF FACE BOX-------------------------------------------------
  facesCalculate = (data) => {

    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(face => {

        const clarifaiFace =face.region_info.bounding_box;
        
        const image = document.getElementById("inputImage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftcol: clarifaiFace.left_col * width,
          toprow: clarifaiFace.top_row * height,
          rightcol: width - (clarifaiFace.right_col * width),
          bottomrow: height - (clarifaiFace.bottom_row * height)
        }
      })
    }
    return;
  }




//INSERT THE BOX ITSELF-------------------------------------------------
  displayFaceBoxes = (boxes) => {

    if(boxes) {
      this.setState({boxes: boxes});
    }
  }
  


  
//WHAT HAPPEBS WHEN WE CHANGE THE INPUT?-------------------------------------------------
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }





//WHAT HAPPEBS WHEN WE CLICK THE BUTTON?-------------------------------------------------
  onButtonSubmit = () => {

  //clarifai code-----------------------------
    this.setState({imageUrl: this.state.input})


    fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
            })
        })
    .then(response => response.json())   
    .then(result => {

      this.displayFaceBoxes(this.facesCalculate(result))

      fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))
              })
      
    })
    .catch(error => console.log('error', error));
  }




//WHAT TO DISPLAY WHEN OUR ROUTE CHANGES-------------------------------------------
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }





//RENDER EVERYTHING NOW!-------------------------------------------
  render() { 
    const { route, isSignedIn, imageUrl, boxes } = this.state;

    return (
      
      <div className="App">
        
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === "home" 
      ? <div>
          <Logo />
          <Rank 
          name={this.state.user.name}
          entries={this.state.user.entries}
          />
          <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />

          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />

        </div> 
      : (
        route === 'signin'
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       )
        
      
      } 
      </div>
      
    );

  }

}
export default App;








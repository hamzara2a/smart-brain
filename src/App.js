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
  box: {},
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
  faceCalculate = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol: clarifaiFace.left_col * width,
      toprow: clarifaiFace.top_row * height,
      rightcol: width - (clarifaiFace.right_col * width),
      bottomrow: height - (clarifaiFace.bottom_row * height)
    }

  }




//INSERT THE BOX ITSELF-------------------------------------------------
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  


  
//WHAT HAPPEBS WHEN WE CHANGE THE INPUT?-------------------------------------------------
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }





//WHAT HAPPEBS WHEN WE CLICK THE BUTTON?-------------------------------------------------
  onButtonSubmit = () => {

  //clarifai code-----------------------------
    this.setState({imageUrl: this.state.input})

   /* const raw = JSON.stringify({
      "user_app_id": {
            "user_id": "hamza_pr1vate",
            "app_id": "90321c1278564c51b7a9fd75c5dc0b81"
        },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });
  

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ecee7cc9849844b28fafcc27c7cc7555'
      },
      body: raw
    };
    //end of clarifai code-----------------------------

    
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions) 
    */

    fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
            })
        })
    .then(response => response.json())   
    .then(result => {

      this.displayFaceBox(this.faceCalculate(result))

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
    const { route, isSignedIn, imageUrl, box } = this.state;

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

          <FaceRecognition box={box} imageUrl={imageUrl} />

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








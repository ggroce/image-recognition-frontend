import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Rank from './components/Rank/Rank';

import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '2991e271c82245929ad853bbd5de68c9'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '', 
      imageUrl: '', 
      box: {
        top: '', 
        right: '', 
        bottom: '', 
        left: ''
      }, 
      route: 'signin'
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.input)
    .then((response) => {

      console.log(response);
      console.log(response.outputs[0].data.regions[0].data.concepts[0].name);
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

      this.displayObjectBox(this.calcObjectLocation(response));
    }).catch((err) => {
      console.log('error in face detection API response:', err);
    });
  }

  calcObjectLocation = (data) => {
    const boxData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      top: boxData.top_row * height, 
      right: width - (boxData.right_col * width), 
      bottom: height - (boxData.bottom_row * height), 
      left: boxData.left_col * width
    }
  }

  displayObjectBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        { this.state.route === 'home' 
          ? <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo /> 
            <Rank />
            <ImageLinkForm 
              onButtonSubmit={this.onButtonSubmit} 
              onInputChange={this.onInputChange} 
            />
            <ImageRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : (
            this.state.route === 'signin' 
            ? <SignIn onRouteChange={this.onRouteChange} /> 
            : <Register onRouteChange={this.onRouteChange} />
          )
        }

        <Particles className='particles' params={particlesOptions}/>
      </div>
    );
  }
}

const particlesOptions = {
  "particles": {
      "number": {
          "value": 60,
          "density": {
              "enable": true,
              "value_area": 1200
          }
      },
      "line_linked": {
          "enable": true,
          "opacity": 0.03
      },
      "move": {
          "direction": "right",
          "speed": 0.06
      },
      "size": {
          "value": 1
      },
      "opacity": {
          "anim": {
              "enable": true,
              "speed": 2,
              "opacity_min": 0.05
          }
      }
  },
  "interactivity": {
      "events": {
          "onclick": {
              "enable": true,
              "mode": "push"
          }, 
          "onhover": {
            "enable": true,
            "mode": "bubble"
        }
      },
      "modes": {
          "push": {
              "particles_nb": 1
          }, 
          "bubble": {
            "size": 4,
            "distance": 40
        }
      }
  },
  "retina_detect": true
}

export default App;
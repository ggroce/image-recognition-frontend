import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
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
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    console.log('click');
    app.models.predict(Clarifai.CELEBRITY_MODEL, 
    "https://samples.clarifai.com/face-det.jpg")
    .then(function(response) {
      console.log(response);
    }, 
      function(err) {
        console.log('error in face detection API response');
      });
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo /> 
        <Rank />
        <ImageLinkForm 
          onButtonSubmit={this.onButtonSubmit} 
          onInputChange={this.onInputChange} 
        />
        <ImageRecognition />
        <Particles className='particles' params={particlesOptions}/>
      </div>
    );
  }
}

export default App;


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
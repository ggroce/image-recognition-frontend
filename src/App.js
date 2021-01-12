import React from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Rank from './components/Rank/Rank';

import ParticlesOptions from './ParticlesOptions';
import Particles from 'react-particles-js';

import './App.css';

const initialState = {
  input: '', 
  imageUrl: '', 
  box: {
    top: '', 
    right: '', 
    bottom: '', 
    left: ''
  }, 
  route: 'signin', 
  isSignedIn: false,
  user : {
    id: '', 
    name: '', 
    email: '', 
    entries: 0, 
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id, 
      name: data.name, 
      email: data.name, 
      entries: data.entries, 
      joined: data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = (event) => {
    this.setState({imageUrl: this.state.input});
    fetch('https://rocky-dusk-77911.herokuapp.com/imageurl', {
      method: 'post', 
      headers: {'Content-Type': 'Application/json'}, 
      body: JSON.stringify({input: this.state.input})
    })
    .then(response => response.json())
    .then((response) => {
      if(response) {
        fetch('https://rocky-dusk-77911.herokuapp.com/image', {
          method: 'put', 
          headers: {'Content-Type': 'Application/json'}, 
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(response => {
          if (response !== 'invalid ID') {
            this.setState(Object.assign(this.state.user, {entries: response}));
          }
        })
        .catch(console.log);
      }
      

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
    if (route === 'signin') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        { 
        this.state.route === 'home' ? 
          <div>
            <header>
            <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
            </header>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onImageSubmit={this.onImageSubmit} 
              onInputChange={this.onInputChange} 
            />
            <ImageRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : (this.state.route === 'signin' ? 
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }

        <Particles className='particles' params={ParticlesOptions}/>
      </div>
    );
  }
}

export default App;
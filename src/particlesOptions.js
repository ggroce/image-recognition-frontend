const ParticlesOptions = {
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
  
  export default ParticlesOptions;
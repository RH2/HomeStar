import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import * as THREE from "three"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//import texture_fighter_diffuse from "./model/fighter_textures/fighter_Material.001_BaseColor.png"

//an interface has standards:
//standard ui display with actions that can be dictated.
//standard update (called from animation)
//standard

function gen_interface_movement(){
  //movement input
  //movement update
  return(
    {
      interfaceName: "movement",
      position: new THREE.Vector3(),
      destination: new THREE.Vector3(),
      lookat: new THREE.Vector3(),
      acceleration: 0.5,
      velocity: 0.0,
      randomness: 0.0, //evasive action, makes overall movement slower because there is more random walk.
      ui: <div></div>, //div to display on unit readout
      update: function(){
        //draw line from current location to destination
        //1.create line, 2.replace existing line.
        //highlight destination
      },

    }
  )

}
function interface_health(){

}
function interface_ai(){

}

//when a group is selected, the user might want to create formations (wall, sphere, pyramid, cubic, line, )
function interface_group(){

}


class A2 extends Component {
  componentDidMount() {
    var scene = new THREE.Scene( );
    scene.background = new THREE.Color( 0x000000 );
    scene.add(new THREE.AxesHelper(5))
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ); camera.position.z = 5;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = false
    this.mount.appendChild(renderer.domElement);





    //TOC geometry and material factory line 36-110
    //FIGHTER ART
    var loader_texture = new TextureLoader
    const loader_obj = new OBJLoader()
    var  fighterMat = new THREE.MeshBasicMaterial({
      ambientLight:1,
      color: 0xFFFFFF,
      //wireframe: true,
      map: loader_texture.load('/model/fighter_textures/fighter_Material.001_BaseColor.png'),
    });
    var  mothershipMat = new THREE.MeshStandardMaterial({
      ambientLight:0.1,
      color: 0x2222FF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 2,
      //wireframe: true,
      map: loader_texture.load('/model/mothership_textures/mothership_Mothership2048_BaseColor.png'),
      emissiveMap: loader_texture.load('/model/mothership_textures/mothership_Mothership2048_Emissive.png')
    });
    var fighter_model= 2
    loader_obj.load(
      "model/fighter.obj",
      function(object){//on load
        object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = fighterMat;
            }
        } );
         object.scale.x = 0.5;
         object.scale.y = 0.5;
         object.scale.z = 0.5;
         fighter_model = object
         scene.add(object);
        console.log(object)}
    )
    var mother_model
    loader_obj.load(
      "model/mothership2.obj",
      function(object){//on load
        object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = mothershipMat;
            }
        } );
        object.scale.x = 0.5;
        object.scale.y = 0.5;
        object.scale.z = 0.5;
        object.position.z = -100
        mother_model = object
        scene.add(object);
      }
    )
    //var model_mothership = loader_obj.load("model/fighter.obj")


    var texture_sprite_square = new THREE.TextureLoader().load('/sprites/box3.png')
    var material = new THREE.SpriteMaterial( {map: texture_sprite_square, sizeAttenuation:false})
    var sprite = new THREE.Sprite(material)
    sprite.scale.set(.1,.1, 1)
    sprite.sizeAttenuation = false
    scene.add(sprite)




    function gen_unit_fighter(location){
      loader_obj.load(
        "model/fighter.obj",
        function(object){//on load
          object.traverse( function( child ) {
              if ( child instanceof THREE.Mesh ) {
                  child.material = fighterMat;
              }
          } )
           object.scale.x = 0.5;
           object.scale.y = 0.5;
           object.scale.z = 0.5;
           object.health = 1200
           object.destination = new THREE.Vector3()
           object.velocity = 0
           object.maxThrust = 1
           object.team = 1
           object.select = false
           object.position.x = location.x
           object.position.y = location.y
           object.position.z = location.z
           object.name = "FIGHTER"
           scene.add(object)
      })


      //let unit = fighter_model.clone()

    }

    function gen_unit_mothership(location){
      let unit = fighter_model.clone()
      unit.position.x = location.x
      unit.position.y = location.y
      unit.position.z = location.z
      unit.health = 120000
      unit.destination = new THREE.Vector3()
      unit.velocity = 0
      unit.maxThrust = 0.1
      unit.team = 1
      unit.select = false
      return(unit)
    }

    function gen_squadron(x,y,spreadx,spready,vec3){
      for (var i = 0; i < x*y; i++) {
        let difx = spreadx/x
        let dify = spready/y
        let midx = spreadx/2
        let midy = spready/2

        let vector = new THREE.Vector3(
          (vec3.x-midx)+(parseInt(i%x)*difx),
          (vec3.y-midy)+(parseInt(i/x)*dify),
          vec3.z)
        gen_unit_fighter(vector)
        console.log("progress",scene)
      }
    }


    gen_squadron(5,5,20,20,new THREE.Vector3(4,4,4))










    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    var animate = function() {
      requestAnimationFrame(animate);
      // if(fighter_model!=undefined){fighter_model.rotation.x += 0.01;fighter_model.rotation.y += 0.01;fighter_model.rotation.z += 0.01;}
      // if(mother_model!=undefined){mother_model.rotation.x += 0.001;mother_model.rotation.y += 0.001;mother_model.rotation.z += 0.001;}

      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return(
      <div>
        <div id="unit_display" style={style_unit}> — UNIT DISPLAY</div>
        <div id="UI" style={style_ui}>
          THIS IS THE UI!
          </div>
        <div ref={ref => (this.mount = ref)}></div>
      </div>
    )
  }
}
const style_ui = {
  color:"white",
  fontFamily: "Roboto",
  position:"absolute",
  top: "0px",
  left: "0px",
  width: "auto",
  height: "auto",
  zIndex:"10",
  padding: "2em",
  overflow: "hidden",
}
const style_unit = {
  backgroundColor: "hsla(200,100%,50%,0.1)",
  color:"hsla(200, 100%, 100%, 1.0)",
  border:"solid",
  borderColor: "hsla(200, 100%, 50%, 0.5)",
  userSelect: "none",
  mozUserSelect:"none",
  webkitUserSelect:"none",
  fontFamily: "Roboto",
  position:"absolute",
  top: "2em",
  right: "2em",
  width:"20em",
  zIndex:"10",
  padding: "1em",
}
const rootElement = document.getElementById("root");
ReactDOM.render(<A2 />, rootElement);

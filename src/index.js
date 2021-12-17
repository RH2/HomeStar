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





    //geometry and material factory line 36-110
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
    var fighter_model
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
      "model/mothership.obj",
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

    function gen_unit_fighter(location){
      let unit = fighter_model.clone()
      unit.health = 1200
      unit.destination = new THREE.Vector3()
      unit.velocity = 0
      unit.maxThrust = 0.1
      unit.team = 1
      unit.select = false
      return(unit)
    }

    function gen_unit_mothership(location){
      let unit = fighter_model.clone()
      unit.health = 1200
      unit.destination = new THREE.Vector3()
      unit.velocity = 0
      unit.maxThrust = 0.1
      unit.team = 1
      unit.select = false
      return(unit)
    }




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
        <div id="UI" style={style_ui}>THIS IS THE UI!</div>
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
  zIndex:"10",
  padding: "2em",
}
const rootElement = document.getElementById("root");
ReactDOM.render(<A2 />, rootElement);

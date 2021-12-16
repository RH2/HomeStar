import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import * as THREE from "three"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
import { TextureLoader } from 'three/src/loaders/TextureLoader'

//import texture_fighter_diffuse from "./model/fighter_textures/fighter_Material.001_BaseColor.png"

class A2 extends Component {
  componentDidMount() {
    var scene = new THREE.Scene( );
    scene.background = new THREE.Color( 0x000000 );
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
    this.mount.appendChild(renderer.domElement);


    var loader_texture = new TextureLoader
    var  fighterMat = new THREE.MeshBasicMaterial({
      ambientLight:1,
      color: 0xFFFFFF,
      //wireframe: true,
      map: loader_texture.load('/model/fighter_textures/fighter_Material.001_BaseColor.png'),
    });

    //geometry and material factory
    const loader_obj = new OBJLoader()
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
         new THREE.Vector3(0.1,0.1,0.1);scene.add(object); console.log(object)}
    )
    //var model_mothership = loader_obj.load("model/fighter.obj")




    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    var animate = function() {
      requestAnimationFrame(animate);
      if(fighter_model!=undefined){
      fighter_model.rotation.x += 0.01;
      fighter_model.rotation.y += 0.01;
      fighter_model.rotation.z += 0.01;
    }

      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<A2 />, rootElement);

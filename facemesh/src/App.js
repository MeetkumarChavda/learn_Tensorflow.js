// import dependencies
// setupm webcam and canvas 
// define refrance to those
// load facemesh
// Detect function 
// Drawing utilities
//load triangulations
// setup triange path
// setup point drawing
//add drawmesh to detect fucation
import React, { useRef } from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import { drawMesh } from './utilities';

function App() {

  // setup refrences
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);

  // load facemesh model
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8
    });
    setInterval(async () => {
      detect(net);
    }, 100);


    // run detection
    const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video properties 
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video props
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas props
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // run detection
      const face = await net.estimateFaces(video);
      console.log(face);

      // get canwas context for drawing
      const ctx = canvasRef.current.getContext('2d');
      drawMesh(face, ctx);
    }
  }

}

runFacemesh();
return (
  <div className="App">
    <Webcam ref={webcamRef}
      style={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 9,
        width: 640,
        height: 480
      }} />

    <canvas ref={canvasRef}
      style={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 9,
        width: 640,
        height: 480
      }} />

  </div>
);
}

export default App;

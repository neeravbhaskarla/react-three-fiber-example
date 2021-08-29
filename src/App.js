import './App.scss';

import {Canvas, useFrame} from '@react-three/fiber'
import {softShadows, MeshWobbleMaterial, OrbitControls} from '@react-three/drei'
import { useRef, useState } from 'react';
import {useSpring, a} from '@react-spring/three'

softShadows()


const SpinningMesh = ({position, args, color}) =>{
  const mesh  = useRef(null);
  useFrame(()=>(mesh.current.rotation.x = mesh.current.rotation.y += 0.01))


  const [expand, setExpand] = useState(false)

  const props = useSpring({
    scale: expand? [1.4, 1.4, 1.4]: [1,1,1],
  })

  return(
        <a.mesh 
          onClick = {()=> setExpand(!expand)}
          scale={props.scale}
          castShadow ref = {mesh} position={position}>
          <boxBufferGeometry attach='geometry' args={args}/>
          <MeshWobbleMaterial attach='material' color={color} speed={1} factor={.6}/>
        </a.mesh>
  )
}
function App() {
  
  return ( 
    <>
      <Canvas shadows colorManagement camera={{position: [-5, 2, 10], fov: 60}}>
        <ambientLight intensity={0.3}/>
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 10, -20]} intensity={0.5}/>
        <pointLight position={[0, -10, 0]} intensity={1.3}/>

        <group>
          <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]}/>
            <shadowMaterial attach='material' opacity={0.2}/>
          </mesh>
        </group>

        <SpinningMesh position={[0, 1, 0]} args={[1, 3, 1]} color='lightblue'/>
        <SpinningMesh position={[-3, 1, -5]} args={[1, 1, 1]} color='grey'/>
        <SpinningMesh position={[6, 1, -2]} args={[1, 1, 1]} color='grey'/>
        <OrbitControls/> 
      </Canvas>
    </>
  );
}

export default App;

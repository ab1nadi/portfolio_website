import { useEffect, useRef, useState} from "react";
import React from 'react'
import {useThree, Canvas, useFrame} from '@react-three/fiber'

export default function Rubiks(props)
{
    useEffect(()=>
    {
        console.log(props);
    })
    return(
    <div className={props.className}>
        <Canvas>
            <pointLight position={[10, 10, 10]} />
            <Goob></Goob>
        </Canvas>
    </div>
    );
}



function Goob()
{

    const boxRef = React.useRef(null);

    const [active, setActive] = useState(false);

    const state = useThree();

    let xRotation = 0;
    let yRotation = 0;

    useFrame(({clock}, d)=> {
        
        
        let mesh = boxRef.current;


        if(active)
        {
            mesh.rotation.x = -state.mouse.y;
            mesh.rotation.y = state.mouse.x;
        }
        mesh.rotation.x += mesh.rotation.x * 0.1*d;
        mesh.rotation.y += nesh.rotation.y * 0.1*d;

        
    })

   

    return (
    <mesh ref={boxRef} onClick={()=> setActive(!active)}>
        <boxGeometry  args={[3.5,3.5,3.5]} />
        <meshPhysicalMaterial color="blue" sheen={0.2} sheenColor={"#fffff"} />
    </mesh>
    )
}
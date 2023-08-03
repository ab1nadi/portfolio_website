import { useEffect, useRef, useState} from "react";
import React from 'react'
import {useThree, Canvas, useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshBasicMaterial } from "three";


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
            <RubiksCube w={3} s={1} position = {[0,0,0]}></RubiksCube>
        </Canvas>
    </div>
    );
}




let dataArray = [];

function RubiksCube(props)
{

    const boxRef = React.useRef(null);

    const [active, setActive] = useState(false);
    const state = useThree();
    const [squares, setSquares] = useState([]);

    const green = useLoader(TextureLoader, 'green.png');
    const black = useLoader(TextureLoader, 'black.png');
    const blue = useLoader(TextureLoader, 'blue.png');
    const red = useLoader(TextureLoader, 'red.png');
    const orange = useLoader(TextureLoader, 'orange.png');
    const white = useLoader(TextureLoader, 'white.png');
    const yellow = useLoader(TextureLoader, 'yellow.png');


    

    useEffect(()=>{
        for(let x = 0; x<props.w; x++)
        {
            dataArray.push([]);
            for(let y = 0; y<props.w; y++)
            {

                dataArray[x].push([]);
                for(let z = 0; z<props.w; z++)
                {
                    console.log(x-props.w/2, y-props.w/2, z-props.w/2)

                    dataArray[x][y].push
                    (
                        <mesh key={x.toString() + y.toString() + z.toString()} position={[x-props.w/2+props.s/2, y-props.w/2+props.s/2, z-props.w/2+props.s/2]}>
                            <boxGeometry args={[props.s,props.s,props.s]} />
                            <meshBasicMaterial attach="material-0" map={x==props.w-1 ? yellow : black}  />  {/* px */}
                            <meshBasicMaterial attach="material-1" map={x==0 ? blue : black}  />            {/* nx */}
                            <meshBasicMaterial attach="material-2" map={y==props.w-1 ? white : black}  />   {/* py */}
                            <meshBasicMaterial attach="material-3" map={y==0 ? orange : black}  />          {/* ny */}
                            <meshBasicMaterial attach="material-4" map={z==props.w-1 ? green : black}  />   {/* pz */}
                            <meshBasicMaterial attach="material-5" map={z==0 ? red : black}  />             {/* nz */}
                        </mesh>
                    )

                }

            }

        }


        setSquares(dataArray.flat())
    }, []);

    useFrame(({}, d)=> {
        boxRef.current.rotation.x += d*0.1;
        boxRef.current.rotation.y += d*0.1;

        
    })

   

    return (
        <group ref={boxRef} position={props.position}>
                {squares}
        </group>
    )
}
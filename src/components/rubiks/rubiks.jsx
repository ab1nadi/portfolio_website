import { useEffect, useRef, useState} from "react";
import React from 'react'
import {useThree, Canvas, useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshBasicMaterial } from "three";
import {getSide, rotateSide} from '../../../lib/rubiks/rotating3dArray'
import { ReactThreeFiber } from "@react-three/fiber";

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
let shuffleStack = []; // holds {side:string, direction:string}
let n_shuffles = 13;
let animation_State = "START";
let speed = 0.9;

function RubiksCube(props)
{

    const boxRef = React.useRef(null);
    const rotGroup = React.useRef(null);

    const [active, setActive] = useState(false);
    const [shuffleAnimation, setShuffleAnimation] = useState(false);

    const state = useThree();
    const [squares, setSquares] = useState([]);
    const [rotSquares, setRotSquares] = useState([]);

    const green = useLoader(TextureLoader, 'green.png');
    const black = useLoader(TextureLoader, 'black.png');
    const blue = useLoader(TextureLoader, 'blue.png');
    const red = useLoader(TextureLoader, 'red.png');
    const orange = useLoader(TextureLoader, 'orange.png');
    const white = useLoader(TextureLoader, 'white.png');
    const yellow = useLoader(TextureLoader, 'yellow.png');


    //array[y][z][x]
    

    useEffect(()=>{
        for(let y = 0; y<props.w; y++)
        {
            dataArray.push([]);
            for(let z = 0; z<props.w; z++)
            {

                dataArray[y].push([]);
                for(let x = 0; x<props.w; x++)
                {

                    dataArray[y][z].push
                    (

                        
                        <mesh key={x.toString() +" "+ y.toString()+ " " + z.toString()} position={[x-props.w/2+props.s/2, y-props.w/2+props.s/2, z-props.w/2+props.s/2]}>
                            <boxGeometry args={[props.s,props.s,props.s]} />
                            <meshBasicMaterial attach="material-0" map={x==props.w-1 ? yellow : black}  />  
                            <meshBasicMaterial attach="material-1" map={x==0 ? blue : black}  />            
                            <meshBasicMaterial attach="material-2" map={y==props.w-1 ? white : black}  />   
                            <meshBasicMaterial attach="material-3" map={y==0 ? orange : black}  />          
                            <meshBasicMaterial attach="material-4" map={z==props.w-1 ? green : black}  />  
                            <meshBasicMaterial attach="material-5" map={z==0 ? red : black}  />            
                        </mesh>
                    )

                }

            }

        }


        setSquares(dataArray.flat())
    }, []);

    // rotate
    // rotates a side of the rubiks
    // cube until it is done
    // returns true when it has finnished rotating the rubiks 
    // cube
    function rotate(c, d)
    {
        let side = c.side
        let direction = c.direction;
        let pin = rotGroup.current;
        switch(side)
        {

            // ROTATE X
            case 0:
            case 1:
                {
                    if(c.target == null)
                        c.target = pin.rotation.x + (direction==1 ? Math.PI/2 : -1*Math.PI/2);

                    pin.rotation.x+= speed* (direction==1 ? d : -1*d);

                    if((direction==1 && pin.rotation.x >= c.target) || (direction==0 && pin.rotation.x<= c.target))
                    {   
                        pin.rotation.x=c.target;
                        return true;
                    };
                }
            break;
            // ROTATE Y
            case 2:
            case 3:
                {   

                    if(c.target == null)
                    c.target = pin.rotation.z + (direction==1 ? Math.PI/2 : -1*Math.PI/2);
                
                    pin.rotation.z+= speed* (direction==1 ? d : -1*d);

                    if((direction==1 && pin.rotation.z >= c.target) || (direction==0 && pin.rotation.z<= c.target))
                    {   
                        pin.rotation.z=c.target;
                        return true;
                    };

                }
            break;
            // ROTATE Z
            case 4:
            case 5:
                {
                    if(c.target == null)
                    c.target = pin.rotation.y + (direction==1 ? Math.PI/2 : -1*Math.PI/2);

                    pin.rotation.y+= speed* (direction==1 ? d : -1*d);

                    if((direction==1 && pin.rotation.y >= c.target) || (direction==0 && pin.rotation.y<= c.target))
                    {   
                        pin.rotation.y=c.target;
                        return true;
                    };
                }
            break;
        }

        return false;
    }

    function runShuffleAnimation(d)
    {
        switch(animation_State)
        {
            case "START":
            {
                animation_State = "FORWARD"
            }
            break;
            case "FORWARD": 
            {
                if(shuffleStack.length == n_shuffles)
                {
                    animation_State = "BACKWARD";
                    return;
                }

                // create a step for the stack
                let side = Math.floor(Math.random()*6);
                let direction = Math.floor(Math.random()*2);
                shuffleStack.push({side:side, direction: direction, targetRot:null});

                // select the elements from the data array so that they can
                // be added to a group and rotated
                let s = getSide(dataArray,side);


                console.log(rotGroup.current)
                console.log("side:", side);

                rotGroup.current.add(s.side);

                console.log("first", dataArray)

                rotateSide(dataArray, side, direction)

                console.log("second", dataArray);


                // do the animation 
                animation_State="FORWARD_ANIMATION";

            }
            break;
            case "FORWARD_ANIMATION": 
            {
                let c = shuffleStack[shuffleStack.length-1];
                if(rotate(c, d))
                    animation_State = "FORWARD";
            }
            break;
            case "BACKWARD":
            {
                
            }
            break;
            case "BACKWARD_ANIMATION":
            {
                
            }
            break;
            case "DONE":
            {

            }
            break;
        }
    }

    useFrame(({}, d)=> {
        boxRef.current.rotation.x += d*0.3;
        boxRef.current.rotation.y += d*0.3;
        
        if(shuffleAnimation)
            runShuffleAnimation(d);
    })



    return (
        <group ref={boxRef} position={props.position} onClick={()=> setShuffleAnimation(true)}>
                {squares}
            <group ref={rotGroup}>
            </group>
        </group>
    )
}
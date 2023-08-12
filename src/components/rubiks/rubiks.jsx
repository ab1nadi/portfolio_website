import { useEffect, useRef, useState} from "react";
import React from 'react'
import {useThree, Canvas, useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshBasicMaterial, BoxGeometry, Mesh, Quaternion, Group } from "three";
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
            <RubiksCube rotationSpeed={0.3} shuffleSpeed={1} w={3} s={1} position = {[0,0,0]}></RubiksCube>
        </Canvas>
    </div>
    );
}




let dataArray = [];
let shuffleStack = []; // holds {side:int, direction:int}
let n_shuffles = 2;
let animation_State = "START";
let speed = 0.9;

let rotGroup = null;

function RubiksCube(props)
{

    const boxRef = React.useRef(null);

    const [active, setActive] = useState(false);
    const [shuffleAnimation, setShuffleAnimation] = useState(false);

    const state = useThree();
    const [squares, setSquares] = useState([]);

    const green = useLoader(TextureLoader, 'green.png');
    const black = useLoader(TextureLoader, 'black.png');
    const blue = useLoader(TextureLoader, 'blue.png');
    const red = useLoader(TextureLoader, 'red.png');
    const orange = useLoader(TextureLoader, 'orange.png');
    const white = useLoader(TextureLoader, 'white.png');
    const yellow = useLoader(TextureLoader, 'yellow.png');


    //array[y][z][x]
    


    useEffect(()=>{


        // create the data array the size we want
        for(let y=0; y<props.w; y++)
        {
            dataArray.push([]);
            for(let z=0; z<props.w; z++)
            {
                dataArray[y].push([]);
                for(let x=0; x<props.w; x++)
                {
                    dataArray[y][z].push(0);
                }
            }
        }
        
        

        for(let x = 0; x<props.w; x++)
        {
            for(let y = 0; y<props.w; y++)
            {
                for(let z = 0; z<props.w; z++)
                {

                    // create the geometry and materials
                    const geometry = new BoxGeometry(props.s, props.s, props.s);
                    const cubeMaterials = [
                        new MeshBasicMaterial({ map: x==props.w-1 ? yellow : black}), //right side
                        new MeshBasicMaterial({ map: x==0 ? blue : black}), //left side
                        new MeshBasicMaterial({ map: y==0 ? white : black}), //top side
                        new MeshBasicMaterial({ map: y==props.w-1? orange : black}), //bottom side
                        new MeshBasicMaterial({ map: z==0? green : black}), //front side
                        new MeshBasicMaterial({ map: z==props.w-1 ? red : black}), //back side
                    ];

                    // create the cube mesh
                    let cube = new Mesh(geometry, cubeMaterials);


                    cube.p=[y,z,x];
                    

                    cube.position.x=x-props.w/2+props.s/2;
                    cube.position.y=-y+props.w/2-props.s/2;
                    cube.position.z=-z+props.w/2-props.s/2;

                    // put it in the array
                    dataArray[y][z][x] = cube;
                }

            }

        }

        boxRef.current.add(...dataArray.flat(3))

        boxRef.current.rotation.x=0.8;
        boxRef.current.rotation.y=0.8;
    }, []);


    function print()
    {
        let string = "";

        string += '[\n';
        dataArray.forEach(y=>{
            string += '\t[\n';
            y.forEach(x=>
                {
                    string += '\t\t[ '
                    x.forEach(e=>
                        {
                            string += JSON.stringify(e.p)+ " ";
                        })
                    string += '], \n '
                })
            string += '\n\t],\n';
        })

        string += ']';

        console.log(string);
    }

    // saveRotations
    // saves the rotations
    // of the rotated group
    function saveRotations()
    {
        let chil = [...rotGroup.children]
		chil.forEach(mesh => 
        {
			boxRef.current.attach(mesh);
			rotGroup.remove(mesh);
        })

    }

    // rotate
    // rotates a side of the rubiks
    // cube until it is done
    // returns true when it has finnished rotating the rubiks 
    // cube
    function rotate(c, d)
    {
        let side = c.side
        let direction = c.direction;
        let pin = rotGroup;
        switch(side)
        {

            // ROTATE left/right
            case 0:
            case 1:
                {
                    if(c.target == null)
                        c.target = pin.rotation.x + (direction ? Math.PI/2 : -1*Math.PI/2);

                    pin.rotation.x+= props.shuffleSpeed* (direction ? d : -1*d);



                    if((direction==1 && pin.rotation.x >= c.target) || (direction==0 && pin.rotation.x<= c.target))
                    {   
                        pin.rotation.x=c.target;

                        saveRotations();
                        return true;
                    } 
                 
                }
            break;
            // ROTATE top/bottom
            case 2:
            case 3:
                {   

                    if(c.target == null)
                    c.target = pin.rotation.y + (direction==1 ? Math.PI/2 : -1*Math.PI/2);
                
                    pin.rotation.y+= props.shuffleSpeed* (direction==1 ? d : -1*d);

                    if((direction==1 && pin.rotation.y >= c.target) || (direction==0 && pin.rotation.y<= c.target))
                    {   
                        pin.rotation.y=c.target;

                        saveRotations();
                        return true;
                    }


                }
            break;
            // ROTATE front/back
            case 4:
            case 5:
                {
                    if(c.target == null)
                        c.target = pin.rotation.z + (direction==1 ? Math.PI/2 : -1*Math.PI/2);

                    pin.rotation.z += props.shuffleSpeed* (direction==1 ? d : -1*d);

                    if((direction==1 && pin.rotation.z >= c.target) || (direction==0 && pin.rotation.z<= c.target))
                    {   
                        pin.rotation.z=c.target;
                        saveRotations();
                        return true;
                    }

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

                if(rotGroup != null)
                    boxRef.current.remove(rotGroup);

                rotGroup = new Group();
                boxRef.current.add(rotGroup);


               

                // create a step for the stack
                let side =  0 //Math.floor(Math.random() *6);
                let direction = 0 + shuffleStack.length > 0 ? 1 : 0; //Math.floor(Math.random() *2);
                shuffleStack.push({side:side, direction: direction, target:null});



                // select the elements from the data array so that they can
                // be added to a group and rotated
                let s = getSide(dataArray,side);
                s.forEach(mesh => rotGroup.attach(mesh));
                rotateSide(dataArray, side, direction)

        
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

                if(shuffleStack.length == 0)
                {
                    animation_State = "DONE"
                    return;
                }

                console.log(JSON.stringify(shuffleStack));

                
                let stackFront = shuffleStack[shuffleStack.length-1];
                stackFront.target=null;
                stackFront.direction = stackFront.direction==1 ? 0 : 1;


                let side = stackFront.side;
                let direction = stackFront.direction;

                // select the elements from the data array so that they can
                // be added to a group and rotated
                let s = getSide(dataArray,side);
                s.forEach(mesh => rotGroup.attach(mesh));
                rotateSide(dataArray, side, direction)


                // do the animation 
                animation_State="BACKWARD_ANIMATION";

            }
            break;
            case "BACKWARD_ANIMATION":
            {
                let c = shuffleStack.pop();
                if(rotate(c, d))
                    animation_State = "BACKWARD";
            }
            break;
            case "DONE":
            {
                setShuffleAnimation(false);
            }
            break;
        }
    }

    useFrame(({}, d)=> {

        boxRef.current.rotation.x+=  d * props.rotationSpeed;
        boxRef.current.rotation.y+= d * props.rotationSpeed;


        if(shuffleAnimation)
            runShuffleAnimation(d);
    })



    return (
        <group ref={boxRef}  dispose={null} position={props.position} onClick={()=> setShuffleAnimation(true)}>
               
        </group>
    )
}
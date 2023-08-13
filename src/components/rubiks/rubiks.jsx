import { useEffect, useRef, useState} from "react";
import React from 'react'
import {useThree, Canvas, useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshBasicMaterial, BoxGeometry, Mesh , Group } from "three";
import {getSide, rotateSide} from '../../../lib/rubiks/rotating3dArray'

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
            <RubiksCube rotationSpeed={0.3} shuffleSpeed={2} w={3} s={1} position = {[0,0,0]}></RubiksCube>
            
        </Canvas>
    </div>
    );
}





function RubiksCube(props)
{

    // some global state
// unfortunately this means i can only spawn one at a time
// I wonder if I can put these inside the function
    let dataArray = useRef([]);
    let shuffleStack = useRef([]); // holds {side:int, direction:int}
    let n_shuffles = useRef(24);
    let animation_State = useRef("START");
    let rotGroup = useRef(null);

    const boxRef = React.useRef(null);
    const [active, setActive] = useState(false);
    const [shuffleAnimation, setShuffleAnimation] = useState(false);
    const threeState = useThree();

    const green = useLoader(TextureLoader, 'green.png');
    const black = useLoader(TextureLoader, 'black.png');
    const blue = useLoader(TextureLoader, 'blue.png');
    const red = useLoader(TextureLoader, 'red.png');
    const orange = useLoader(TextureLoader, 'orange.png');
    const white = useLoader(TextureLoader, 'white.png');
    const yellow = useLoader(TextureLoader, 'yellow.png');


    // sets up the rubiks cube
    // and puts it in a group
    useEffect(()=>{

        for(let y = 0; y<props.w; y++)
        {
            dataArray.current.push([]);
            for(let z = 0; z<props.w; z++)
            {
                dataArray.current[y].push([])
                for(let x = 0; x<props.w; x++)
                {
                    
                    // create the geometry and materials
                    const geometry = new BoxGeometry(props.s, props.s, props.s);
                    const cubeMaterials = [
                        new MeshBasicMaterial({ map: x==props.w-1 ? orange : black}), //right side
                        new MeshBasicMaterial({ map: x==0 ? blue : black}), //left side
                        new MeshBasicMaterial({ map: y==0 ? white : black}), //top side
                        new MeshBasicMaterial({ map: y==props.w-1? yellow : black}), //bottom side
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

                    dataArray.current[y][z].push(cube);
                }

            }

        }

        boxRef.current.add(...dataArray.current.flat(3))

        boxRef.current.rotation.x=0.8;
        boxRef.current.rotation.y=0.8;
    }, []);

    // saveRotations
    // saves the rotations
    // of the rotated group
    function saveRotations()
    {
        let chil = [...rotGroup.current.children]
		chil.forEach(mesh => 
        {
			boxRef.current.attach(mesh);
            rotGroup.current.remove(mesh);
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
        let pin = rotGroup.current;
        switch(side)
        {

            // ROTATE left/right
            case 0:
            case 1:
                {
                    if(c.target == null)
                        c.target = pin.rotation.x + (direction==0 ? Math.PI/2 : -1*Math.PI/2);

                    pin.rotation.x+= props.shuffleSpeed* (direction==0 ? d : -1*d);



                    if((direction==0 && pin.rotation.x >= c.target) || (direction==1 && pin.rotation.x<= c.target))
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

    // runShuffleAnimation
    // basically a state machine
    // that animates the rubiks cube so
    // that it shuffles and unshuffles
    function runShuffleAnimation(d)
    {
        switch(animation_State.current)
        {
            case "START":
            {
                animation_State.current = "FORWARD"
            }
            break;
            case "FORWARD": 
            {
                if(shuffleStack.current.length == n_shuffles.current)
                {
                    animation_State.current = "BACKWARD";
                    return;
                }

                if(rotGroup.current != null)
                    boxRef.current.remove(rotGroup.current);

                rotGroup.current = new Group();
                boxRef.current.add(rotGroup.current);


               

                // create a step for the stack
                let side =  Math.floor(Math.random()*6) //debugStack[shuffleStack.current.length].side;
                let direction = Math.floor(Math.random()*2) //debugStack[shuffleStack.current.length].direction;
                shuffleStack.current.push({side:side, direction: direction, target:null});



                // select the elements from the data array so that they can
                // be added to a group and rotated
                let s = getSide(dataArray.current,side);
                s.forEach(mesh => rotGroup.current.attach(mesh));
                rotateSide(dataArray.current, side, direction)

        
                // do the animation 
                animation_State.current="FORWARD_ANIMATION";

            }
            break;
            case "FORWARD_ANIMATION": 
            {
                let c = shuffleStack.current[shuffleStack.current.length-1];
                if(rotate(c, d))
                    animation_State.current = "FORWARD";
            }
            break;
            case "BACKWARD":
            {

                if(shuffleStack.current.length == 0)
                {
                    animation_State.current = "DONE"
                    return;
                }

                if(rotGroup.current != null)
                    boxRef.current.remove(rotGroup.current);

                rotGroup.current = new Group();
                boxRef.current.add(rotGroup.current);


                // get the top of the stack 
                let top = shuffleStack.current[shuffleStack.current.length-1];

                // update it so that the animation goes backwards
                top.direction = !top.direction;
                top.target = null;
                

                // select the elements from the data array so that they can
                // be added to a group and rotated
                let s = getSide(dataArray.current,top.side);
                s.forEach(mesh => rotGroup.current.attach(mesh));
                rotateSide(dataArray.current, top.side, top.direction)

                
                // do the animation 
                animation_State.current="BACKWARD_ANIMATION";

            }
            break;
            case "BACKWARD_ANIMATION":
            {
                let c = shuffleStack.current[shuffleStack.current.length-1]
                if(rotate(c, d))
                {
                    animation_State.current = "BACKWARD";
                    shuffleStack.current.pop();
                }
            }
            break;
            case "DONE":
            {
                // set it to false
                // so it can be started again if we want
                setShuffleAnimation(faslse);
            }
            break;
        }
    }

    // updates the rubiks cube everyframe
    useFrame(({clock}, d)=> {

        if(active)
        {
            boxRef.current.rotation.x += -threeState.mouse.y/10;
            boxRef.current.rotation.y += threeState.mouse.x/10;
            
        }
        else 
        {
           
            boxRef.current.rotation.x+=  d * props.rotationSpeed;
            boxRef.current.rotation.y+= d * props.rotationSpeed;
        }



        if(shuffleAnimation)
            runShuffleAnimation(d);
    })

    // sets a timeout so that the rubiks cube
    // shuffles after 2 seconds
    useEffect(()=>{
        setTimeout(() => {
            setShuffleAnimation(true);
        }, 2000);
    },[])

    return (
        <group ref={boxRef}  dispose={null} position={props.position} onClick={()=>setActive(!active)}>
        </group>
    )
}
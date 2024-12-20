// rotating3dArray
// a bunch of functions
// for rotating 3d arrays\


/*
[ 
    [   x------>
 y      [x1,x2,x3],     z
 |      [x4,x5,x6]      |
 |      [x7,x8,x9]      |
 V   ],                 V
    [
        [x1,x2,x3],
        [x4,x5,x6]
        [x7,x8,x9]
    ],
    [
        [x1,x2,x3],
        [x4,x5,x6]
        [x7,x8,x9]
    ]
]

*/

export function test()
{
    let testArray = [
                        [
                            [0,1,2,],
                            [3,4,5,],
                            [6,7,8,]

                        ],
                        [
                            [9,10,11,],
                            [12,13,14,],
                            [15,15,17,]
                        ],
                        [
                            [18,19,20,],
                            [21,22,23,],
                            [24,25,26,]
                        ],
                    ]

    printArray(testArray);

    rotateZ(testArray,0,false);


    printArray(testArray);
    
}

// rotateY
// rotates a row of a 3d array around 
// the y axis 90 degrees
export function  rotateY(array,i,dir)
{
    // get the row being worked on
    
    let workedOn = array[i];
    let copy = arrayShallowCopy(workedOn);

    for(let z=0; z<workedOn.length; z++)
    for(let x=0; x<workedOn.length; x++)
    {
        // gotten z
        let gZ;
        let gX;

        // rotate positive radians direction
        if(dir)
        {
            gZ = workedOn.length-x-1;
            gX = z;

        }
        else 
        {
            gZ = x;
            gX = workedOn.length-z-1; 
        }

        workedOn[z][x]=copy[gZ][gX];

    }
    
}

// rotateX
// rotates a row of a 3d array around 
// the x axis 90 degrees
export function rotateX(array,i,dir)
{
    let copy = arrayShallowCopy(array);

    for(let y=0; y<array.length; y++)
    for(let z=0; z<array.length; z++)
    {
        let gY;
        let gZ;

        if(dir)
        {
            gZ = y;
            gY = array.length-z-1;
        }
        else 
        {
            gZ = array.length-y-1;
            gY = z
        }

        array[y][z][i]=copy[gY][gZ][i];
    }
}

// rotateZ
// rotates a row of a 3d array around 
// the  axis 90 degrees
export function rotateZ(array,i,dir)
{
    let copy = arrayShallowCopy(array);

    for(let y=0; y<array.length; y++)
    for(let x=0; x<array.length; x++)
    {
        let gY;
        let gX;

        if(dir)
        {
            gX = array.length-y-1;
            gY = x
        
        }
        else 
        {
            gX = y;
            gY = array.length-x-1;
        }

        array[y][i][x]=copy[gY][i][gX];
    }
}

// arrayShallowCopy
// a cool little function
// that creates a shallow copy of 
// an array, meaning it maintains refs
// using recursion.
export function arrayShallowCopy(array) {
    let arrayCopy = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            arrayCopy.push(arrayShallowCopy(array[i]));
        } else
            arrayCopy.push(array[i]);
    }

    return arrayCopy;
}

export function printArray(array)
{
    let out = "";

    out +="[\n";
    array.forEach(x=>
    {
        out += "\t[\n";

        x.forEach(y=>
        {
            out += "\t\t[ ";

            y.forEach(x=>
            {
                out+=x+", "
            })

            out += "],\n";
        })

        out += "\t],\n";
    })

    out += "]"


    console.log(out);
}

// getSide
// returns a 1 dimensional array
// that is a shallow copy of the 
// elements on a side of a 3d array
export function getSide(array, side)
{

    let arr = [];

    for(let y= 0; y<array.length; y++)
    for(let z= 0; z<array.length; z++)
    for(let x= 0; x<array.length; x++)
    {
        switch(side)
        {
            case 0:
                if(x==0)
                    arr.push(array[y][z][x]);
            break;
            case 1:
                
                if(x==array.length-1)
                    arr.push(array[y][z][x]);
            break;
            case 2:
                if(y==0)
                    arr.push(array[y][z][x]);
            break;
            case 3:
                if(y==array.length-1)
                    arr.push(array[y][z][x]);
            break;
            case 4:
                if(z==0)
                    arr.push(array[y][z][x]);
            break;
            case 5:
                if(z==array.length-1)
                    arr.push(array[y][z][x]);
            break;
        }
        
    }

    return arr

}

// rotateSide
// rotates the side of
// a given array
export function rotateSide(array, side, direction)
{
    switch (side)
    {

        //x
        case 0:
            rotateX(array,0,direction)
        break;
        case 1:
            rotateX(array,2,direction)
        break;

        //y
        case 2:
            rotateY(array,0,direction)
        break;
        case 3:
            rotateY(array,2,direction)
        break;

        //z
        case 4:
            rotateZ(array,0,direction)
        break;
        case 5:
            rotateZ(array,2,direction)
        break;
    }
}




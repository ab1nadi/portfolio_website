export function generateTree(canvas)
{
    console.log("got called ")
    let width = canvas.width;
    let height = canvas.height;
    let ctx = canvas.getContext("2d");
    

    let q_p_x = [600];      // position x
    let q_p_y = [height];   // position y
    let q_w = [100];        // width
    let q_a = [Math.PI/2];  // angle
    let steps = 8;         // how far do we wanna go 
    let current_step = 0;
    let step_sub = 0;       // how much we remove each step;  

    // draw the first stick
    let {x: new_x, y: new_y} = drawStick(ctx,q_p_x.shift(),q_p_y.shift(), q_w, q_a);
    q_p_x.push(new_x);
    q_p_y.push(new_y);

    
    let x_start = new_x;
    let y_start = new_y;



    // while there is stuff in the queues
    while(q_p_x.length > 0)
    {
        let current_x = q_p_x.shift();
        let current_y = q_p_y.shift();
        let current_w = q_w.shift();
        let current_a = q_a.shift();

        let angle_l = Math.PI * Math.floor((Math.random() * 30)+ 10)/180
        let angle_r = Math.PI * Math.floor((Math.random() * 30)+ 10)/180

        console.log(angle_l, angle_r)


        // draw its left
        let {x: left_x,y: left_y} = drawStick(ctx,current_x,current_y, current_w-step_sub, current_a-angle_l);


        if(current_x == x_start && current_y == y_start)
        {
            x_start = left_x;
            y_start = left_y;
            current_step++;

            step_sub = 2.3*current_step;
        }


        // draw its right
        let {x: right_x, y: right_y} = drawStick(ctx,current_x,current_y, current_w-step_sub, current_a+angle_r);



        if(current_step < steps)
        {
            // put it on the stack
            q_p_x.push(left_x);
            q_p_y.push(left_y);
            q_w.push(current_w-step_sub);
            q_a.push(current_a-angle_l);

            q_p_x.push(right_x);
            q_p_y.push(right_y);
            q_w.push(current_w-step_sub);
            q_a.push(current_a+angle_r);
        }


        
    }

}


// drawStick
// draws a stick
// and returns the next position
function drawStick(ctx,x,y,w,a)
{

    let new_y = y-w*Math.sin(a);
    let new_x = x-w*Math.cos(a);

    ctx.moveTo(x, y);
    ctx.lineTo(new_x, new_y);
    ctx.stroke();

    return {x:new_x, y:new_y};
}
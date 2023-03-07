function setup() {
    createCanvas(1000, 1000);
    background(0);
    mass_x = 300;
    mass_y = 300;
    mass_s = 100;

    spring_color = "#f00";
    damper_color = "#0f0";

    draw_wall(mass_x - 100, mass_y + 50, 200);
    draw_mass(mass_x, mass_y);
    draw_damper(100, mass_x - 100, mass_y + 75);
    draw_spring(100, mass_x - 100, mass_y + 25);
    start_button = createButton('Start')
    start_button.position(0, 0)
    start_button.mousePressed(startSim)
    stop_button = createButton('Stop')
    stop_button.position(50, 0)
    stop_button.mousePressed(stopSim)

    rst_button = createButton('Reset')
    rst_button.position(100, 0)
    rst_button.mousePressed(resetSim)

    drawInputText();
    let m_input = createInput('10')
    m_input.position(0, 50)
    m_input.input(updateMass)
    let x0_input = createInput('10')
    x0_input.position(0, 100)
    x0_input.input(updatePos);
    let xd0_input = createInput('0')
    xd0_input.position(0, 150)
    xd0_input.input(updateVel);
    let k_input = createInput('2')
    k_input.position(0, 200)
    k_input.input(updateK);
    let c_input = createInput('0.5')
    c_input.position(0, 250)
    c_input.input(updateC);

    // Simulation stuff
    m = 10; //kg
    k = 2;
    c = 0.5;
    x_0 = 10;
    x_dot0 = 0;
    frameRate(60)
    running = false;


    stroke(0)
    textSize(32);
    fill(255)
    text(x_0.toFixed(2), 400, 500);

}

function drawInputText() {
    stroke(0);
    textSize(24);
    fill(255)
    text("Mass", 0, 40);
    text("x0", 0, 95);
    text("v0", 0, 145);
    text("k", 0, 195);
    text("c", 0, 245);
}


function updateMass() {
    m = this.value()
}


function updateVel() {
    x_dot0 = float(this.value());
}

function updateK() {
    k = float(this.value());
}

function updateC() {
    c = float(this.value());
}
function updatePos() {
    x = this.value();
    background(0);
    draw_wall(mass_x - 100, mass_y, 200);
    draw_mass(mass_x + x * 5, mass_y);
    draw_damper(100 + x * 5, mass_x - 100, mass_y + 75);
    draw_spring(100 + x * 5, mass_x - 100, mass_y + 25);

}

function startSim() {
    running = true;
    x = x_0;
    x_dot = x_dot0;

}

function stopSim() {
    running = false;

}

function resetSim() {

    x = x_0;
    x_dot = x_dot0;
    stopSim();
    background(0);
    draw_wall(mass_x - 100, mass_y, 200);
    draw_mass(mass_x, mass_y);
    draw_damper(100, mass_x - 100, mass_y + 75);
    draw_spring(100, mass_x - 100, mass_y + 25);
}

function simulate(x, x_dot) {
    F_spring = -k * x;
    F_damper = -c * x_dot;
    a = (F_spring + F_damper) / m;
    x_dot = x_dot + a;
    x = x + x_dot;
    return [x, x_dot, F_spring, F_damper, a];
}

function arrow(x, y, t, l, clr) {
    stroke(clr);
    strokeWeight(t);
    line(x, y, x + l, y);
    arrow_height = t;
    arrow_length = t;
    dir = (l > 0) ? 1 : -1;
    triangle(x + l, y - t, x + l, y + t, x + l + t * dir, y);
}

function draw_wall(x, y, h) {
    stroke(255);
    line(x, y - h, x, y + h);
}

function draw_mass(x, y) {
    square(x, y, 100);
}

function draw_damper(l_t, x_offset, y_offset) {

    damp_width = 20;
    damp_height = 20;
    l_t = l_t - damp_height;
    length = 0.5 * l_t;
    stroke(damper_color);
    line(x_offset, y_offset, x_offset + length, y_offset);
    line(x_offset + length, y_offset - damp_width, x_offset + length, y_offset + damp_width);
    line(x_offset + length, y_offset - damp_width, x_offset + length + damp_height, y_offset - damp_width);
    line(x_offset + length, y_offset + damp_width, x_offset + length + damp_height, y_offset + damp_width);
    line(x_offset + length + damp_height,
        y_offset - 0.5 * damp_width,
        x_offset + length + damp_height,
        y_offset + 0.5 * damp_width)
    line(x_offset + length + damp_height, y_offset, x_offset + l_t + damp_height, y_offset)


}
function draw_spring(length, x_offset, y_offset) {
    coils = 9;
    vertical_dist = 20;
    horizontal_dist = length / coils;
    points = [];
    direction = -1;
    for (let c = 0; c <= coils; c++) {
        vect = createVector(horizontal_dist * c, direction * vertical_dist);
        points[c] = vect;
        if (direction == 1) {
            direction = -1;
        } else {
            direction = 1;
        }
    }

    stroke(spring_color);
    for (let l = 0; l < coils; l += 1) {
        line(points[l].x + x_offset, points[l].y + y_offset, points[l + 1].x + x_offset, points[l + 1].y + y_offset);
    }

}

function draw() {

    if (running) {
        sim = simulate(x, x_dot)
        x = sim[0]
        x_dot = sim[1]
        F_spring = sim[2]
        F_damper = sim[3]
        background(0);
        arrow(350, 200, 4, 5 * F_spring, spring_color);
        arrow(350, 250, 2, 100 * F_damper, damper_color);
        strokeWeight(2);
        draw_wall(mass_x - 100, mass_y + 50, 200);
        draw_mass(mass_x + x * 5, mass_y);
        draw_damper(100 + x * 5, mass_x - 100, mass_y + 75);
        draw_spring(100 + x * 5, mass_x - 100, mass_y + 25);
        stroke(0)
        textSize(32);
        fill(255)
        text(x.toFixed(2), 400, 500)

    }
    drawInputText();
    draw_wall(mass_x + 50, mass_y + 50, 200)


}
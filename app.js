const sizes = document.querySelectorAll('.size');

//we will select all the color buttons
const colors = document.querySelectorAll('.color');

//we need to select all the shoe images
const shoes = document.querySelectorAll('.shoe');

//we need to select all the gradients
const gradients = document.querySelectorAll('.gradient');

const shoeBg = document.querySelector('.shoeBackground');

let prevColor = "blue";
let animationEnd = true;


//So when we click a size button, we will remove the class ".active" from all the size buttons, then we will add the class to the size button that we clicked
function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}


function changeColor() {
    if (!animationEnd) return;

    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

    if(color == prevColor) return;
    
    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    document.documentElement.style.setProperty('--primary', primary);

    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');

    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first');
    prevGradient.classList.add('second');

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener('animationend', () => {
        animationEnd =  true;
    })
}


sizes.forEach(size => size.addEventListener('click', changeSize));

//we need first to add the class "active" to the color that we clicked
colors.forEach(c => c.addEventListener('click', changeColor));

//we need to change the shoeBackground element height, in which, its height will be almost the same height of  the shoe
let x = window.matchMedia("(max-width: 1000px)");

//whe we say x.matches, it's like saying: @media(max-width:1000px){}
function changeHeight(){
    if (x.matches) {
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    } 
    else {
        shoeBg.style.height = "475px";
    }
}

changeHeight();

window.addEventListener('resize', changeHeight);

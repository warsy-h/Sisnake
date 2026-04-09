let snakeBody = [];
let snakeXDir = 0;
let snakeYDir = 0;
let foodX;
let foodY;
let grid = 20;
let maxLength = 1; // On commence à 1 pour qu'il grandisse dès le premier carré mangé

let maxCanvasWidth = 600;
let maxCanvasHeight = 600;
let cnv; 


function setup() {
  // style de la page
  document.body.style.backgroundColor = "#050508"; 
  document.body.style.margin = "0";

  // calculer la taille du window du jeu en fonction de la taille de la page
  let w = floor(min(windowWidth, maxCanvasWidth) / grid) * grid;
  let h = floor(min(windowHeight, maxCanvasHeight) / grid) * grid;
  
  cnv = createCanvas(w, h);
  
  // style du window du jeu
  cnv.style('border', '4px solid #ff0096'); 
  cnv.style('box-shadow', '0 0 30px #ff0096'); 
  cnv.style('border-radius', '8px'); 
  
  centerCanvas();
  
  frameRate(10);
  resetGame();
  placeFood();
}

// mettre le window du jeu au centre de la page
function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

// redimensionner le window du jeu quand la taille de la page change
function windowResized() {
  let w = floor(min(windowWidth, maxCanvasWidth) / grid) * grid;
  let h = floor(min(windowHeight, maxCanvasHeight) / grid) * grid;
  resizeCanvas(w, h);
  
  centerCanvas();
  resetGame();
  placeFood();
}

// le carré se place en aléatoire à chaque fois
function placeFood() {
  foodX = floor(random(width / grid)) * grid;
  foodY = floor(random(height / grid)) * grid;
}

// ça dessine le jeu
function draw() {
  background("#1e1e1e"); // background du jeu [cite: 44]

  if (snakeXDir !== 0 || snakeYDir !== 0) {
    let headX = snakeBody[snakeBody.length - 1].x + snakeXDir * grid;
    let headY = snakeBody[snakeBody.length - 1].y + snakeYDir * grid;

    // vérifier les collisions avec les murs 
    if (headX < 0 || headX >= width || headY < 0 || headY >= height) {
      resetGame();
      return;
    }

    // vérifier les collisions avec le corps 
    for (let i = 0; i < snakeBody.length; i++) {
      if (headX === snakeBody[i].x && headY === snakeBody[i].y) {
        resetGame();
        return;
      }
    }

    // ajouter un carré à la queu du serpent à chaque fois qu'il mange un carré 
    snakeBody.push(createVector(headX, headY));

    if (headX === foodX && headY === foodY) {
      placeFood();
      maxLength++; // on augmente la taille autorisée 
    } else {
      // On retire le bout de la queue pour avancer
      if (snakeBody.length > maxLength) {
        snakeBody.shift();
      }
    }
  }

  // le carré que le serpent mange
  fill(255);
  noStroke();
  rect(foodX, foodY, grid, grid);

  // le serpent [cite: 29]
  fill(255, 0, 150);
  for (let i = 0; i < snakeBody.length; i++) {
    rect(snakeBody[i].x, snakeBody[i].y, grid, grid);
  }
}

// les flèches pour contôler le serpent 
function keyPressed() {
  if (keyCode === UP_ARROW && snakeYDir === 0) {
    snakeXDir = 0;
    snakeYDir = -1;
  } else if (keyCode === DOWN_ARROW && snakeYDir === 0) {
    snakeXDir = 0;
    snakeYDir = 1;
  } else if (keyCode === LEFT_ARROW && snakeXDir === 0) {
    snakeXDir = -1;
    snakeYDir = 0;
  } else if (keyCode === RIGHT_ARROW && snakeXDir === 0) {
    snakeXDir = 1;
    snakeYDir = 0;
  }
  return false; // empêche le scroll de la page
}

// rénitialise le jeu quand le serpent meurt 
function resetGame() {
  let startX = floor((width / 2) / grid) * grid;
  let startY = floor((height / 2) / grid) * grid;
  snakeBody = [createVector(startX, startY)];
  snakeXDir = 0;
  snakeYDir = 0;
  // On remet la taille à 1 pour la nouvelle partie
  maxLength = 1; 
}
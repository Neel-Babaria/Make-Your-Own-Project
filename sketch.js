var bgImage
var player1Image,player2Image,player3Image
var alienImage
var gamestate = 1
var wave_end
var ship

function preload(){
  bgImage = loadImage('assets/bgImage.png')
  player1Image = loadImage('assets/ShipStage1.png')
  player2Image = loadImage('assets/ShipStage2.png')
  player3Image = loadImage('assets/ShipStage3.png')
  alienImage = loadImage('assets/Alien.png')
  wave_end = loadImage('assets/WAVE COMPLETED.png')
  playerBulletImage = loadImage('assets/playerBullet.png')
  enemyBulletImage = loadImage('assets/enemyBullet.png')
  blastImage = loadImage('assets/blast.png')
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight)
  game = new Game()
  game.start()
}

function draw() {
  background(bgImage)

  if (gamestate === 1) {
    game.play()
  }

  if (gamestate === 2) {
    game.end()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
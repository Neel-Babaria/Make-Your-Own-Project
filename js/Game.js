class Game {
    constructor() {
        this.wave = 0
        this.positionX = screen.width/2
        this.positionY = screen.height-200
        this.life = 100
        this.score = 0
        this.numberOfAliens = 0
        this.fC = 240
        this.place = [0,50]
        this.positionsX = []
        this.positionsY = []
        this.aliens = new Group()
        this.playerBullets = new Group()
        this.alienBullets = new Group()
    }

    start() {
        ship = createSprite(this.positionX,this.positionY,100,100)
        ship.addImage('ship1', player1Image)
        ship.scale = 0.5

        this.wave = 1
    }

    play() {
        ship.position.x = this.positionX
        ship.position.y = this.positionY
        if (gamestate === 1) {
            this.handleEnemyDeath()
            this.playerControls()
            if (this.numberOfAliens === 0) {
                this.spawnAliens()
            }
            if (frameCount%this.fC === 0) {
                this.enemyShooting()
            }
            if (ship.isTouching(this.alienBullets)) {
                gamestate = 2
            }
        }
        drawSprites()
    }

    playerControls() {
        if (keyIsDown(UP_ARROW) && this.positionY >= 50) {
            this.positionY -= 7.5
        }

        if (keyIsDown(LEFT_ARROW) && this.positionX >= 40) {
            this.positionX -= 7.5
        }

        if (keyIsDown(RIGHT_ARROW) && this.positionX <= screen.width-40) {
            this.positionX += 7.5
        }

        if (keyIsDown(DOWN_ARROW) && this.positionY <= screen.height-150) {
            this.positionY += 7.5
        }

        if (keyIsDown(32)) {
            this.playerShooting()
        }
    }

    spawnAliens() {
        this.numberOfAliens = 0
        for (var i = 0;i < 28;i++) {
            if (this.place[0] >= screen.width-200) {
                this.place = [100,this.place[1]+75]
            }
            else {
                this.place = [this.place[0]+100,this.place[1]]
            }
            this.numberOfAliens += 1
            var enemy = createSprite(this.place[0],this.place[1],100,100)
            enemy.addImage('enemy', alienImage)
            this.aliens.add(enemy)
            enemy.scale = 0.25
            console.log(this.place)
            this.positionsX.push(this.place[0])
            this.positionsY.push(this.place[1])
            drawSprites()
        }
        console.log(this.positionsX)
        console.log(this.positionsY)
    }

    playerShooting() {
        var playerBullet = createSprite(this.positionX,this.positionY,10,10,)
        this.playerBullets.add(playerBullet)
        playerBullet.addImage('bullet', playerBulletImage)
        playerBullet.scale = 0.05
        playerBullet.velocityY -= 9
        playerBullet.lifetime = 70
    }

    enemyShooting() {
        var randomChoice = Math.round(random(0,28))
        var enemyBullet = createSprite(this.positionsX[randomChoice],this.positionsY[randomChoice],10,10)
        this.alienBullets.add(enemyBullet)
        enemyBullet.addImage(enemyBulletImage)
        enemyBullet.scale = 0.05
        enemyBullet.velocityY += 8
        enemyBullet.lifetime = 150
    }

    handleEnemyDeath() {
        this.playerBullets.overlap(this.aliens,function(collector,collected) {
            collected.addImage(blastImage)
            console.log(collected.position.x)
            this.positionsX.splice(collected.position.x/10-1)
            this.numberOfAliens -= 1
            collected.remove()
            collector.remove()
        })
    }
}
input.onButtonPressed(Button.A, function () {
    Player.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.AB, function () {
    if (!(bulletExists)) {
        bulletExists = true
        Bullet = game.createSprite(Player.get(LedSpriteProperty.X), Player.get(LedSpriteProperty.Y))
    }
})
input.onButtonPressed(Button.B, function () {
    Player.change(LedSpriteProperty.X, 1)
})
let Bullet: game.LedSprite = null
let bulletExists = false
let Player: game.LedSprite = null
Player = game.createSprite(2, 4)
let list: game.LedSprite[] = []
let direction = 1
list.push(game.createSprite(2, 0))
list.push(game.createSprite(list[0].get(LedSpriteProperty.X) - 1, 0))
list.push(game.createSprite(list[0].get(LedSpriteProperty.X) + 1, 0))
basic.forever(function () {
    if (bulletExists) {
        Bullet.change(LedSpriteProperty.Y, -1)
        if (Bullet.get(LedSpriteProperty.Y) == 0) {
            Bullet.delete()
            bulletExists = false
        }
    }
    if (list.length > 0) {
        for (let value of list) {
            if (Bullet && value.isTouching(Bullet)) {
                Bullet.delete()
                bulletExists = false
                value.delete()
            } else if (value.isTouching(Player)) {
                game.gameOver()
            }
            if (value.get(LedSpriteProperty.X) == 4 && direction == 1) {
                direction = -1
                for (let value of list) {
                    value.change(LedSpriteProperty.Y, 1)
                }
            } else if (value.get(LedSpriteProperty.X) == 0 && direction == -1) {
                direction = 1
                for (let value of list) {
                    value.change(LedSpriteProperty.Y, 1)
                }
            }
            value.change(LedSpriteProperty.X, direction)
        }
    } else {
        game.addScore(1)
    }
    basic.pause(500)
})

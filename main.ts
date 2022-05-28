function ermittleSieger () {
    sieger = 0
    if (me == 1 && you == 3) {
        sieger = 1
    }
    if (me == 2 && you == 1) {
        sieger = 1
    }
    if (me == 3 && you == 2) {
        sieger = 1
    }
}
function zeigeBild (num: number) {
    if (num == 1) {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    } else if (num == 2) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "score") {
        scorey = value
    } else if (name == "stat") {
        staty = value
    } else if (name == "me") {
        you = value
    }
})
let sieger = 0
let staty = 0
let scorey = 0
let you = 0
let me = 0
radio.setGroup(42)
me = 1
you = 0
let scorem = 0
scorey = 0
let statm = 0
staty = 0
sieger = 0
radio.sendValue("stat", statm)
radio.sendValue("me", me)
radio.sendValue("score", scorem)
basic.forever(function () {
    zeigeBild(me)
    if (statm == 0) {
        if (input.buttonIsPressed(Button.A)) {
            me += 1
            if (me > 3) {
                me = 1
            }
        }
        if (input.buttonIsPressed(Button.B)) {
            radio.sendValue("me", me)
            basic.pause(100)
            statm = 1
            radio.sendValue("stat", statm)
        }
    }
    if (statm == 1 && staty == 1) {
        ermittleSieger()
        scorem += sieger
        radio.sendValue("score", scorem)
        basic.pause(100)
        statm = 2
        radio.sendValue("stat", statm)
    }
    if (statm == 2 && staty == 2) {
        if (sieger == 1) {
            music.playMelody("C - E - G - C5 - ", 120)
        }
    }
})

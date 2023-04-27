//Let's create the rules of this universe
const gameArea = document.querySelector("main");
const gameAreaBounding = gameArea.getBoundingClientRect();
const startGameButton = document.getElementById("start-game");
const speed = 5.3;
const pressedKeys = {
  left: false,
  right: false,
  up: false,
  down: false,
  escape: false,
  i: false,
  o: false,
  p: false,
  n: false,
};
let canMoveLeft = true;
let canMoveRight = true;
let canMoveUp = true;
let canMoveDown = true;
let canAttack = true;
let lastPressedKey;
let game = null;

//Let's now implement the "physics"

startGameButton.addEventListener("click", startGame);
window.addEventListener("keydown", handlePressedKeys);
window.addEventListener("keyup", handleReleasedKeys);
const body = document.querySelector("body");

const bat1 = document.createElement("div");
bat1.classList = "building bat-1";
gameArea.append(bat1);

const bat2 = document.createElement("div");
bat2.classList = "building bat-2";
gameArea.append(bat2);

const bat3 = document.createElement("div");
bat3.classList = "building bat-3";
gameArea.append(bat3);

const bat4 = document.createElement("div");
bat4.classList = "building bat-4";
gameArea.append(bat4);

const bat5 = document.createElement("div");
bat5.classList = "building bat-5";
gameArea.append(bat5);

const bat6 = document.createElement("div");
bat6.classList = "building bat-6";
gameArea.append(bat6);

const bat7 = document.createElement("div");
bat7.classList = "building bat-7";
gameArea.append(bat7);

const bat8 = document.createElement("div");
bat8.classList = "building bat-8";
gameArea.append(bat8);

const bat9 = document.createElement("div");
bat9.classList = "building bat-9";
gameArea.append(bat9);

const bat10 = document.createElement("div");
bat10.classList = "building bat-10";
gameArea.append(bat10);

const bat11 = document.createElement("div");
bat11.classList = "building bat-11";
gameArea.append(bat11);

const bat12 = document.createElement("div");
bat12.classList = "building bat-12";
gameArea.append(bat12);

const bat13 = document.createElement("div");
bat13.classList = "building bat-13";
gameArea.append(bat13);

const parcTop = document.createElement("div");
parcTop.classList = "building parc-top";
gameArea.append(parcTop);

const parcLeft = document.createElement("div");
parcLeft.classList = "building parc-left";
gameArea.append(parcLeft);

const parcRight = document.createElement("div");
parcRight.classList = "building parc-right";
gameArea.append(parcRight);

const parcBottomLeft = document.createElement("div");
parcBottomLeft.classList = "building parc-bottom-left";
gameArea.append(parcBottomLeft);

const parcBottomRight = document.createElement("div");
parcBottomRight.classList = "building parc-bottom-right";
gameArea.append(parcBottomRight);

const topMap = document.createElement("div");
topMap.classList = "building top-map";
gameArea.append(topMap);

const leftMap = document.createElement("div");
leftMap.classList = "building left-map";
gameArea.append(leftMap);

const rightMap = document.createElement("div");
rightMap.classList = "building right-map";
gameArea.append(rightMap);

const bottomMap = document.createElement("div");
bottomMap.classList = "building bottom-map";
gameArea.append(bottomMap);

// let redNpc = document.createElement("div");
// redNpc.classList = "npc red";
// gameArea.append(redNpc);

// let blueNpc = document.createElement("div");
// blueNpc.classList = "npc blue";
// gameArea.append(blueNpc);

// let purpleNpc = document.createElement("div");
// purpleNpc.classList = "npc purple";
// gameArea.append(purpleNpc);

function startGame() {
  new Game();
  startGameButton.remove();
}

function handlePressedKeys(event) {
  switch (event.code) {
    case "ArrowLeft":
      pressedKeys.left = true;
      lastPressedKey = "left";
      break;
    case "ArrowRight":
      pressedKeys.right = true;
      lastPressedKey = "right";
      break;
    case "ArrowUp":
      pressedKeys.up = true;
      lastPressedKey = "up";
      break;
    case "ArrowDown":
      pressedKeys.down = true;
      lastPressedKey = "down";
      break;
    case "KeyA":
      pressedKeys.left = true;
      lastPressedKey = "left";
      break;
    case "KeyD":
      pressedKeys.right = true;
      lastPressedKey = "right";
      break;
    case "KeyW":
      pressedKeys.up = true;
      lastPressedKey = "up";
      break;
    case "KeyS":
      pressedKeys.down = true;
      lastPressedKey = "down";
      break;
    case "Escape":
      pressedKeys.escape = true;
      break;
    case "KeyI":
      pressedKeys.i = true;
      break;
    case "KeyO":
      pressedKeys.o = true;
      break;
    case "KeyP":
      pressedKeys.p = true;
      break;
    case "KeyN":
      pressedKeys.n = true;
      break;
  }
}

function handleReleasedKeys(event) {
  switch (event.code) {
    case "ArrowLeft":
      pressedKeys.left = false;
      lastPressedKey = "left";
      break;
    case "ArrowRight":
      pressedKeys.right = false;
      lastPressedKey = "right";
      break;
    case "ArrowUp":
      pressedKeys.up = false;
      lastPressedKey = "up";
      break;
    case "ArrowDown":
      pressedKeys.down = false;
      lastPressedKey = "down";
      break;
    case "KeyA":
      pressedKeys.left = false;
      lastPressedKey = "left";
      break;
    case "KeyD":
      pressedKeys.right = false;
      lastPressedKey = "right";
      break;
    case "KeyW":
      pressedKeys.up = false;
      lastPressedKey = "up";
      break;
    case "KeyS":
      pressedKeys.down = false;
      lastPressedKey = "down";
      break;
    case "Escape":
      pressedKeys.escape = false;
      lastPressedKey = "escape";
      break;
    case "KeyI":
      pressedKeys.i = false;
      break;
    case "KeyO":
      pressedKeys.o = false;
      break;
    case "KeyP":
      pressedKeys.p = false;
    case "KeyN":
      pressedKeys.n = false;
      break;
  }
}

//Let's now create the classes

//We'll start with the generic

class Character {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  setPosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  receiveDamage(damage) {
    if (this.health <= 0) {
      this.killCharacter();
    } else {
      this.health -= damage;
    }
  }

  killCharacter() {
    this.element.remove();
  }
}

// Let's create our main character !!
class MainCharacter extends Character {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
    this.element = this.createCharacter();
    this.stats = this.createStats();
    this.manaCount = 0;
    for (let i = 0; i < this.health; i++) {
      this.hearts = this.createHeart();
    }
    this.mana = this.createMana();
    this.x = 200;
    this.y = 350;
    this.mainCharacterBounding = this.element.getBoundingClientRect();
    this.setPosition();
  }

  createCharacter() {
    const div = document.createElement("div");
    div.classList = "character main-character down-idle";
    gameArea.append(div);
    return div;
  }

  createStats() {
    const stats = document.createElement("div");
    stats.classList = "stats";
    gameArea.append(stats);
    return stats;
  }

  createHeart() {
    let newHeart = document.createElement("div");
    newHeart.classList = "heart";
    this.stats.append(newHeart);
    return newHeart;
  }

  createMana() {
    let mana = document.createElement("div");
    mana.classList = "mana";
    mana.innerText = `MANA : ${this.manaCount}`;
    this.stats.append(mana);
    return mana;
  }

  updateLife(quantity) {
    for (let i = 0; i < quantity; i++) {
      document.querySelector(".heart").remove();
    }
  }

  updateMana(quantity) {
    this.manaCount += quantity;
    this.mana.innerText = `MANA : ${this.manaCount}`;
  }

  receiveDamage(damage) {
    this.health -= damage;
    this.updateLife(damage);
  }

  animateImage() {
    setInterval(() => {
      let sprite = this.element;
      let currentPositionX = window.getComputedStyle(
        this.element
      ).backgroundPositionX;
      let x = parseInt(currentPositionX);
      x -= 64;
      sprite.style.backgroundPositionX = x + "px";
    }, 125);
  }

  move(direction) {
    switch (direction) {
      case "right":
        if (pressedKeys.n) {
          this.x += speed * 1.7;
        } else {
          this.x += speed;
        }
        break;
      case "left":
        if (pressedKeys.n) {
          this.x += speed * -1.7;
        } else {
          this.x += speed * -1;
        }
        break;
      case "up":
        if (pressedKeys.n) {
          this.y += speed * -1.7;
        } else {
          this.y += speed * -1;
        }
        break;
      case "down":
        if (pressedKeys.n) {
          this.y += speed * 1.7;
        } else {
          this.y += speed;
        }
        break;
    }
    this.setPosition();
  }

  animateMoving(direction) {
    switch (direction) {
      case "right":
        if (canMoveRight) {
          this.element.classList = "character main-character right-side-walk";
        }
        break;
      case "left":
        if (canMoveLeft) {
          this.element.classList = "character main-character left-side-walk";
        }
        break;
      case "up":
        if (canMoveUp) {
          this.element.classList = "character main-character up-walk";
        }
        break;
      case "down":
        if (canMoveDown) {
          this.element.classList = "character main-character down-walk";
        }
        break;
    }
  }

  animateIdle(direction) {
    switch (direction) {
      case "right":
        if (canMoveRight) {
          this.element.classList = "character main-character right-side-idle";
        }
        break;
      case "left":
        if (canMoveLeft) {
          this.element.classList = "character main-character left-side-idle";
        }
        break;
      case "up":
        if (canMoveUp) {
          this.element.classList = "character main-character up-idle";
        }
        break;
      case "down":
        if (canMoveDown) {
          this.element.classList = "character main-character down-idle";
        }
        break;
    }
  }

  attackFire() {
    if (canAttack && this.manaCount >= 18) {
      canMoveLeft = false;
      canMoveRight = false;
      canMoveUp = false;
      canMoveDown = false;
      canAttack = false;
      const divAttack = document.createElement("div");
      divAttack.classList = "attack";
      let x = this.x,
        y = this.y;
      let main = document.querySelector("main");
      if (lastPressedKey === "right") {
        this.element.classList = "character main-character attack-right";
        x += 60;
        y += 10;
      }
      if (lastPressedKey === "left") {
        this.element.classList = "character main-character attack-left";
        x -= 40;
        y += 10;
      }
      if (lastPressedKey === "down") {
        this.element.classList = "character main-character attack-down";
        y += 45;
        x += 12;
      }
      if (lastPressedKey === "up") {
        this.element.classList = "character main-character attack-up";
        y -= 35;
        x += 12;
      }
      divAttack.style.left = x + "px";
      divAttack.style.top = y + "px";
      main.append(divAttack);
      this.updateMana(-18);

      setInterval(() => {
        let sprite = divAttack;
        let currentPositionX =
          window.getComputedStyle(divAttack).backgroundPositionX;
        let posX = parseInt(currentPositionX);
        posX -= 40;
        sprite.style.backgroundPositionX = posX + "px";
      }, 50);

      setTimeout(() => {
        canMoveLeft = true;
        canMoveRight = true;
        canMoveUp = true;
        canMoveDown = true;
        canAttack = true;
      }, 900);

      setTimeout(() => {
        divAttack.remove();
      }, 3800);
      return divAttack;
    }
  }

  attackLightning() {
    if (canAttack && this.manaCount >= 40) {
      canMoveLeft = false;
      canMoveRight = false;
      canMoveUp = false;
      canMoveDown = false;
      canAttack = false;
      const divAttack = document.createElement("div");
      divAttack.classList = "attack-lightning";
      let x = this.x,
        y = this.y;
      let main = document.querySelector("main");
      if (lastPressedKey === "right") {
        this.element.classList = "character main-character attack-right";
        x += 60;
        y += -570;
      }
      if (lastPressedKey === "left") {
        this.element.classList = "character main-character attack-left";
        x -= 150;
        y += -570;
      }
      if (lastPressedKey === "down") {
        this.element.classList = "character main-character attack-down";
        y += -490;
        x += -45;
      }
      if (lastPressedKey === "up") {
        this.element.classList = "character main-character attack-up";
        y -= 650;
        x += -45;
      }
      divAttack.style.left = x + "px";
      divAttack.style.top = y + "px";
      main.append(divAttack);
      this.updateMana(-40);

      setInterval(() => {
        let sprite = divAttack;
        let currentPositionX =
          window.getComputedStyle(divAttack).backgroundPositionX;
        let posX = parseInt(currentPositionX);
        posX -= 145;
        sprite.style.backgroundPositionX = posX + "px";
      }, 50);

      setTimeout(() => {
        canMoveLeft = true;
        canMoveRight = true;
        canMoveUp = true;
        canMoveDown = true;
        canAttack = true;
      }, 2100);

      setTimeout(() => {
        divAttack.remove();
      }, 2400);
      return divAttack;
    }
  }

  attackIce() {
    if (canAttack) {
      canMoveLeft = false;
      canMoveRight = false;
      canMoveUp = false;
      canMoveDown = false;
      canAttack = false;
      const divAttack = document.createElement("div");
      divAttack.classList = "attack-ice";
      let x = this.x,
        y = this.y;
      let main = document.querySelector("main");
      if (lastPressedKey === "right") {
        this.element.classList = "character main-character attack-right";
        x += 60;
        y += 10;
      }
      if (lastPressedKey === "left") {
        this.element.classList = "character main-character attack-left";
        x -= 40;
        y += 10;
      }
      if (lastPressedKey === "down") {
        this.element.classList = "character main-character attack-down";
        y += 45;
        x += 12;
      }
      if (lastPressedKey === "up") {
        this.element.classList = "character main-character attack-up";
        y -= 35;
        x += 12;
      }
      divAttack.style.left = x + "px";
      divAttack.style.top = y + "px";
      main.append(divAttack);

      setInterval(() => {
        let sprite = divAttack;
        let currentPositionX =
          window.getComputedStyle(divAttack).backgroundPositionX;
        let posX = parseInt(currentPositionX);
        posX -= 51;
        sprite.style.backgroundPositionX = posX + "px";
      }, 50);

      setTimeout(() => {
        canMoveLeft = true;
        canMoveRight = true;
        canMoveUp = true;
        canMoveDown = true;
        canAttack = true;
      }, 250);

      setTimeout(() => {
        divAttack.remove();
      }, 500);
      return divAttack;
    }
  }
}

// Let's create the ennemies class !
class Ennemy extends Character {
  constructor(health, strength) {
    super(health, strength);
    this.element = this.createCharacter();
    this.x = gameArea.clientWidth * Math.random();
    this.y = gameArea.clientHeight * Math.random();
    this.direction = { x: 1, y: 1 };
    this.setPosition();
    this.canDealDamage = true;
    this.canReceiveDamage = true;
  }

  createCharacter() {
    const div = document.createElement("div");
    div.classList = "character ennemy down-idle";
    gameArea.append(div);
    return div;
  }

  animateImage() {
    setInterval(() => {
      let sprite = this.element;
      let currentPositionX = window.getComputedStyle(
        this.element
      ).backgroundPositionX;
      let x = parseInt(currentPositionX);
      x -= 256;
      sprite.style.backgroundPositionX = x + "px";
    }, 85);
  }

  animateMoving(direction) {
    switch (direction) {
      case "right":
        this.element.classList = "character ennemy right-side-walk";
        break;
      case "left":
        this.element.classList = "character ennemy left-side-walk";
        break;
      case "up":
        this.element.classList = "character ennemy up-walk";
        break;
      case "down":
        this.element.classList = "character ennemy down-walk";
        break;
    }
  }

  move() {
    const mainCharacter = document.querySelector(".main-character");
    if (
      mainCharacter.getBoundingClientRect().top - 5 <
        this.element.getBoundingClientRect().top <
        mainCharacter.getBoundingClientRect().top + 5 ||
      mainCharacter.getBoundingClientRect().bottom - 5 <
        this.element.getBoundingClientRect().bottom <
        mainCharacter.getBoundingClientRect().bottom + 5
    ) {
      this.direction.y = 0;
    }

    if (
      mainCharacter.getBoundingClientRect().left - 100 <
        this.element.getBoundingClientRect().left <
        mainCharacter.getBoundingClientRect().left + 100 ||
      mainCharacter.getBoundingClientRect().right - 100 <
        this.element.getBoundingClientRect().right <
        mainCharacter.getBoundingClientRect().right + 100
    ) {
      this.direction.x = 0;
    }

    if (
      this.element.getBoundingClientRect().right >
      mainCharacter.getBoundingClientRect().right + 101
    ) {
      this.direction.x = -1;
      this.animateMoving("left");
    }
    if (
      this.element.getBoundingClientRect().left <
      mainCharacter.getBoundingClientRect().left - 101
    ) {
      this.direction.x = 1;
      this.animateMoving("right");
    }
    if (
      this.element.getBoundingClientRect().top <
      mainCharacter.getBoundingClientRect().top - 101
    ) {
      this.direction.y = 1;
      this.animateMoving("down");
    }
    if (
      this.element.getBoundingClientRect().bottom >
      mainCharacter.getBoundingClientRect().bottom + 101
    ) {
      this.direction.y = -1;
      this.animateMoving("up");
    }
    this.x += 1 * this.direction.x * (speed - 0.5);
    this.y += 1 * this.direction.y * (speed - 0.5);
    this.setPosition();
  }

  animateEnnemyAttack() {
    if (this.element.classList.contains("up-walk")) {
      this.element.className = "ennemy attack-up";
    }
    if (this.element.classList.contains("down-walk")) {
      this.element.className = "ennemy attack-down";
    }
    if (this.element.classList.contains("left-side-walk")) {
      this.element.className = "ennemy attack-left";
    }
    if (this.element.classList.contains("right-side-walk")) {
      this.element.className = "ennemy attack-right";
    }
  }

  killCharacter() {
    this.element.classList = "ennemy dying";
    setTimeout(() => {
      this.element.remove();
    }, 900);
  }
}

class Mob extends Character {
  constructor(health, strength) {
    super(health, strength);
    this.element = this.createCharacter();
    this.x = gameArea.clientWidth * Math.random();
    this.y = gameArea.clientHeight * Math.random();
    this.direction = { x: 1, y: 1 };
    this.setPosition();
    this.canDealDamage = true;
    this.canReceiveDamage = true;
  }

  createCharacter() {
    const div = document.createElement("div");
    div.classList = "character mob down-idle";
    gameArea.append(div);
    return div;
  }

  animateImage() {
    setInterval(() => {
      let sprite = this.element;
      let currentPositionX = window.getComputedStyle(
        this.element
      ).backgroundPositionX;
      let x = parseInt(currentPositionX);
      x -= 64;
      sprite.style.backgroundPositionX = x + "px";
    }, 85);
  }

  canMobMove(direction) {
    const buildings = document.querySelectorAll(".building");
    for (const build of buildings) {
      const buildingBounding = build.getBoundingClientRect();
      const mobBounding = this.element.getBoundingClientRect();
      const isInX =
        mobBounding.right - 20 > buildingBounding.left &&
        mobBounding.left + 20 < buildingBounding.right;
      const isInY =
        mobBounding.bottom - 18 > buildingBounding.top &&
        mobBounding.top + 50 < buildingBounding.bottom;
      if (isInX && isInY) {
        switch (direction) {
          case "up":
            this.y += 20;
            break;
          case "right":
            this.x -= 20;
            break;
          case "left":
            this.x += 20;
            break;
          case "down":
            this.y -= 20;
            break;
        }
        this.setPosition();
        return false;
      }

      return true;
    }
  }

  move() {
    const mainCharacter = document.querySelector(".main-character");
    if (
      mainCharacter.getBoundingClientRect().top - 5 <
        this.element.getBoundingClientRect().top <
        mainCharacter.getBoundingClientRect().top + 5 ||
      mainCharacter.getBoundingClientRect().bottom - 5 <
        this.element.getBoundingClientRect().bottom <
        mainCharacter.getBoundingClientRect().bottom + 5
    ) {
      this.direction.y = 0;
    }

    if (
      mainCharacter.getBoundingClientRect().left - 5 <
        this.element.getBoundingClientRect().left <
        mainCharacter.getBoundingClientRect().left + 5 ||
      mainCharacter.getBoundingClientRect().right - 5 <
        this.element.getBoundingClientRect().right <
        mainCharacter.getBoundingClientRect().right + 5
    ) {
      this.direction.x = 0;
    }

    if (
      this.element.getBoundingClientRect().right >
        mainCharacter.getBoundingClientRect().right + 5 &&
      this.canMobMove("left")
    ) {
      this.direction.x = -1;
      this.animateMoving("left");
    }
    if (
      this.element.getBoundingClientRect().left <
        mainCharacter.getBoundingClientRect().left - 5 &&
      this.canMobMove("right")
    ) {
      this.direction.x = 1;
      this.animateMoving("right");
    }
    if (
      this.element.getBoundingClientRect().top <
        mainCharacter.getBoundingClientRect().top - 5 &&
      this.canMobMove("down")
    ) {
      this.direction.y = 1;
      this.animateMoving("down");
    }
    if (
      this.element.getBoundingClientRect().bottom >
        mainCharacter.getBoundingClientRect().bottom + 5 &&
      this.canMobMove("up")
    ) {
      this.direction.y = -1;
      this.animateMoving("up");
    }
    this.x += 1 * this.direction.x * speed;
    this.y += 1 * this.direction.y * speed;
    this.setPosition();
  }

  animateMoving(direction) {
    switch (direction) {
      case "right":
        this.element.classList = "character mob right-side-walk";
        break;
      case "left":
        this.element.classList = "character mob left-side-walk";
        break;
      case "up":
        this.element.classList = "character mob up-walk";
        break;
      case "down":
        this.element.classList = "character mob down-walk";
        break;
    }
  }

  animateEnnemyAttack() {
    if (this.element.classList.contains("up-walk")) {
      this.element.classList = "mob attack-up";
    }
    if (this.element.classList.contains("down-walk")) {
      this.element.classList = "mob attack-down";
    }
    if (this.element.classList.contains("left-side-walk")) {
      this.element.classList = "mob attack-left";
    }
    if (this.element.classList.contains("right-side-walk")) {
      this.element.classList = "mob attack-right";
    }
  }

  killCharacter() {
    this.element.classList = "mob dying";
    setTimeout(() => {
      this.element.remove();
    }, 900);
  }
}

//Now, we'll put in some NPCs that'll be responsible for the powers of my character
class Npc {
  constructor(color) {
    this.color = color;
    this.element = this.createElement();
    // this.handleColor();
  }

  createElement() {
    const npc = document.createElement("div");
    npc.className = this.color;
    gameArea.append(npc);
    return npc;
  }

  // handleColor() {
  //   if (this.color === "red") {
  //     this.element.classList = "red";
  //   }
  //   if (this.element.color === "blue") {
  //     this.element.classList = "blue";
  //   }
  //   if (this.element.color === "purple") {
  //     this.element.classList = "purple";
  //   }
  // }

  animateImage() {
    setInterval(() => {
      let sprite = this.element;
      let currentPositionX = window.getComputedStyle(
        this.element
      ).backgroundPositionX;
      let x = parseInt(currentPositionX);
      x -= 64;
      sprite.style.backgroundPositionX = x + "px";
    }, 50);
  }
}

//Let's launch the game !!
class Game {
  constructor() {
    this.mainCharacter = new MainCharacter("Philippe", 11, 3);
    this.intervalId = null;
    this.ennemies = [
      // new Ennemy(150, 2),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
      // new Ennemy(1, 1),
    ];
    this.mobs = [
      // new Mob(5, 0),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
      // new Mob(5, 1),
    ];
    this.npcs = [new Npc("blue"), new Npc("red"), new Npc("purple")];
    this.animate();
    this.mainCharacter.animateImage();
    for (const ennemy of this.ennemies) {
      ennemy.animateImage();
    }
    for (const mob of this.mobs) {
      mob.animateImage();
    }
    for (const npc of this.npcs) {
      npc.animateImage();
    }

    // setInterval(() => {
    //   this.pause();
    //   // this.resume();
    // }, 1);
  }

  //Let's establish the scrolling system

  moveBackground(direction) {
    let main = document.querySelector("main");
    let x = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--x-position"
      )
    );
    let y = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--y-position"
      )
    );
    switch (direction) {
      case "left":
        if (pressedKeys.n) {
          x += speed * 1.7;
        } else {
          x += speed;
        }
        document.documentElement.style.setProperty("--x-position", x + "px");
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        for (const mob of this.mobs) {
          mob.canDealDamage = false;
          setTimeout(() => {
            mob.canDealDamage = true;
          }, 1000);
        }
        break;
      case "right":
        if (pressedKeys.n) {
          x -= speed * 1.7;
        } else {
          x -= speed;
        }
        document.documentElement.style.setProperty("--x-position", x + "px");
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        for (const mob of this.mobs) {
          mob.canDealDamage = false;
          setTimeout(() => {
            mob.canDealDamage = true;
          }, 1000);
        }
        break;
      case "up":
        if (pressedKeys.n) {
          y += speed * 1.7;
        } else {
          y += speed;
        }
        document.documentElement.style.setProperty("--y-position", y + "px");
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        for (const mob of this.mobs) {
          mob.canDealDamage = false;
          setTimeout(() => {
            mob.canDealDamage = true;
          }, 1000);
        }
        break;
      case "down":
        if (pressedKeys.n) {
          y -= speed * 1.7;
        } else {
          y -= speed;
        }
        document.documentElement.style.setProperty("--y-position", y + "px");
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        for (const mob of this.mobs) {
          mob.canDealDamage = false;
          setTimeout(() => {
            mob.canDealDamage = true;
          }, 1000);
        }
        break;
    }
  }

  canMove(direction) {
    const buildings = document.querySelectorAll(".building");
    for (const build of buildings) {
      const buildingBounding = build.getBoundingClientRect();
      const mainBounding = this.mainCharacter.element.getBoundingClientRect();
      const isInX =
        mainBounding.right - 20 > buildingBounding.left &&
        mainBounding.left + 20 < buildingBounding.right;
      const isInY =
        mainBounding.bottom - 18 > buildingBounding.top &&
        mainBounding.top + 50 < buildingBounding.bottom;
      if (isInX && isInY) {
        switch (direction) {
          case "up":
            this.mainCharacter.y += 15;
            break;
          case "right":
            this.mainCharacter.x -= 15;
            break;
          case "left":
            this.mainCharacter.x += 15;
            break;
          case "down":
            this.mainCharacter.y -= 15;
            break;
        }
        this.mainCharacter.setPosition();
        return false;
      }
    }
    return true;
  }

  //The game interval

  animate() {
    this.intervalId = setInterval(() => {
      const characterRect = this.mainCharacter.element.getBoundingClientRect();
      // this.checkIfWin();
      this.checkIfEndGame();
      if (pressedKeys.right && this.canMove("right")) {
        if (characterRect.right >= 1600) {
          this.mainCharacter.animateMoving("right");
          this.moveBackground("right");
        } else {
          this.mainCharacter.move("right");
          this.mainCharacter.animateMoving("right");
        }
      }
      if (pressedKeys.left && this.canMove("left")) {
        if (characterRect.left <= 300) {
          this.mainCharacter.animateMoving("left");
          this.moveBackground("left");
        } else {
          this.mainCharacter.move("left");
          this.mainCharacter.animateMoving("left");
        }
      }
      if (pressedKeys.up && this.canMove("up")) {
        if (characterRect.top <= 200) {
          this.mainCharacter.animateMoving("up");
          this.moveBackground("up");
        } else {
          this.mainCharacter.move("up");
          this.mainCharacter.animateMoving("up");
        }
      }
      if (pressedKeys.down && this.canMove("down")) {
        if (characterRect.bottom >= 800) {
          this.mainCharacter.animateMoving("down");
          this.moveBackground("down");
        } else {
          this.mainCharacter.move("down");
          this.mainCharacter.animateMoving("down");
        }
      }
      const noKeysPressed = Object.values(pressedKeys).every(
        (v) => v === false
      );
      const directions = ["right", "up", "down", "left"];
      for (const direction of directions) {
        if (lastPressedKey === direction && noKeysPressed) {
          this.mainCharacter.animateIdle(direction);
        }
      }
      if (pressedKeys.i) {
        this.mainCharacter.attackIce();
      }
      if (pressedKeys.p) {
        this.mainCharacter.attackLightning();
      }
      if (pressedKeys.o) {
        this.mainCharacter.attackFire();
      }

      for (const ennemy of this.ennemies) {
        if (ennemy.canDealDamage && this.moveBackground) {
          ennemy.move();
        }

        if (this.collisionDetection(ennemy)) {
          if (ennemy.canDealDamage) {
            this.onCollision(ennemy);
          } else {
            return;
          }
        }
        if (this.attackFireCollisionDetection(ennemy)) {
          this.onAttackFireCollision(ennemy);
        }
        if (this.attackLightningCollisionDetection(ennemy)) {
          this.onAttackLightningCollision(ennemy);
        }
        if (this.attackIceCollisionDetection(ennemy)) {
          this.onAttackIceCollision(ennemy);
        }
      }

      for (const ennemy of this.mobs) {
        if (ennemy.canDealDamage) {
          ennemy.move();
        }

        if (this.mobCollisionDetection(ennemy)) {
          if (ennemy.canDealDamage) {
            this.onCollision(ennemy);
          } else {
            return;
          }
        }
        if (this.attackFireMobCollisionDetection(ennemy)) {
          this.onAttackFireCollision(ennemy);
        }
        if (this.attackLightningMobCollisionDetection(ennemy)) {
          this.onAttackLightningCollision(ennemy);
        }
        if (this.attackIceMobCollisionDetection(ennemy)) {
          this.onAttackIceCollision(ennemy);
        }
      }
      // if (this.buildingCollisionsDetection()) {
      //   this.onBuildingCollision();
      // }
    }, 1000 / 60);
  }

  //The functions for when the ennemies attack !!

  collisionDetection(ennemy) {
    if (ennemy.canDealDamage) {
      const ennemyBounding = ennemy.element.getBoundingClientRect();
      const mainBounding = this.mainCharacter.element.getBoundingClientRect();
      const isInX =
        ennemyBounding.left < mainBounding.right - 80 &&
        ennemyBounding.right > mainBounding.left + 80;
      const isInY =
        ennemyBounding.bottom > mainBounding.top + 60 &&
        ennemyBounding.top < mainBounding.bottom - 60;
      if (isInX && isInY) {
        return true;
      }
    } else {
      return;
    }
  }

  mobCollisionDetection(ennemy) {
    if (ennemy.canDealDamage) {
      const ennemyBounding = ennemy.element.getBoundingClientRect();
      const mainBounding = this.mainCharacter.element.getBoundingClientRect();
      const isInX =
        ennemyBounding.left < mainBounding.right - 30 &&
        ennemyBounding.right > mainBounding.left + 30;
      const isInY =
        ennemyBounding.bottom > mainBounding.top + 30 &&
        ennemyBounding.top < mainBounding.bottom - 30;
      if (isInX && isInY) {
        return true;
      }
    } else {
      return;
    }
  }

  onCollision(ennemy) {
    if (ennemy.canDealDamage) {
      ennemy.animateEnnemyAttack();
      this.mainCharacter.receiveDamage(ennemy.strength);
      ennemy.canDealDamage = false;
      setTimeout(() => {
        ennemy.canDealDamage = true;
      }, 3500);
    } else {
      return;
    }
  }

  //The functions for when the main character attack !!

  attackFireCollisionDetection(ennemy) {
    const ennemyBounding = ennemy.element.getBoundingClientRect();
    const attack = document.querySelector(".attack");
    if (!attack) {
      return;
    }
    const attackBounding = attack.getBoundingClientRect();
    const isInX =
      ennemyBounding.left < attackBounding.right - 100 &&
      ennemyBounding.right > attackBounding.left + 100;
    const isInY =
      ennemyBounding.bottom > attackBounding.top + 80 &&
      ennemyBounding.top < attackBounding.bottom - 80;
    if (isInX && isInY) {
      return true;
    }
  }

  attackFireMobCollisionDetection(ennemy) {
    const ennemyBounding = ennemy.element.getBoundingClientRect();
    const attack = document.querySelector(".attack");
    if (!attack) {
      return;
    }
    const attackBounding = attack.getBoundingClientRect();
    const isInX =
      ennemyBounding.left < attackBounding.right &&
      ennemyBounding.right > attackBounding.left;
    const isInY =
      ennemyBounding.bottom > attackBounding.top &&
      ennemyBounding.top < attackBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  onAttackFireCollision(ennemy) {
    if (ennemy.canReceiveDamage) {
      ennemy.canReceiveDamage = false;
      ennemy.canDealDamage = false;
      ennemy.receiveDamage(this.mainCharacter.strength * 3);
      setTimeout(() => {
        ennemy.canDealDamage = true;
        ennemy.canReceiveDamage = true;
      }, 2500);
    }
  }

  attackLightningCollisionDetection(ennemy) {
    const ennemyBounding = ennemy.element.getBoundingClientRect();
    const attack = document.querySelector(".attack-lightning");
    if (!attack) {
      return;
    }
    const attackBounding = attack.getBoundingClientRect();
    const isInX =
      ennemyBounding.left < attackBounding.right - 100 &&
      ennemyBounding.right > attackBounding.left + 100;
    const isInY =
      ennemyBounding.bottom > attackBounding.top + 80 &&
      ennemyBounding.top < attackBounding.bottom - 80;
    if (isInX && isInY) {
      return true;
    }
  }

  attackLightningMobCollisionDetection(ennemy) {
    const ennemyBounding = ennemy.element.getBoundingClientRect();
    const attack = document.querySelector(".attack-lightning");
    if (!attack) {
      return;
    }
    const attackBounding = attack.getBoundingClientRect();
    const isInX =
      ennemyBounding.left < attackBounding.right &&
      ennemyBounding.right > attackBounding.left;
    const isInY =
      ennemyBounding.bottom > attackBounding.top &&
      ennemyBounding.top < attackBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  onAttackLightningCollision(ennemy) {
    if (ennemy.canReceiveDamage) {
      ennemy.canReceiveDamage = false;
      ennemy.canDealDamage = false;
      ennemy.receiveDamage(this.mainCharacter.strength * 20);
      setTimeout(() => {
        ennemy.canDealDamage = true;
        ennemy.canReceiveDamage = true;
      }, 4500);
    }
  }

  attackIceCollisionDetection(ennemy) {
    const ennemyBounding = ennemy.element.getBoundingClientRect();
    const attack = document.querySelector(".attack-ice");
    if (!attack) {
      return;
    }
    const attackBounding = attack.getBoundingClientRect();
    const isInX =
      ennemyBounding.left < attackBounding.right - 100 &&
      ennemyBounding.right > attackBounding.left + 100;
    const isInY =
      ennemyBounding.bottom > attackBounding.top + 80 &&
      ennemyBounding.top < attackBounding.bottom - 80;
    if (isInX && isInY) {
      return true;
    }
  }

  attackIceMobCollisionDetection(ennemy) {
    const ennemyBounding = ennemy.element.getBoundingClientRect();
    const attack = document.querySelector(".attack-ice");
    if (!attack) {
      return;
    }
    const attackBounding = attack.getBoundingClientRect();
    const isInX =
      ennemyBounding.left < attackBounding.right &&
      ennemyBounding.right > attackBounding.left;
    const isInY =
      ennemyBounding.bottom > attackBounding.top &&
      ennemyBounding.top < attackBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  onAttackIceCollision(ennemy) {
    if (ennemy.canReceiveDamage) {
      this.mainCharacter.updateMana(5);
      ennemy.canReceiveDamage = false;
      ennemy.canDealDamage = false;
      ennemy.receiveDamage(this.mainCharacter.strength);
      setTimeout(() => {
        ennemy.canDealDamage = true;
        ennemy.canReceiveDamage = true;
      }, 1500);
    }
  }

  //The function for the end of the game.

  checkIfWin() {
    let arrayOfEnnemies = document.querySelectorAll(".ennemy");
    let arrayOfMobs = document.querySelectorAll(".mob");
    if (arrayOfEnnemies.length === 0 && arrayOfMobs.length === 0) {
      this.winGame();
    }
  }

  checkIfEndGame() {
    if (this.mainCharacter.health <= 0) {
      this.endGame();
    }
  }

  winGame() {
    clearInterval(this.intervalId);
    let winScreen = document.createElement("div");
    winScreen.id = "win-game";
    let winH1 = document.createElement("h1");
    winH1.textContent = "You win ! Let me suck your dick !";
    winScreen.append(winH1);
    let goAgain = document.createElement("button");
    goAgain.id = "go-again";
    goAgain.textContent = "Wanna go again ?";
    winScreen.append(goAgain);
    let main = document.querySelector("main");
    main.append(winScreen);

    this.mainCharacter.element.remove();

    for (const ennemy of this.ennemies) {
      ennemy.element.remove();
    }
    for (const mob of this.mobs) {
      mob.element.remove();
    }

    function restartGame() {
      location.reload();
    }
    let goAgainButton = document.getElementById("go-again");
    goAgainButton.addEventListener("click", restartGame);
  }

  endGame() {
    clearInterval(this.intervalId);
    let finalScreen = document.createElement("div");
    finalScreen.id = "end-game";
    let endH1 = document.createElement("h1");
    endH1.textContent = "You died.";
    finalScreen.append(endH1);
    let retry = document.createElement("button");
    retry.id = "restart";
    retry.textContent = "Try again ?";
    finalScreen.append(retry);
    let main = document.querySelector("main");
    main.append(finalScreen);

    this.mainCharacter.element.remove();
    for (const ennemy of this.ennemies) {
      ennemy.element.remove();
    }
    for (const mob of this.mobs) {
      mob.element.remove();
    }

    function restartGame() {
      location.reload();
    }
    let restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", restartGame);
  }

  // pause() {
  //   if (isRunning) {
  //     if (pressedKeys.escape) {
  //       isRunning = false;
  //       clearInterval(this.intervalId);
  //       let pauseScreen = document.createElement("div");
  //       pauseScreen.id = "pause-game";
  //       let pauseH1 = document.createElement("h1");
  //       pauseH1.textContent = "Game Paused";
  //       pauseScreen.append(pauseH1);
  //       let resume = document.createElement("button");
  //       resume.id = "resume";
  //       resume.textContent = "Resume";
  //       pauseScreen.append(resume);
  //       let main = document.querySelector("main");
  //       main.append(pauseScreen);

  //       function resumeGame() {
  //         isRunning = true;
  //         let intervalId = setInterval(() => {
  //           if (pressedKeys.right) {
  //             this.mainCharacter.move("right");
  //           }
  //           if (pressedKeys.left) {
  //             this.mainCharacter.move("left");
  //           }
  //           if (pressedKeys.up) {
  //             this.mainCharacter.move("up");
  //           }
  //           if (pressedKeys.down) {
  //             this.mainCharacter.move("down");
  //           }
  //           if (canDealDamage) {
  //             this.ennemy.move();
  //           }
  //           // this.ennemy03.move();
  //           // this.ennemy02.move();

  //           if (this.collisionDetection()) {
  //             this.onCollision();
  //           }
  //           if (this.mainCharacter.health <= 0) {
  //             this.endGame();
  //           }
  //         }, 1000 / 60);
  //       }
  //       let resumeButton = document.getElementById("resume");
  //       resumeButton.addEventListener("click", resumeGame);
  //     }
  //   }
  // }

  // resume() {
  //   if (!isRunning) {
  //     if (pressedKeys.escape) {
  //       isRunning = true;
  //       this.animate();
  //     }
  //   }
  // }
}

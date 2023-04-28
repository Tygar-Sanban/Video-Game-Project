//Let's create the rules of this universe
const gameArea = document.querySelector("main");
const gameAreaBounding = gameArea.getBoundingClientRect();
const startGameButton = document.getElementById("start-game");
const speed = 1.3;
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
let canOpenBlueChat = true;
let canOpenRedChat = true;
let canOpenPurpleChat = true;
let spawnOneCanSpawn = true;
let spawnTwoCanSpawn = true;
let spawnThreeCanSpawn = true;
let spawnFourCanSpawn = true;
let spawnFiveCanSpawn = true;

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

const spawnZoneOne = document.createElement("div");
spawnZoneOne.classList = "spawn-one";
gameArea.append(spawnZoneOne);

const spawnZone2 = document.createElement("div");
spawnZone2.classList = "spawn2";
gameArea.append(spawnZone2);

const spawnZone3 = document.createElement("div");
spawnZone3.classList = "spawn3";
gameArea.append(spawnZone3);

const spawnZone4 = document.createElement("div");
spawnZone4.classList = "spawn4";
gameArea.append(spawnZone4);

const spawnZone5 = document.createElement("div");
spawnZone5.classList = "spawn5";
gameArea.append(spawnZone5);

const blueZone = document.createElement("div");
blueZone.classList = "blue-zone";
gameArea.append(blueZone);

const redZone = document.createElement("div");
redZone.classList = "red-zone";
gameArea.append(redZone);

const purpleZone = document.createElement("div");
purpleZone.classList = "purple-zone";
gameArea.append(purpleZone);

function startGame() {
  new Game();
  startGameButton.remove();
}

function handlePressedKeys(event) {
  switch (event.code) {
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
    this.canIce = false;
    this.canFire = false;
    this.canLightning = false;
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
    if (canAttack && this.manaCount >= 18 && this.canFire) {
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
      const fireAudio = new Audio(
        "../Sounds/00_-_legit_audio_-_legit_fir_fire_staff_20-audio.mp3"
      );
      fireAudio.play();
      const fireAudio2 = new Audio("../Sounds/04_Fire_explosion_04_medium.wav");
      fireAudio2.play();
      const fireAudio3 = new Audio("../Sounds/fire-1.wav");
      fireAudio3.play();

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
    if (canAttack && this.manaCount >= 40 && this.canLightning) {
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
      const lightningSound1 = new Audio("../Sounds/18_Thunder_02.wav");
      lightningSound1.play();
      const lightningSound2 = new Audio("../Sounds/22_Water_02.wav");
      lightningSound2.play();
      const lightningSound3 = new Audio("../Sounds/25_Wind_01.wav");
      lightningSound3.play();
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
    if (canAttack && this.canIce) {
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
      const iceAudio = new Audio("../Sounds/ice.wav");
      iceAudio.play();
      const iceAudio2 = new Audio("../Sounds/coldsnap.wav");
      iceAudio2.play();

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
    this.x = gameArea.clientWidth / 2;
    this.y = gameArea.clientHeight / 2;
    this.direction = { x: 1, y: 1 };
    this.setPosition();
    this.canDealDamage = true;
    this.canReceiveDamage = true;
    this.canScream = true;
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
    this.x = gameArea.clientWidth / 2 + Math.floor(Math.random() * 500);
    this.y = gameArea.clientHeight / 2 + Math.floor(Math.random() * 500);
    this.direction = { x: 1, y: 1 };
    this.setPosition();
    this.canDealDamage = true;
    this.canReceiveDamage = true;
    this.canScream = true;
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
      mainCharacter.getBoundingClientRect().top - 20 <
        this.element.getBoundingClientRect().top <
        mainCharacter.getBoundingClientRect().top + 20 ||
      mainCharacter.getBoundingClientRect().bottom - 20 <
        this.element.getBoundingClientRect().bottom <
        mainCharacter.getBoundingClientRect().bottom + 20
    ) {
      this.direction.y = 0;
    }

    if (
      mainCharacter.getBoundingClientRect().left - 20 <
        this.element.getBoundingClientRect().left <
        mainCharacter.getBoundingClientRect().left + 20 ||
      mainCharacter.getBoundingClientRect().right - 20 <
        this.element.getBoundingClientRect().right <
        mainCharacter.getBoundingClientRect().right + 20
    ) {
      this.direction.x = 0;
    }

    if (
      this.element.getBoundingClientRect().right >
        mainCharacter.getBoundingClientRect().right + 20 &&
      this.canMobMove("left")
    ) {
      this.direction.x = -1;
      this.animateMoving("left");
    }
    if (
      this.element.getBoundingClientRect().left <
        mainCharacter.getBoundingClientRect().left - 20 &&
      this.canMobMove("right")
    ) {
      this.direction.x = 1;
      this.animateMoving("right");
    }
    if (
      this.element.getBoundingClientRect().top <
        mainCharacter.getBoundingClientRect().top - 20 &&
      this.canMobMove("down")
    ) {
      this.direction.y = 1;
      this.animateMoving("down");
    }
    if (
      this.element.getBoundingClientRect().bottom >
        mainCharacter.getBoundingClientRect().bottom + 20 &&
      this.canMobMove("up")
    ) {
      this.direction.y = -1;
      this.animateMoving("up");
    }
    this.x += 1 * this.direction.x * speed - 0.2;
    this.y += 1 * this.direction.y * speed - 0.2;
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

class Cultist extends Mob {
  createCharacter() {
    const div = document.createElement("div");
    div.classList = "character cultist idle";
    gameArea.append(div);
    return div;
  }

  animateMoving(direction) {
    switch (direction) {
      case "right":
        this.element.classList = "character cultist right-side-walk";
        break;
      case "left":
        this.element.classList = "character cultist left-side-walk";
        break;
    }
  }

  animateEnnemyAttack() {
    if (this.element.classList.contains("left-side-walk")) {
      this.element.classList = "cultist attack-left";
    }
    if (this.element.classList.contains("right-side-walk")) {
      this.element.classList = "cultist attack-right";
    }
  }

  killCharacter() {
    this.element.classList = "cultist dying";
    setTimeout(() => {
      this.element.remove();
    }, 900);
  }
  animateImage() {
    setInterval(() => {
      let sprite = this.element;
      let currentPositionX = window.getComputedStyle(
        this.element
      ).backgroundPositionX;
      let x = parseInt(currentPositionX);
      x -= 220;
      sprite.style.backgroundPositionX = x + "px";
    }, 100);
  }
}

//Now, we'll put in some NPCs that'll be responsible for the powers of my character
class Npc {
  constructor(color) {
    this.color = color;
    this.element = this.createElement();
  }

  createElement() {
    const npc = document.createElement("div");
    npc.className = this.color;
    gameArea.append(npc);
    return npc;
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
    }, 50);
  }
}

//Let's launch the game !!
class Game {
  constructor() {
    const music = new Audio("../Sounds/INSPIRATION1.mp3");
    music.loop = true;
    this.mainCharacter = new MainCharacter("Philippe", 20, 3);
    this.intervalId = null;
    this.ennemies = [];
    this.mobs = [];
    this.cultists = [];
    this.npcs = [new Npc("blue"), new Npc("red"), new Npc("purple")];
    this.animate();
    this.mainCharacter.animateImage();
    for (const npc of this.npcs) {
      npc.animateImage();
    }
    for (const cultist of this.cultists) {
      cultist.animateImage();
    }
    for (const ennemy of this.ennemies) {
      ennemy.animateImage();
    }
    for (const mob of this.mobs) {
      mob.animateImage();
    }

    // setInterval(() => {
    //   this.pause();
    //   // this.resume();
    // }, 1);
  }

  //Let's establish the scrolling system

  checkIfEnnemies() {
    if (
      this.ennemies.length === 0 &&
      this.mobs.length === 0 &&
      this.cultists.length === 0
    ) {
      return true;
    }
  }

  moveBackground(direction) {
    if (this.checkIfEnnemies()) {
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
            }, 2500);
          }
          for (const mob of this.mobs) {
            mob.canDealDamage = false;
            setTimeout(() => {
              mob.canDealDamage = true;
            }, 2500);
          }
          this.cultist.canDealDamage = false;
          setTimeout(() => {
            this.cultist.canDealDamage = true;
          }, 2500);
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
          this.cultist.canDealDamage = false;
          setTimeout(() => {
            this.cultist.canDealDamage = true;
          }, 2500);
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
            }, 2500);
          }
          for (const mob of this.mobs) {
            mob.canDealDamage = false;
            setTimeout(() => {
              mob.canDealDamage = true;
            }, 2500);
          }
          this.cultist.canDealDamage = false;
          setTimeout(() => {
            this.cultist.canDealDamage = true;
          }, 2500);
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
            }, 2500);
          }
          for (const mob of this.mobs) {
            mob.canDealDamage = false;
            setTimeout(() => {
              mob.canDealDamage = true;
            }, 2500);
          }
          this.cultist.canDealDamage = false;
          setTimeout(() => {
            this.cultist.canDealDamage = true;
          }, 2500);
          break;
      }
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
      this.checkIfWin();
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
        if (ennemy.canDealDamage && this.isOnAttackDistance(ennemy)) {
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

      for (const cultist of this.cultists) {
        if (cultist.canDealDamage) {
          cultist.move();
        }
        if (this.cultistCollisionDetection(cultist)) {
          if (cultist.canDealDamage) {
            this.onCollision(cultist);
          } else {
            return;
          }
        }
        if (this.attackFireMobCollisionDetection(cultist)) {
          this.onAttackFireCollision(cultist);
        }
        if (this.attackLightningMobCollisionDetection(cultist)) {
          this.onAttackLightningCollision(cultist);
        }
        if (this.attackIceMobCollisionDetection(cultist)) {
          this.onAttackIceCollision(cultist);
        }
      }

      if (
        this.collisionDetectionRedZone() &&
        canOpenRedChat &&
        this.mainCharacter.canIce
      ) {
        this.onRedCollision();
      }
      if (this.collisionDetectionBlueZone() && canOpenBlueChat) {
        this.onBlueCollision();
      }
      if (
        this.collisionDetectionPurpleZone() &&
        canOpenPurpleChat &&
        this.mainCharacter.canFire
      ) {
        this.onPurpleCollision();
      }
      if (this.collisionDetectionSpawnZoneOne() && spawnOneCanSpawn) {
        this.onCollisionSpawnZoneOne();
      }
      if (this.collisionDetectionSpawnZone2() && spawnTwoCanSpawn) {
        this.onCollisionSpawnZone2();
      }
      if (this.collisionDetectionSpawnZone3() && spawnThreeCanSpawn) {
        this.onCollisionSpawnZone3();
      }
      if (this.collisionDetectionSpawnZone4() && spawnFourCanSpawn) {
        this.onCollisionSpawnZone4();
      }
      if (
        this.collisionDetectionSpawnZone5() &&
        spawnFiveCanSpawn &&
        this.mainCharacter.canLightning
      ) {
        this.onCollisionSpawnZone5();
      }
    }, 1000 / 60);
  }

  //The functions for when the ennemies attack !!
  isOnAttackDistance(ennemy) {
    if (ennemy.canDealDamage) {
      const ennemyBounding = ennemy.element.getBoundingClientRect();
      const mainBounding = this.mainCharacter.element.getBoundingClientRect();
      const isInX =
        ennemyBounding.left < mainBounding.right + 235 &&
        ennemyBounding.right > mainBounding.left - 235;
      const isInY =
        ennemyBounding.bottom > mainBounding.top - 235 &&
        ennemyBounding.top < mainBounding.bottom + 235;
      if (isInX && isInY) {
        return true;
      }
    } else {
      return;
    }
  }

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

  cultistCollisionDetection(ennemy) {
    if (ennemy.canDealDamage) {
      const ennemyBounding = ennemy.element.getBoundingClientRect();
      const mainBounding = this.mainCharacter.element.getBoundingClientRect();
      const isInX =
        ennemyBounding.left < mainBounding.right - 55 &&
        ennemyBounding.right > mainBounding.left + 55;
      const isInY =
        ennemyBounding.bottom > mainBounding.top + 55 &&
        ennemyBounding.top < mainBounding.bottom - 55;
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
      const hit = new Audio("../Sounds/Hits/hit34.mp3.flac");
      hit.play();
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

    if (ennemy instanceof Mob && ennemy.health <= 0) {
      ennemy.killCharacter();
      let index = this.mobs.indexOf(ennemy);
      this.mobs.splice(index, 1);
    }
    if (ennemy instanceof Ennemy && ennemy.health <= 0) {
      ennemy.killCharacter();
      let index = this.ennemies.indexOf(ennemy);
      this.ennemies.splice(index, 1);
    }
    if (ennemy instanceof Cultist && ennemy.health <= 0) {
      ennemy.killCharacter();
      let index = this.cultists.indexOf(ennemy);
      this.cultists.splice(index, 1);
    }
    if (ennemy.canScream) {
      ennemy.canScream = false;
      const hit = new Audio("../Sounds/Hits/hit34.mp3.flac");
      hit.play();
      setTimeout(() => {
        ennemy.canScream = true;
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
      ennemy.receiveDamage(this.mainCharacter.strength + 40);
      setTimeout(() => {
        ennemy.canDealDamage = true;
        ennemy.canReceiveDamage = true;
      }, 4500);
    }

    if (ennemy instanceof Mob && ennemy.health <= 0) {
      ennemy.killCharacter();
      let index = this.mobs.indexOf(ennemy);
      this.mobs.splice(index, 1);
    }
    if (ennemy instanceof Ennemy && ennemy.health <= 0) {
      ennemy.killCharacter();
      let index = this.ennemies.indexOf(ennemy);
      this.ennemies.splice(index, 1);
    }
    if (ennemy instanceof Cultist && ennemy.health <= 0) {
      ennemy.killCharacter();
      let index = this.cultists.indexOf(ennemy);
      this.cultists.splice(index, 1);
    }
    if (ennemy.canScream) {
      ennemy.canScream = false;
      const hit = new Audio("../Sounds/Hits/hit34.mp3.flac");
      hit.play();
      setTimeout(() => {
        ennemy.canScream = true;
      }, 2500);
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

      if (ennemy instanceof Mob && ennemy.health <= 0) {
        ennemy.killCharacter();
        let index = this.mobs.indexOf(ennemy);
        this.mobs.splice(index, 1);
      }
      if (ennemy instanceof Ennemy && ennemy.health <= 0) {
        ennemy.killCharacter();
        let index = this.ennemies.indexOf(ennemy);
        this.ennemies.splice(index, 1);
      }
      if (ennemy instanceof Cultist && ennemy.health <= 0) {
        ennemy.killCharacter();
        let index = this.cultists.indexOf(ennemy);
        this.cultists.splice(index, 1);
      }

      setTimeout(() => {
        ennemy.canDealDamage = true;
        ennemy.canReceiveDamage = true;
      }, 1500);
    }
    if (ennemy.canScream) {
      ennemy.canScream = false;
      const hit = new Audio("../Sounds/Hits/hit34.mp3.flac");
      hit.play();
      setTimeout(() => {
        ennemy.canScream = true;
      }, 2500);
    }
  }

  //The functions for the storyline

  collisionDetectionRedZone() {
    const red = document.querySelector(".red-zone");
    const redBounding = red.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      redBounding.left < mainBounding.right &&
      redBounding.right > mainBounding.left;
    const isInY =
      redBounding.bottom > mainBounding.top &&
      redBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  collisionDetectionBlueZone() {
    const blue = document.querySelector(".blue-zone");
    const blueBounding = blue.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      blueBounding.left < mainBounding.right &&
      blueBounding.right > mainBounding.left;
    const isInY =
      blueBounding.bottom > mainBounding.top &&
      blueBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  collisionDetectionPurpleZone() {
    const purple = document.querySelector(".purple-zone");
    const purpleBounding = purple.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      purpleBounding.left < mainBounding.right &&
      purpleBounding.right > mainBounding.left;
    const isInY =
      purpleBounding.bottom > mainBounding.top &&
      purpleBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  onBlueCollision() {
    canOpenBlueChat = false;
    let chatScreen = document.createElement("div");
    chatScreen.classList = "blue-chat-screen";
    let npcPicture = document.createElement("div");
    npcPicture.classList = "blue-mage";
    chatScreen.append(npcPicture);
    let blueChatH1 = document.createElement("h1");
    blueChatH1.textContent =
      "Heeeeelp! Dark entities have invaded the town. Everyone has left or worst, they're dead ! It appears that you're the only one alive ! Were you sleeping or something ? Anyway, we need your help to eradicate the evil that struck this city! Take my power. You'll be able to do ICE DAMAGE by pressing I. Ice damage also allows you to gain some MANA which will be helpfull when you gain the powers of my siblings. Go south-west from here, you'll find my brother. You'll definitly need his powers to make it to the end !";
    chatScreen.append(blueChatH1);
    let advance = document.createElement("button");
    advance.classList = "advance";
    advance.textContent = "Continue";
    chatScreen.append(advance);
    let main = document.querySelector("main");
    main.append(chatScreen);
    let advanceButton = document.querySelector(".advance");
    advanceButton.addEventListener("click", closeChatScreen);

    function closeChatScreen() {
      chatScreen.remove();
    }

    this.mainCharacter.canIce = true;
  }

  onRedCollision() {
    canOpenRedChat = false;
    let chatScreen = document.createElement("div");
    chatScreen.classList = "red-chat-screen";
    let npcPicture = document.createElement("div");
    npcPicture.classList = "red-mage";
    chatScreen.append(npcPicture);
    let redChatH1 = document.createElement("h1");
    redChatH1.textContent =
      "I've been expecting you,! I see by your use of my brother's Ice power that you have met him north-west of town. I guess he got you up to speed. We need you. Our magic is useless to harm others unless we transfer it to mortals. Here, take my power. You'll be able to do FIRE DAMAGE on your ennemies by pressing O. Be aware that it'll cost you MANA. But not as much as the power our sister is going to give you. She's north east of here in central park. Go! We're all counting on you !";
    chatScreen.append(redChatH1);
    let advance = document.createElement("button");
    advance.classList = "advance2";
    advance.textContent = "Continue";
    chatScreen.append(advance);
    let main = document.querySelector("main");
    main.append(chatScreen);
    let advanceButton = document.querySelector(".advance2");
    advanceButton.addEventListener("click", closeChatScreen);

    function closeChatScreen() {
      chatScreen.remove();
    }

    this.mainCharacter.canFire = true;
  }

  onPurpleCollision() {
    canOpenPurpleChat = false;
    let chatScreen = document.createElement("div");
    chatScreen.classList = "purple-chat-screen";
    let npcPicture = document.createElement("div");
    npcPicture.classList = "purple-mage";
    chatScreen.append(npcPicture);
    let purpleChatH1 = document.createElement("h1");
    purpleChatH1.textContent =
      "Here, take some lightning. No need to make a fuss. Use it with P, you'll need it to defeat the Cultist guardian who holds the key to defeat the leader of the dark army. The leader is north east of here and the Cultist Guardian is right behind you ...";
    chatScreen.append(purpleChatH1);
    let advance = document.createElement("button");
    advance.classList = "advance3";
    advance.textContent = "Continue";
    chatScreen.append(advance);
    let main = document.querySelector("main");
    main.append(chatScreen);
    let advanceButton = document.querySelector(".advance3");
    advanceButton.addEventListener("click", closeChatScreen);
    this.mainCharacter.canLightning = true;

    function closeChatScreen() {
      chatScreen.remove();
    }
    setTimeout(() => {
      let underBoss = new Cultist(50, 3);
      underBoss.id = "underboss";
      this.cultists.push(underBoss);
      this.cultists.forEach((cultist) => {
        cultist.animateImage();
      });
    }, 7000);
  }

  collisionDetectionSpawnZoneOne() {
    const spawn = document.querySelector(".spawn-one");
    const spawnBounding = spawn.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      spawnBounding.left < mainBounding.right &&
      spawnBounding.right > mainBounding.left;
    const isInY =
      spawnBounding.bottom > mainBounding.top &&
      spawnBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  collisionDetectionSpawnZone2() {
    const spawn = document.querySelector(".spawn2");
    const spawnBounding = spawn.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      spawnBounding.left < mainBounding.right &&
      spawnBounding.right > mainBounding.left;
    const isInY =
      spawnBounding.bottom > mainBounding.top &&
      spawnBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  collisionDetectionSpawnZone3() {
    const spawn = document.querySelector(".spawn3");
    const spawnBounding = spawn.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      spawnBounding.left < mainBounding.right &&
      spawnBounding.right > mainBounding.left;
    const isInY =
      spawnBounding.bottom > mainBounding.top &&
      spawnBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  collisionDetectionSpawnZone4() {
    const spawn = document.querySelector(".spawn4");
    const spawnBounding = spawn.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      spawnBounding.left < mainBounding.right &&
      spawnBounding.right > mainBounding.left;
    const isInY =
      spawnBounding.bottom > mainBounding.top &&
      spawnBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  collisionDetectionSpawnZone5() {
    const spawn = document.querySelector(".spawn5");
    const spawnBounding = spawn.getBoundingClientRect();
    const mainBounding = this.mainCharacter.element.getBoundingClientRect();
    const isInX =
      spawnBounding.left < mainBounding.right &&
      spawnBounding.right > mainBounding.left;
    const isInY =
      spawnBounding.bottom > mainBounding.top &&
      spawnBounding.top < mainBounding.bottom;
    if (isInX && isInY) {
      return true;
    }
  }

  onCollisionSpawnZoneOne() {
    spawnOneCanSpawn = false;
    let newMob1 = new Mob(5, 1);
    let newMob2 = new Mob(5, 1);
    this.mobs.push(newMob1);
    this.mobs.push(newMob2);
    this.mobs.forEach((mob) => {
      mob.canDealDamage = true;
      mob.animateImage();
    });
  }

  onCollisionSpawnZone2() {
    spawnTwoCanSpawn = false;
    let newMob1 = new Mob(5, 1);
    let newMob2 = new Mob(5, 1);
    let newMob3 = new Mob(5, 1);
    let newMob4 = new Mob(5, 1);

    this.mobs.push(newMob1);
    this.mobs.push(newMob2);
    this.mobs.push(newMob3);
    this.mobs.push(newMob4);

    this.mobs.forEach((mob) => {
      mob.canDealDamage = true;
      mob.animateImage();
    });
  }

  onCollisionSpawnZone3() {
    spawnThreeCanSpawn = false;
    let newMob1 = new Mob(5, 1);
    let newMob2 = new Mob(5, 1);
    let newMob3 = new Mob(5, 1);
    let newMob4 = new Mob(5, 1);
    this.mobs.push(newMob1);
    this.mobs.push(newMob2);
    this.mobs.push(newMob3);
    this.mobs.push(newMob4);
    this.mobs.forEach((mob) => {
      mob.canDealDamage = true;
      mob.animateImage();
    });
  }

  onCollisionSpawnZone4() {
    spawnFourCanSpawn = false;
    let newMob1 = new Mob(5, 1);
    let newMob2 = new Mob(5, 1);
    let newMob3 = new Mob(5, 1);
    let newMob4 = new Mob(5, 1);
    let newMob5 = new Mob(5, 1);
    let newMob6 = new Mob(5, 1);
    this.mobs.push(newMob1);
    this.mobs.push(newMob2);
    this.mobs.push(newMob3);
    this.mobs.push(newMob4);
    this.mobs.push(newMob5);
    this.mobs.push(newMob6);
    this.mobs.forEach((mob) => {
      mob.canDealDamage = true;
      mob.animateImage();
    });
  }

  onCollisionSpawnZone5() {
    spawnFiveCanSpawn = false;
    let boss = new Ennemy(150, 3);
    this.ennemies.push(boss);
    this.ennemies.forEach((boss) => {
      boss.canDealDamage = true;
      boss.animateImage();
    });
  }

  //The function for the end of the game.

  checkIfWin() {
    let arrayOfEnnemies = document.querySelectorAll(".ennemy");
    if (
      this.mainCharacter.canLightning &&
      !spawnFiveCanSpawn &&
      arrayOfEnnemies.length === 0
    ) {
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
    winH1.textContent =
      "You successfully saved the whole town and maybe the world. Time to go back to that purple mage to see what's up !";
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

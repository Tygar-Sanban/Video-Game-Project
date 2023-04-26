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
let canMove = true;
let canAttack = true;
let lastPressedKey;
let game = null;

//Let's now implement the "physics"

startGameButton.addEventListener("click", startGame);
window.addEventListener("keydown", handlePressedKeys);
window.addEventListener("keyup", handleReleasedKeys);

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
    this.x = gameArea.clientWidth / 2 - this.element.clientWidth / 2;
    this.y = gameArea.clientHeight / 2 - this.element.clientHeight / 2;
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
    let manaH1 = document.createElement("h1");
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
        if (canMove) {
          this.element.classList = "character main-character right-side-walk";
        }
        break;
      case "left":
        if (canMove) {
          this.element.classList = "character main-character left-side-walk";
        }
        break;
      case "up":
        if (canMove) {
          this.element.classList = "character main-character up-walk";
        }
        break;
      case "down":
        if (canMove) {
          this.element.classList = "character main-character down-walk";
        }
        break;
    }
  }

  animateIdle(direction) {
    switch (direction) {
      case "right":
        if (canMove) {
          this.element.classList = "character main-character right-side-idle";
        }
        break;
      case "left":
        if (canMove) {
          this.element.classList = "character main-character left-side-idle";
        }
        break;
      case "up":
        if (canMove) {
          this.element.classList = "character main-character up-idle";
        }
        break;
      case "down":
        if (canMove) {
          this.element.classList = "character main-character down-idle";
        }
        break;
    }
  }

  attackFire() {
    if (canAttack && this.manaCount >= 18) {
      canMove = false;
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
        canMove = true;
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
      canMove = false;
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
        canMove = true;
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
      canMove = false;
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
        canMove = true;
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
    this.canDealDamage = false;
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

//Let's launch the game !!

class Game {
  constructor() {
    this.mainCharacter = new MainCharacter("Philippe", 5, 2);
    this.intervalId = null;
    this.ennemies = [
      new Ennemy(1000, 2),
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
    this.animate();
    this.mainCharacter.animateImage();
    for (const ennemy of this.ennemies) {
      ennemy.animateImage();
    }
    // setInterval(() => {
    //   this.pause();
    //   // this.resume();
    // }, 1);
  }

  //Let's establish the scrolling system

  moveBackground(direction) {
    let main = document.querySelector("main");
    let currentPositionX = window.getComputedStyle(main).backgroundPositionX;
    let x = parseInt(currentPositionX);
    let currentPositionY = window.getComputedStyle(main).backgroundPositionY;
    let y = parseInt(currentPositionY);
    switch (direction) {
      case "left":
        if (pressedKeys.n) {
          x += speed * 1.7;
        } else {
          x += speed;
        }
        main.style.backgroundPositionX = x + "px";
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        break;
      case "right":
        if (pressedKeys.n) {
          x -= speed * 1.7;
        } else {
          x -= speed;
        }
        main.style.backgroundPositionX = x + "px";
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        break;
      case "up":
        if (pressedKeys.n) {
          y += speed * 1.7;
        } else {
          y += speed;
        }
        main.style.backgroundPositionY = y + "px";
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        break;
      case "down":
        if (pressedKeys.n) {
          y -= speed * 1.7;
        } else {
          y -= speed;
        }
        main.style.backgroundPositionY = y + "px";
        for (const ennemy of this.ennemies) {
          ennemy.canDealDamage = false;
          setTimeout(() => {
            ennemy.canDealDamage = true;
          }, 1000);
        }
        break;
    }
  }

  //The game interval

  animate() {
    this.intervalId = setInterval(() => {
      const characterRect = this.mainCharacter.element.getBoundingClientRect();
      this.checkIfWin();
      this.checkIfEndGame();
      if (pressedKeys.right && canMove) {
        if (characterRect.right >= 1600) {
          this.mainCharacter.animateMoving("right");
          this.moveBackground("right");
        } else {
          this.mainCharacter.move("right");
          this.mainCharacter.animateMoving("right");
        }
      }
      if (pressedKeys.left && canMove) {
        if (characterRect.left <= 300) {
          this.mainCharacter.animateMoving("left");
          this.moveBackground("left");
        } else {
          this.mainCharacter.move("left");
          this.mainCharacter.animateMoving("left");
        }
      }
      if (pressedKeys.up && canMove) {
        if (characterRect.top <= 200) {
          this.mainCharacter.animateMoving("up");
          this.moveBackground("up");
        } else {
          this.mainCharacter.move("up");
          this.mainCharacter.animateMoving("up");
        }
      }
      if (pressedKeys.down && canMove) {
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

  onAttackFireCollision(ennemy) {
    if (ennemy.canReceiveDamage) {
      ennemy.canReceiveDamage = false;
      ennemy.canDealDamage = false;
      ennemy.receiveDamage(this.mainCharacter.strength + 2);
      console.log(ennemy.health);
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

  onAttackLightningCollision(ennemy) {
    if (ennemy.canReceiveDamage) {
      ennemy.canReceiveDamage = false;
      ennemy.canDealDamage = false;
      ennemy.receiveDamage(this.mainCharacter.strength + 15);
      console.log(ennemy.health);
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
    if (arrayOfEnnemies.length === 0) {
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

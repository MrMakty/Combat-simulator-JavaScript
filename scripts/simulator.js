console.log("JS file is connected!");

class Character {
    constructor(name, classType, health, maxHealth, armor, strength, speed, ability1Id, ability2Id) {
        this.name = name;
        this.classType = classType;
        this.health = health;
        this.maxHealth = maxHealth;
        this.armor = armor;
        this.strength = strength;
        this.speed = speed;
        this.ability1Id = ability1Id;
        this.ability2Id = ability2Id;
    }

    introduce() {
        console.log("\nHello there, I am "+this.name+" the "+this.classType+".\nA pleasure to meet you!\nHere are my stats"+
            "\nHealth: "+this.maxHealth+"/"+this.health+
            "\nStrength: "+this.strength+
            "\nArmor: "+this.armor+
            "\nSpeed: "+this.speed
        )
    }
}

class Ability{
    constructor(id, name, abilityType, power, powerDuration, effect, effectChance, effectDuration, cooldown, description, target, ready) {
        this.id = id;
        this.name = name;
        this.abilityType = abilityType;
        this.power = power;
        this.powerDuration = powerDuration;
        this.effect = effect;
        this.effectChance = effectChance;
        this.effectDuration = effectDuration;
        this.cooldown = cooldown;
        this.description = description;        
        this.target = target;
        this.ready = ready;
    }
}

class StatusEffect{
    constructor(id, sourceId, sourceName, remainingRounds){
        this.id = id;
        this.sourceId = sourceId;
        this.sourceName =sourceName;
        this.remainingRounds = remainingRounds;
    }
}

//Buttons and their calls
const attackButton = document.getElementById("attackButton");
const abilityButton1 = document.getElementById("abilityButton1");
const abilityButton2 = document.getElementById("abilityButton2");
const runButton = document.getElementById("runButton");


//Button listeners
attackButton.addEventListener("click", () => {
  console.log("Attack clicked!");
  performAttack(chosenEnemy, chosenCharacter);
});

abilityButton1.addEventListener("click", () => {
  console.log("Ability clicked!");
});

abilityButton2.addEventListener("click", () => {
  console.log("Ability clicked!");
});

runButton.addEventListener("click", () => {
  console.log("Run clicked!");
});

function getRandomInt(min, max) { //random integer generator with a variable maximum and minimum
    return Math.random() * (max - min) + min;
}


//Make player (meaning stats and abilitites) Player will be able to choose by clicking on a character but for now only 1 possible character to play with
let playerWarrior = new Character("Matthieu", "warrior", 150, 150, 15, 20, 3, "slash", "brace_shield")
playerWarrior.introduce();
let playerMage = new Character("Arkon", "mage", 50, 50, 5, 60, 6, "fireball", "mage_armor")
playerMage.introduce();
let playerArcher = new Character("Makty", "archer", 100, 100, 15, 30, 9, "precision_shot", "healing_salve")
playerArcher.introduce();


let chosenCharacter = playerWarrior;

//Make enemy (meaning stats and abilitites) For now only one enemy possible
let enemyGoblin = new Character("Goob", "goblin", 80, 80, 15, 15, 6, "mud_throw", "enemy_brace_shield")
enemyGoblin.introduce();

let chosenEnemy = enemyGoblin

//Combat:
function firstAttacker(chosenCharacter, chosenEnemy){ //Decides who will act first in combat. Will remove the performAttack calls later as they will be put into a button click
    let chosenFighters = [chosenCharacter, chosenEnemy];
    const randomNumber = Math.random();
    const randomFaster = chosenFighters[Math.floor(randomNumber * chosenFighters.length)];
    const randomSlower = chosenFighters[Math.floor(1-randomNumber * chosenFighters.length)];
    if (chosenCharacter.speed < chosenEnemy.speed){ //Enemy is faster and attacks first
        performAttack(chosenEnemy, chosenCharacter);
    } else if (chosenCharacter.speed > chosenEnemy.speed) {//Player is faster and attacks first
        performAttack(chosenCharacter, chosenEnemy);
    } else if (randomFaster === randomSlower){ //If the variable randomNumber ever is exactly 0.5, the player gets to go first
        performAttack(chosenCharacter, chosenEnemy);
    } else {
        performAttack(randomFaster, randomSlower); //Random fighter gets chosen to act first
    }
}


function performAttack(attacker, defender, specialDamage = 0, critBuf = 0, hitBuf = 0, lowRoll = -5, highRoll = 6) {
    let damage = 0;
    let rHit = getRandomInt(0, 101);
    if (rHit > 94 + hitBuf) //Check if the attack misses
        {
            console.log("\n"+attacker.name+" misses "+defender.name+" and deals no damage!");
        }
    else if (rHit < 6 + critBuf) //Checks to see if the attack is a crit
        {
            if (specialDamage != 0) {
                damage = specialDamage * 2;
            }
            else {
                damage = attacker.strength * 2;   
            }
            console.log("\n"+attacker.name+" critically hits "+defender.name+" the "+defender.classType+" !\n"+
                defender.name+" takes "+damage+" points of damage!");
        }
    else //if not a miss or a crit this code runs
        {
            let rDamage = Math.floor(getRandomInt(lowRoll, highRoll));
            if (specialDamage != 0) {
                damage = specialDamage - defender.armor + rDamage;
            }
            else {
                damage = attacker.strength - defender.armor + rDamage;   
            }
            if (damage <= 0) {
                damage = 0;
                console.log("\n"+attacker.name+" attacks "+defender.name+", but "+
                            defender.name+" blocked all the damage!");
            }
            else {
            console.log("\n"+attacker.name+" hits "+defender.name+" the "+defender.classType+" !\n"+
                        defender.name+" takes "+damage+" points of damage!");            
            }
        }
        defender.health -= damage;
        return damage; //This is here to later check if an attack did damage or not. Attacks that don't deal damage because they missed or got bloacked, shouldn't deal status conditions
}


//Variables needed:
//Player: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Enemy: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Attack: PlayerInfo, EnemyInfo, Will be done with random and set of posibilities (DamageRoll, HitChance, CritChance) 

//Character and character choosing:
//Characters introduse themself on hover (SHOULD)
//Images for characters and enemies (MUST)

//Combat: (MUST)
//Higher speed goes first
//First attack (with damage roll)
//Second attack (with damage roll)
//Ability
//Repeat attacks untill either character or enemie dies

//After combat
//Rewards (SHOULD)
//Choose next enemy if you won. Make new character if character died (MUST)

//Maybe implement: (WOULD)
//Items
//Money
//Locations

console.log("Project is done introducing and setting up code!");

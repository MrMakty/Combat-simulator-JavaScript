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
// attackButton.addEventListener("click", () => {
//   console.log("Attack clicked!");
//   characterAttacks(chosenCharacter, chosenEnemy);
// });

// abilityButton1.addEventListener("click", () => {
//   console.log("Ability clicked!");
// });

// abilityButton2.addEventListener("click", () => {
//   console.log("Ability clicked!");
// });

// runButton.addEventListener("click", () => {
//   console.log("Run clicked!");
// });

function getRandomInt(min, max) { //random integer generator with a variable maximum and minimum
    return Math.random() * (max - min) + min;
}

// Global variables
let chosenCharacter = null;
let chosenEnemy = null;

function selectCharacter(character) {
    chosenCharacter = character; 
    console.log("Chosen character is now:", chosenCharacter.name, chosenCharacter.classType);
}

function backgroundStarter(newState){
    let currentBackground = document.createElement('img');
    currentBackground.setAttribute("src", "styles/assets/backgrounds/" + newState + ".jpg")
    currentBackground.setAttribute("id", newState);
    currentBackground.setAttribute("class", "background");
    currentBackground.setAttribute("alt", "Afbeelding niet gevonden")
    document.getElementsByClassName("backgroundLocation")[0].appendChild(currentBackground);
    console.log("New background has been created");
}

function buttonStarter(newState){
    selectCharacter(playerWarrior) //Maybe change this to a villager so you get a weak character if you didn't select a character correctly
    characterList.forEach(character => {
        let characterButton = document.createElement('button');
        characterButton.setAttribute("id", character.classType);
        characterButton.setAttribute("class", newState);
        characterButton.addEventListener("click", () => {
            selectCharacter(character)
            character.introduce();
        });
        characterButton.innerHTML = character.name;
        document.getElementsByClassName(newState)[0].appendChild(characterButton);
        
    });
    let confirmButton = document.createElement('button');
    confirmButton.setAttribute("id", "confirmation");
    confirmButton.setAttribute("class", "confirmButton")
    confirmButton.addEventListener("click", () => {
        buttonRemover("characterSelection");
        backgroundChanger("characterSelection", "combat");
        combatSetup();
        combatHandler(chosenCharacter);
    });
    confirmButton.innerHTML = "CONFIRM";
    document.getElementsByClassName("characterSelection")[0].appendChild(confirmButton);
}

function backgroundChanger(formerState, newState){
    backgroundStarter(newState)
    let backgroundToRemove = document.getElementsByClassName(formerState)[0];
    backgroundToRemove.remove();
    console.log("Former background has been deleted")
}

function buttonRemover(formerState){
    let buttonToRemove = document.getElementById(formerState);
    while (buttonToRemove.lastChild){
        buttonToRemove.removeChild(buttonToRemove.lastChild);
    }
    console.log("All buttons about " + formerState + " should be removed")
}

//Make player (meaning stats and abilitites). Player will be able to choose by clicking on a character but for now only 1 possible character to play with
let playerWarrior = new Character("Matthieu", "warrior", 150, 150, 15, 20, 3, "slash", "brace_shield")
let playerMage = new Character("Arkon", "mage", 50, 50, 5, 60, 6, "fireball", "mage_armor")
let playerArcher = new Character("Makty", "archer", 100, 100, 15, 30, 9, "precision_shot", "healing_salve")
let characterList = [playerArcher, playerMage, playerWarrior]

function characterSelector(){ //This variable will be removed and a json file with the characters will be implemented in this function instead
    backgroundStarter("characterSelection");
    buttonStarter("characterSelection");
}

characterSelector(characterList)


function combatSetup(){
    // Random selection of enemy goed here
    chosenEnemy = new Character("Goob", "goblin", 80, 80, 15, 15, 6, "mud_throw", "enemy_brace_shield")
    chosenEnemy.introduce();

    let attackButton = document.createElement('button');
    attackButton.setAttribute("id", "attack");
    attackButton.setAttribute("class", "attackButton")
    attackButton.addEventListener("click", () => {
        characterAttacks(chosenCharacter, chosenEnemy)
    });
    attackButton.innerHTML = "ATTACK";
    document.getElementsByClassName("combatButtons")[0].appendChild(attackButton);   

    let abilityButton1 = document.createElement('button');
    abilityButton1.setAttribute("id", "ability1");
    abilityButton1.setAttribute("class", "abilityButton")
    abilityButton1.addEventListener("click", () => {
    });
    abilityButton1.innerHTML = chosenCharacter.ability1Id;
    document.getElementsByClassName("combatButtons")[0].appendChild(abilityButton1);

    let abilityButton2 = document.createElement('button');
    abilityButton2.setAttribute("id", "ability2");
    abilityButton2.setAttribute("class", "abilityButton")
    abilityButton2.addEventListener("click", () => {
    });
    abilityButton2.innerHTML = chosenCharacter.ability2Id;
    document.getElementsByClassName("combatButtons")[0].appendChild(abilityButton2);

    let runButton = document.createElement('button');
    runButton.setAttribute("id", "attack");
    runButton.setAttribute("class", "runButton")
    runButton.addEventListener("click", () => {
    });
    runButton.innerHTML = "RUN!";
    document.getElementsByClassName("combatButtons")[0].appendChild(runButton);

    let healthbarPlayer = document.createElement('data');
    healthbarPlayer.setAttribute("id", "playerHealth");
    healthbarPlayer.setAttribute("class", "healthbar");
    healthbarPlayer.innerHTML = chosenCharacter.health +"/"+ chosenCharacter.maxHealth;
    document.getElementsByClassName("healthbars")[0].appendChild(healthbarPlayer);

    let healthbarEnemy = document.createElement('data');
    healthbarEnemy.setAttribute("id", "enemyHealth");
    healthbarEnemy.setAttribute("class", "healthbar");
    healthbarEnemy.innerHTML = chosenEnemy.health +"/"+ chosenEnemy.maxHealth;
    document.getElementsByClassName("healthbars")[0].appendChild(healthbarEnemy);
}

function combatHandler(chosenCharacter){
    healthbarDisplayer(chosenEnemy, chosenCharacter, 0, 0)
}

//Constant healthbars
function healthbarDisplayer(chosenEnemy, chosenCharacter, enemyDamage, playerDamage){
    chosenCharacter.health -= playerDamage;
    const playerHealthInfo = document.getElementById("playerHealth");
    playerHealthInfo.textContent = chosenCharacter.health + "/" + chosenCharacter.maxHealth;
    console.log("player health printed")
    
    chosenEnemy.health -= enemyDamage;
    const enemyHealthInfo = document.getElementById("enemyHealth");
    enemyHealthInfo.textContent = chosenEnemy.health + "/" + chosenEnemy.maxHealth;
    console.log("enemy health printed")
}

// healthbarDisplayer(chosenEnemy, chosenCharacter, 0, 0)

//Combat:
function characterAttacks(chosenCharacter, chosenEnemy){ //Decides who will act first in combat. Will remove the performAttack calls later as they will be put into a button click
    let playerDamage = 0
    let enemyDamage = 0
    if (chosenCharacter.speed < chosenEnemy.speed){ //Enemy is faster and attacks first
        playerDamage = performAttack(chosenEnemy, chosenCharacter);
        enemyDamage = performAttack(chosenCharacter, chosenEnemy);
    } else if (chosenCharacter.speed > chosenEnemy.speed) {//Player is faster and attacks first
        enemyDamage = performAttack(chosenCharacter, chosenEnemy);
        playerDamage = performAttack(chosenEnemy, chosenCharacter);
    } else { //Player gets to go first in unforseen circumstances or if speed is equal
        playerDamage = performAttack(chosenCharacter, chosenEnemy);
        enemyDamage = performAttack(chosenEnemy, chosenCharacter);
    }
    healthbarDisplayer(chosenEnemy, chosenCharacter, enemyDamage, playerDamage)
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
    if (damage > 0){
        return damage; //This is here to later check if an attack did damage or not. Attacks that don't deal damage because they missed or got bloacked, shouldn't deal status conditions
    }
    else
    {
        return 0
    }
}


//Variables needed:
//Player: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Enemy: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Attack: PlayerInfo, EnemyInfo, Will be done with random and set of posibilities (DamageRoll, HitChance, CritChance) 

//Character and character choosing:
//Characters introduce themself on hover (SHOULD)
//Images for characters and enemies (MUST)

//Combat: (MUST)
//Higher speed goes first
//First attack (with damage roll)
//Second attack (with damage roll)
//Ability (for both)
//  Cooldown
//  Effect
//Possibility to try and run from enemy
//Repeat attacks untill either character or enemie dies
//Status effect calculation

//After combat
//Rewards (SHOULD)
//Choose next enemy if you won or make new character if character died (MUST)

//Maybe implement: (WOULD)
//Items
//Money
//Locations

console.log("Project is done introducing and setting up code!");

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



//Make player (meaning stats and abilitites) Player will be able to choose by clicking on a character but for now only 1 possible character to play with
let playerWarrior = new Character("Matthieu", "warrior", 150, 150, 20, 20, 3, "slash", "brace_shield")
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
function firstAttacker(chosenCharacter, chosenEnemy){ //Decides who will act first in combat
    let chosenFighters = [chosenCharacter, chosenEnemy];
    const randomNumber = Math.random();
    const randomFaster = chosenFighters[Math.floor(randomNumber * chosenFighters.length)];
    const randomSlower = chosenFighters[Math.floor(1-randomNumber * chosenFighters.length)];
    if (chosenCharacter.speed < chosenEnemy.speed){ //Enemy is faster and attacks first
        performAttack(chosenEnemy, chosenCharacter);
    } else if (chosenCharacter.speed > chosenEnemy.speed) {//Player is faster and attacks first
        performAttack(chosenCharacter, chosenEnemy);
    } else if (randomFaster === randomSlower){ //If the variable randomNumber ever is exactly equal, the player gets to go first
        performAttack(chosenCharacter, chosenEnemy);
    } else {
        performAttack(randomFaster, randomSlower); //Random fighter gets chosen to act first
    }
}


function performAttack(firstActor, lastActor) {
    
}



//Higher speed goes first (If easy to implement)

//First attack (with damage roll)

//Second attack (with damage roll)

//Repeat attacks untill either character or enemie dies

//Choose next enemy if you won. Otherwise, make new character


//Variables needed:
//Player: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Enemy: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Attack: PlayerInfo, EnemyInfo, Will be done with random and set of posibilities (DamageRoll, HitChance, CritChance) 

console.log("Project is done running!");

console.log("JS file is connected!");

class Character {
    constructor(name, classType, health, maxHealth, armor, strength, speed, ability1, ability2) {
        this.name = name;
        this.classType = classType;
        this.health = health;
        this.maxHealth = maxHealth;
        this.armor = armor;
        this.strength = strength;
        this.speed = speed;
        this.ability1 = ability1;
        this.ability2 = ability2;
    }

    introduce() {
        console.log("Hello there. I am "+this.name+" the "+this.classType+".\nA pleasure to meet you!")
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



let player = new Character("Makty", "warrior", "", "", "", "", "", "", "")
player.introduce();

//Make player (meaning stats and abilitites)

//Chooses enemy (meaning stats and abilitites)

//Combat start

//Higher speed goes first (If easy to implement)

//First attack (with damage roll)

//Second attack (with damage roll)

//Repeat attacks untill either character or enemie dies

//Choose next enemy if you won. Otherwise, make new character


//Variables needed:
//Player: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Enemy: Name, Type[Health, MaxHealth, Armor, Strength, Speed, Ability1, Ability2]
//Attack: PlayerInfo, EnemyInfo, Will be done with random and set posibilities (DamageRoll, HitChance, CritChance) 

console.log("Project is done running!");

$(document).ready(function(){
    
    const Obi = {
        name : "Obi Wan",
        hp : 130,
        ap : 12,
        cp : 10
    }
    const Luke = {
        name : "Luke Skywalker",
        hp : 110,
        ap : 20,
        cp : 5
    }
    const Maul = {
        name : "Darth Maul",
        hp : 200,
        ap : 15,
        cp : 25
    }
    const Palpatine = {
        name : "Darth Sidious",
        hp : 160,
        ap : 18,
        cp : 20
    }
    const myCharacter = new Object();
    const myEnemy = new Object();

    const gameEngine = {
        characterChosen: false,
        enemyChosen: false,
        kills: 0,

        controller(){
            if(gameEngine.characterChosen){

                if(gameEngine.enemyChosen){
                    attack(myCharacter, myEnemy);
                    myCharacter.ap = myCharacter.ap + myCharacter.increment;
                    attack(myEnemy, myCharacter);
                    if(!alive(myEnemy)){
                        gameEngine.enemyChosen = false;
                        $("#aText").text("You have defeated your foe. You must select a new enemy.")
                        $("#myEnemy").html("");
                        gameEngine.kills++;
                        if(gameEngine.kills>2){
                            alert("You've won!");
                            location.reload();
                        }
                    }
                    else if(!alive(myCharacter)){
                        alert("You have died!");
                        location.reload();
                    }
                }
                else{
                    $("#aText").text("You must select a defender");
                }
            }
            else{
                $("#aText").text("You must select a character");
            }
        }
    };

    function attack(attacker, defender){
        defender.hp = defender.hp - attacker.ap;
        $("#aText").append(attacker.name + " deals " + attacker.ap + " damage to " + defender.name + "<br/>");
        $("#"+defender["jsname"]).find("p.charHP").text(defender.hp)
    }

    function alive(character){
        if(character.hp > 0){
            return true;
        }
        else{
            return false;
        }
    }

    $("#attack").on("click", function(){
        $("#aText").text(" ");
        gameEngine.controller();
    });

    $(".character").on("click", function(){

        if(!gameEngine.characterChosen){
            gameEngine.characterChosen = true;
            myCharacterID = this.id;
            switch(myCharacterID){
                case "Obi Wan":
                    $.extend(myCharacter, Obi);
                    break;
                case "Luke Skywalker":
                    $.extend(myCharacter, Luke);
                    break;
                case "Darth Sidious":
                    $.extend(myCharacter, Palpatine);
                    break;
                case "Darth Maul":
                    $.extend(myCharacter, Maul);
                    break;
                default:
                    break;
            }
            myCharacter.increment = myCharacter.ap;
            myCharacter.jsname = "myCharacter";
            $(this).appendTo("#myCharacter");
            $("#characters").appendTo("#attackers");
        }
        else if(!gameEngine.enemyChosen && this.id !== myCharacter.name){
            gameEngine.enemyChosen = true;
            myEnemyID = this.id;
            switch(myEnemyID){
                case "Obi Wan":
                        $.extend(myEnemy, Obi);
                        break;
                case "Luke Skywalker":
                        $.extend(myEnemy, Luke);
                        break;
                case "Darth Sidious":
                        $.extend(myEnemy, Palpatine);
                        break;
                case "Darth Maul":
                        $.extend(myEnemy, Maul);
                        break;
                default:
                    break;
            }
            myEnemy.ap = myEnemy.cp;
            myEnemy.jsname = "myEnemy";
            $(this).appendTo("#myEnemy");
        }
    });
})

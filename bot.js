var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '/') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
		
        switch(cmd) {
            case 'challenge' :
				var rdm = Math.floor((Math.random() * 6) + 1);
				prepareChallenge(channelID, message, rdm);
            break;
			case 'roll' :
				var roll = Math.floor((Math.random() * 100) + 1);
				bot.sendMessage({to: channelID, message: "`" + user + " rolled:  " + roll.toString() + "`"});
			break;
         }
     }
})
function prepareChallenge(channelID, message, rdm)
{
	var challengeID = "";
	var challengeName = "";
	var challengeDetails = "";
	var challengeRules = "";
	var challengePoints = "";
	var challengeDuration = "";
	
	switch(rdm)
	{
		case 1 :
			challengeID = "1";
			challengeName = "PLAY A NORMAL GAME OF PUBG";
			challengeDetails = "'Yip that is right, you read it right! I am too lazy to make up a challenge right now, so just play a normal game of PUBG.'";
			challengeRules = "'No rules'";
			challengePoints = "Coming soon...";
			challengeDuration = "'Match'";
		break;
		case 2 :
			challengeID = "2";
			challengeName = "PROTECT THE PRESIDENT!";
			challengeDetails = "'Do your job bodyguards! Protect your President at any cost! Determine who your President in your team will be by typing /roll in the chat. The player that rolled the lowest is your President, protect him!'";
			challengeRules = "1) Don't let your President die\n2) Your President is not allowed to carry any weapons\n3) Your President may equip a vest\n4) When all body guards die, then your President is allowed to use a pistol and equip a helmet";
			challengePoints = "Coming soon...";
			challengeDuration = "'Match' | 'Death of your President'";
		break;
		case 3 :
			challengeID = "3";
			challengeName = "PISTOLS ONLY";
			challengeDetails = "'You are allowed to use only pistols, no other weapons or grenades are allowed.'";
			challengeRules = "1) Do not let your President die\n2) Your President is not allowed to carry any weapons\n3) Your President may equip a vest";
			challengePoints = "Coming soon...";
			challengeDuration = "'Match'";
		break;
		case 4 :
			challengeID = "4";
			challengeName = "MAD MAX";
			challengeDetails = "'You are a Rebel. From the start of the game you are allowed to carry only 1 gun with a single mag, level 1 body armor and helmet, 1 grenade and a meelee weapon. Running people over with cars is another option too. Don not forget to loot your enemies corpse.'";
			challengeRules = "1) Not allowed to loot more than 1 Gun and 1 Mag\n2) Only level 1 body armor and helmet is allowed";
			challengePoints = "Coming soon...";
			challengeDuration = "'Match'";
		break;
		case 5 :
			challengeID = "5";
			challengeName = "PLANE DROP THIEF";
			challengeDetails = "'You are only allowed to loot and equip weapons and armor from the plane drop.'";
			challengeRules = "1) The President is not allowed to die\n2) The President is not allowed to carry any weapons";
			challengePoints = "Coming soon...";
			challengeDuration = "'Match'";
		break;
		case 6 :
			challengeID = "6";
			challengeName = "MAGNETIC CROSSBOW";
			challengeDetails = "'Become the hunter and equip a crossbow when you see one. Hunt down those who dare to come between you and that chicken dinner!'";
			challengeRules = "1) Pick up a crossbow regardless of what weapons you have, the crossbow must be equipped\n2) Becomes your only weapon to fire with until its ammo runs out, only then may you switch to another weapon\n3) Not allowed to be dropped or swapped for another weapon";
			challengePoints = "Coming soon...";
			challengeDuration = "'Match | Ammo runs out'";
		break;
	}
	
	generateChallenge(channelID, message, challengeID, challengeName, challengeDetails, challengeRules, challengePoints, challengeDuration);
}
function generateChallenge(channelID, message, challengeID, challengeName, challengeDetails, challengeRules, challengePoints, challengeDuration)
{
	logger.info(challengeID, challengeName, challengeDetails, challengeRules, challengePoints, challengeDuration);
	bot.sendMessage({to: channelID, message: "```xl\nID:  " + challengeID + "   |  Challenge Name:  '" + challengeName + "'\n--------------------------------------------\nDetails:\n---------\n" + challengeDetails + "\n--------------------------------------------\nDuration:  " + challengeDuration + "\n--------------------------------------------\nRules:\n---------\n" + challengeRules + "\n--------------------------------------------\nPoints:\n---------\n" +  challengePoints + "```"});
}
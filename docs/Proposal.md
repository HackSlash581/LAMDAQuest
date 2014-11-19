#I. Game Concept

1.  **Introduction**
  
  Imagine a 2D adventure game in the style of the original Zelda with a Minecraft level of world interaction, except instead of being able to merely interact with everything in the world, you can program everything in the world.  Everything is scriptable.  The player can attach custom scripts written in our own simplified language, HackScript, to any game entity.  We're proposing a new kind of game that will unleash creativity, teach programming, and allow for a completely unique and individualized gaming experience.  We're proposing *L.A.M.D.A Quest: Live Action Modding with Dynamic Associations*.   
2.  **Description**

  A typical game session would play out as follows.  You begin as an adventurer in the world with a fantasy setting.  After getting used to navigating the world and dueling a few enemies with your sword, you meet another character that would like to join you on your journies and become your apprentice.  That character is now in your party, however, in order to control that character, you will have to write a script for that character to follow.  You puase the game and open the character's scripting pane, and since this is early in the game, you don't have many options yet.  Right now you can just set the character's `behaviour` property to one of three values: `aggressive`, `defensive`, or `passive`.  The character explains to you that these properties mean he will attack everything in sight, attack only if attacked, and attack no one, respectively.  

  You are in the mood for a good fight, so you type `behavior: aggresive` into the scripting pain and click "Execute."  You unpause the game and continue on your adventure, your aggressive friend in tow.  A few goblins approach your party and your apprentice makes quick work of them.  Suddenly you come upon a group of sleeping goblins.  It is obvious to you that waking them will not result in a victorious encounter.  That's when you notice that your apprentice is charging towards them with an insane lust for blood in his eye.  You quickly pause the game before he can do any damage, open his scripting pane, and type a line of HackScript, `behaviour: passive`.  Whew!  That was close.  You rethink your script, and decide it would be better to give your apprentice conditional behaviour, and type the line `if count.enemy > 5: behaviour: defensive else: behaviour: aggressive`.  Now your cohort will only be heedlessly aggressive when you are not outnumbered two to one!

  As you progress in the game, you gain access to more elements of the language and are able to control the character to a higher degree.  Later in your journey, for example, you learn that you can access the property `enemy.life` to see how many hit points that monster has.  You then decide to write a script that tells the character to attack any monster that comes within two tiles of you with a normal attack, and use a special attack if that monster has more than 20 hit points: `if enemy.life > 20: attack: spear else: attack: fireMagic`. 
  After gaining some more experience you acquire a new weapon, a wand of flame.  The default behavior for this weapon is to shoot a straight line of flame that travels 3 tiles per second.  As you gain experience with this item by using it multiple times, your item knowledge increases, and you gain access to new properties of the wand.  You decide that the flame travels too fast for the task at hand, so you open the wand's scripting pane and type `flameWand.speed: 1`.  Now your flames hang around a little longer, making it more difficult for enemies to get to you.
  
3.  **Key Features**
 * Open, procedurally generated world
 * Programmable game entities
 * Scalable access to new properties and functions of items, tiles, and enemies
4.  **Genre**
  
 Our first goal is to create a sandbox world so we can explore and experiment with different ideas while we get the game and scripting engine figured out and working smoothly.  This will be similar in genre to Minecraft, where the only goal is for the player to do as he or she chooses.  We expect to have the sandbox version working by the end of this semester or early next semester.  The next step is to add dungeons to the world where the gameplay would resemble an adventure RPG.  In the dungeons we can present specialized challenges that require creative use of HackScript to overcome.  This involves puzzles, monsters with certain weaknesses, obstacles that can only be overcome by writing scripts, and so on.
  
5.  **Platforms**
  
 We are choosing to develop the game for the browser as a web application.  The reasons for this choice are as follows.  We are interested in gaining more experience with web development, Node.js, and JavaScript.  JavaScript's `eval` function allows us to execute the compiled HackScript that we send to the client (for a more thorough explanation, see the Technical Analysis below).  Additionally, the JavaScript game framework [Phaser](http://phaser.io) allows for extremely rapid prototyping. In phaser it takes 30 minutes to do what would take hours to do with C++ and SDL, for example.  It also has support for spritesheets, animations, tiled maps, music, sound effects, and more.  

6.  **The Current State of Modifiable Games**

 Currently, Minecraft "mods" (user modified versions of the game) are extremely popular and provide endless hours of creativity and enjoyment stemming from a very simple game.  However, there is a steep learning curve to creating a mod.  Here are the steps a user must take to modify and play a new version of Minecraft.
  1. Stop playing the game
  2. Learn a modding framework
  3. Learn how to program in Java
  4. Write code in an editor or IDE
  5. Compile the code into a jar
  6. Load the game with the new mod
  7. Play the modified version
  8. Repeat

 Each step represents a significant time investment, and modding is out of reach for the average Minecraft player. LAMDA Quest proposes a simplified modification scheme, aimed at getting more people able to modify the game more quickly with a much more shallow learning curve.
  
  1. Pause the game
  2. Type a line of HackScript with help from the cheatsheet
  3. Unpause the game, and play the new version. Instant gratification!
 
 Since modding is so appealing, we feel that this is a successful model for a game.
  
7.  **Market Analysis**
  
 About a month after coming up with the original idea for LAMDA Quest, we discovered a game called [Hack 'n' Slash](http://hacknslashthegame.com) that seemed to be an exact replica of our idea.  Our original name for the game was HackSlash. We were a little disappointed that our idea had already been done (with the same name even!), but rather than let this discourage use, we felt that our idea was validated, and that it was good enough to be making money on Steam.  Additionally, Hack 'n' Slash only allows the player to access properties of objects and change them with a graphical interface.  One can slide the enemy.health property from 20 to 0, for example.  Our game goes a step further and allows the actual programming of entities with conditional branching, looping, and assignment.  Additionally, Hack 'n' Slash lets the player do ridiculous things like have an enemy drop 75 hearts so the player will always have full health.  We plan on restricting access to property levels.  This is made easier with the HackScript language.  Hack 'n' Slash proves that there is a market for this kind of game, and LAMDA Quest takes Hack 'n' Slash to the next level. 
8.  **Technical Analysis**

  Using our own programming language for game entity scripts gives us several distinct advantages.  First, it will allow us a fine grain of control over what the user can do with scripting.  We can give the player access only to the language constructs that we deem appropriate for the task at hand, and scale the possibilites up as the game progresses. Second, we initially considered allowing the user to directly type in JavaScript or Lua, but that would present many security issues.  With our own language, we can compile it to JavaScript and execute it with the knowledge that nothing harmful can be done since everything the user types in has to make it through the HackScript parser. Third, using a simple language will reduce the overall complexity and allow us to finish the year with a playable game.  Finally, creating a programming language just sounds fun!

#II.  Functional Specification

1.  **Game Mechanics**
  1.  Core Game Play
      
    Lambda Quest is a single player 2d adventure game that allows not only interaction with the fantasy world, but  also  the ability to change the way the world looks and behaves.  This ability to creatively alter the world that the user is interacting with is the core concept of the game.  This is accomplished first by the user clicking on any of the glowing objects in the world, this will pause the game and bring up a text box that will allow the user to enter his or her own script.  The script will then be injected into the selected object, the game will unpause, and the user can continue playing in the now changed world.  
	
    The user will write these scripts in our simplified language, HackScript.  This will allow us to keep the scripts the user wants/needs to write relatively simple and therefore limit the required programming knowledge neccessary to enjoy the game.  An example of this would be the user clicking on a tree and entering “color: blue” in the text box.  Then when the game resumes the tree will now be blue instead of the default green color.  This same idea is used to change everything from the location of inanimate objects to enemy behavior. 

  	As the user advances in the game, they will be awarded with new elements of the HackScript language to use.  At the start the user will only have the ability to change attribute values, but as they gain levels they will gain the ability to use conditionals and loops.  A quick description of how to use each new element will be provided when it is unlocked.  As they level up they will also gain the ability to affect more and more objects in the world, including enemies of an equal level or below.

  	Advancing in the game will consist of completing procedural generated levels that generally have a boss at the end the user needs to defeat.  The ability to change the environment will be required to advance in the game at certain points, such as needing to move inanimate objects to certain places to solve a puzzle or using a loop to repeatedly take down an enemy's shield.  However, there will be vastly more options available to the user that are not needed to advance in the game, this allows for the user to use his or her creativity to truly create their own world.
	
  2.  Game Flow

	From the very start of the game, the player will be thrown into a randomly generated world. After brief tutorial, the player will notice that he can interact with several objects in the game, however, he will also come to realize that his initial options are very limited. Once the basics are described to the player, he will be set off into the sandbox world. 

	When interacting with the environment, he will initially be able to see the props basic values to get a general understanding of what it consists of. At level 2, he will be able to modify the basic values such as color and size, but will still be limited with his interactions. At level 4, the player can then move props that have the ability to move with the commands provided to him. At level 8, the player will then be powerful enough to access props ability to be drawn into the screen and will make it so that certain object can be “erased” from the world. 

	When interacting with enemies, as with the environment, the player will initially only be able to see the unit’s basic properties to get a general understanding of what the unit is capable of. At level two, the player will be able to change basic attributes of an enemy unit of equal level or lower. At level three, the player will be able to access any enemy’s in-built methods to see how they operate. At level four, he will be able to start modifying the methods of an enemy of equal level or lower. At this point, the player can only modify these values slightly for evenly matched enemies, but can modify the values more for weaker ones. As the player levels, his ability to interact with the enemies will grow. If an enemy is four levels or more weaker than the player, then the player will be able to modify the enemy’s aggression level and be able to make it a cohort. . If an enemy is five levels or more weaker than the player, however, he will then be able to directly modify the creatures health points at his own whim. During combat, the player will still need to be careful when interacting with the enemy and be tactical with his decisions. 

	When it comes to the player’s abilities and items, he will initially be able to see the parameters of each ability and item, but won’t be allowed to alter them until he gains more experience using them. After experienced is gained, he may then be able to access each items attributes and each abilities methods and alter them based on his “proficiency” with each and his current level. With a high enough proficiency, the player will then be able to add extra functionality to any skill and item.

	Due to the sandbox nature of this game, there are no linear story elements. However, the player will come across checkpoints to save his progress. The player may also come across puzzles and other environmental obstacles that test his ability to think about what he needs to script to efficiently deal with his situation. 

	With each successful encounter and puzzle solved, the player will gain experience, more usable methods, and functionality of the HackScript language. This will allow the player to build more complex scripts and learn how to more deeply interact with the world. Since there is no real “end” to the game, the player will continue to grow in level and experience until he will be proficient enough in programming and knowledge of the game rules to become master of the his domain and make all bow to his power or get set to zero health.

  3.  Characters/Units

    a.  Main Character - Player controller character that has extensive mutability as player levels. User can change
        basic character attributes such as speed, color, and other various aesthetic changes. As level progress player
        will be able to add scripting elements to the character. These scripting elements are listed in further detail
        below.
        
    b.  Basic Enemy - A low level encounter the player will have to interact with to accomplish their objective. These
        lower level enemy units usually stand in place and fight, deal contact damage, and/or walk in very simple
        routes around the map. Once the player reaches a high enough level, they will be able to add scripts to these
        low level enemies to be used in their strategic planning. Small chance at dropping a low level mod for the
        player to use.
        
    c.  Advanced Enemy - A medium to higher level encounter that has more random game play elements and is harder for
        the player to pass to get to the objective. Dependent on the enemy encounter, the player will not have access 	to controlling this enemy unit or very limited mutability. These enemies will deal more damage and are likely to
        be encountered with lower level enemies as well. Higher chance than basic enemy to drop a low level mod, and
        a small chance to drop a medium to higher level mod for the player to use.
        
    d.  Bosses - Uncontrollable to the player and usually is at the end of an objective. Mini-bosses may be in place
        throughout objectives or for random encounters to add to game variability. Higher chance to drop a player mode
        across all levels.
        
    e.  Tile Units - Throughout the game there will be various tile units the player will be exposed to. These will
        vary between "ice" tiles where the player must move slowly across to effectively get to the check point,
        "hot" tiles where the player must move quickly across to minimize damage dealt, or even teleporting tiles that
        transports the player to another part of the map.
        
    f.  Misc - Other game play characters/units may involve bombs, trip mines, turrets, etc. that may be found in 		other games to add to the gaming experience. Most of these ideas are tentative until we solidify the game 		mechanics and feel of the game we our looking for.

  4.  Scripting Elements

    HackScript is the simplified programming language that we will use to handle all player scripting.  It will be compiled to JavaScript on the server and sent to the browser to attach to the object that called it using AJAX.  We will start by implementing just a few core operations, and will gradually add more to the system as we get a working shell up and running.  The initial language will be as follows.
     ####Supported Syntax

     1. Conditionals
  
      `if <expression>: <propertychain | function call | expression | assignment>`

     2. Timeouts
 
      `every <time in milliseconds>: <function name>`

     3. Assignment

      `<property | property chain>: <property>`

     ####Examples

     `if enemy.distance < 2: player.activateShield`

     `every 2000: player.heal`

     `player.tunic.color: blue`

  5.  Game Physics and Statistics
  6.  Artificial Intelligence

    a.  Basic AI - At the lowest level enemy encounters, the player will experience easy artificial intelligence. This
        will range from simple standing and attacking enemies, enemies that patrol a route, and enemies that patrol 		and attack.
        
    b.  Medium AI - At medium levels the player can experience randomly moving AI that "dodge" attacks, move quicker,
        and move with randomness. These AI units will typically have higher health based off enemy movement abilities.
        If an elemental system is in place, the player will begin to experience enemies where only certain attacks 		will damage these enemy units.
        
    c.  Advanced AI - The player will experience enemy AI units that may randomly teleport, spawn enemies, and many 		other random game play elements to add increasing difficulty.
    
    d.  Boss AI - The bosses will typically follow that of an advanced AI or of a predetermined script that the player
        must solve to effectively eliminate the boss.
        
    e.  Companion AI - As the player levels, and companions that may be implemented in the game will start off with
        simple AI logic and attacks/defenses. As the player unlocks/levels the companion, scripts can be added and
        smarter intelligence added.
  7.  Multiplayer
2.  **User Interface**
  1.  Flowchart
  2.  Functional Requirements
  3.  Mockups
  4.  GUI Objects
3.  **Art and Video**
  1.  Overall goals
  2.  2D Art and Animation
  3.  GUI
  4.  Terrain
  5.  Game Play Elements
  6.  Cinematics
4.  **Sound and Music**
  1.  Sound Effects
    *  GUI
    * Special Effects
    * Characters
    * Game Play Elements
    * Environment
    * Motion
  2.  Music
    * Event Jingles – success/failure/death/victory etc.
    * Shell Screen
    * Level Theme
    * Situations
5.  **Story**
6.  **Level Requirements**
  1.  Level Diagram
  2.  Asset Revelation Schedule
  3.  Level Design Seeds

#III.  Implications

At the heart of our application is the ability to inject code into a running application.  This has some implications beyond our goal of a scriptable game.  Our architecture can serve as a model for a web application that can be updated without having to restart the server.  Imagine fixing a bug in a web application by simply typing in a list of changes on the command line.  Those changes would be put into an object that would notify the application that properties of existing objects have changed, and that it should update itself.  While this would be usefule for small fixes, it is probably not feasable to add entire modules to a running application.  

#IV.  Timeline

(Insert Gantt chart here)

#V.  Budget


#VI.  Team Members and Contributions

1.  **Kevin Bajaj**: Core Game Play
2.  **Greg Ervin**
3.  **Thomas Ford**
4.  **Sean Hannah**: Game Flow
5.  **Chris Hogan**: Game Concept, Scripting Elements, Implications
6.  **Grant Steuart**

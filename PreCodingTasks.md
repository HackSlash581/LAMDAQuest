#I. Game Concept

1.  **Introduction**
  
  Imagine Zelda with a Minecraft level of world interaction, except instead of being able to merely interact with everything in the world, you can program  everything in the world.  Everything is scriptable.  The player can attach custom scripts written in our own HackSlash DSL to any game entity.  We're proposing a game by programmers, for programmers.    
2.  **Background**
3.  **Description**

  When you start the game, you begin adventuring in the world like any other RPG with a fantasy setting.  Then, you meet another character that would like to join you on your journies.  That character is now in your party, however, in order to control that character, you will have to attach a script to it.  You open the character's scripting pane, and since this is early in the game, you don't have many options yet.  Right now you can just call one of three methods: aggressive(), guard(), follow().  As you progress in the game, you gain access to more elemnets of the language and are able to control the character to a higher degree.  Later in your journey, for example, you might write a script that tells the character to attack any monster that comes within two tiles of you with a normal attack, and use a special attack if that monster has more than 20 hit points. 
  
  Say you acquire a new weapon, a wand of flame.  The default behavior for this weapon is to shoot a straight line of flame that travels 3 tiles per second.  As you gain experience with this item, you gain access to the private variables of the object that encapsulates it.  That means you can attach scripts to it that change its speed, trajectory, and width.
  
  There is a large rock on the path ahead of you.  Once you've gained the 'telepathy' ability, you will be able to write scripts for inanimate objects.  You can make the rock move in a circle to disrupt enemies, use it to plug doors, or float it to otherwise inaccessible switches.  
4.  **Key Features**
  * Open world
  * Scriptable game entities
5.  **Genre**
  * Adventure RPG
  * Crafting
6.  **Platforms**
  * Browser
  * Possible mobile support
7.  **Concept Art**

#II.  Game Proposal

1.  **Revised Game concept**
2.  **Market Analysis**
  
  Minecraft modding is very popular.  This is the ultimate mod.  It allows for in-game modding while playing, and modding is part of the challenge of the game.  
3.  **Technical Analysis**
4.  **Art**

#III.  Functional Specification

1.  **Game Mechanics**
  1.	Core Game Play
  2.	Game Flow
  3.	Characters/Units
  4.	Game Play Elements
  5.	Game Physics and Statistics
  6.	Artificial Intelligence
  7.	Multiplayer
2.  **User Interface**
  1.	Flowchart
  2.	Functional Requirements
  3.	Mockups
  4.	GUI Objects
3.  **Art and Video**
  1.	Overall goals
  2.	2D Art and Animation
  3.  GUI
  4.  Terrain
  5.	Game Play Elements
  6.  Cinematics
4.  **Sound and Music**
  1.	Sound Effects
    *  GUI
    *	Special Effects
    *	Characters
    *	Game Play Elements
    *	Environment
    *	Motion
  2.	Music
    *	Event Jingles – success/failure/death/victory etc.
    *	Shell Screen
    *	Level Theme
    *	Situations
5.  **Story**
6.  **Level Requirements**
  1.	Level Diagram
  2.	Asset Revelation Schedule
  3.	Level Design Seeds

#IV.  Technical Specification

1.  **Game Mechanics**
  1.	Platform and OS
  2.	Third Party Code
  3.	Code Objects
  4.	Control Loop
  5.	Game Object Data Structures and Methods
  6.	Data Flow
  7.	Physics
  8.	AI
2.  **UI**
  1.	Game Shell – All Screens besides main play screen
  2.	Main play Screen(s)
3.  **Art and Video**
  1.	Graphics Engines
  2.	Art Requirements
4.  **Sound and Music**
5.  **Level Specific Code**

#V.  Milestones

1.  **Conceptual Phase** 
  *	Document: Game Concept
  *	Document: Game Proposal 
2.  **Design Phase** 
  *	Document: Functional Specification 
  *	Document: Technical Specification 
  *	Documents: Tool Specifications (if applicable) 
3.  **Production Phase (sometimes called Implementation Phase)** 
  *	Production Schedule 
  *	Technology and Art Demo 
  *	First Playable Level 
  *	Documents: Paper Level Designs (not always a deliverable) 
  *	Alpha - Functionally Complete 
4.  **Testing Phase (Quality Assurance)** 
  *	Beta - First Potential Code Release 
  *	Gold Master - Code Release 

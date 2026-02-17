
// You can write more code here

/* START OF COMPILED CODE */

import MusicManager from "../prefabs/audio/MusicManager.js";
import DropMergeGame from "../prefabs/dropMerge/DropMergeGame.js";
import ScreenAnchor from "../scriptNodes/basics/ScreenAnchor.js";
import DropMergeManager from "../prefabs/dropMerge/DropMergeManager.js";
import StateManager from "../prefabs/game/StateManager.js";
import ServerManager from "../prefabs/game/ServerManager.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.

		//console.log("matter:", this.matter);

		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// musicManager
		const musicManager = new MusicManager(this, 0, 0);
		this.add.existing(musicManager);

		// dropMergeGame
		const dropMergeGame = new DropMergeGame(this, 540, 960);
		this.add.existing(dropMergeGame);

		// screenAnchor
		new ScreenAnchor(dropMergeGame);

		// dropMergeManager
		const dropMergeManager = new DropMergeManager(this, 0, 0);
		this.add.existing(dropMergeManager);

		// stateManager
		const stateManager = new StateManager(this, 0, 0);
		this.add.existing(stateManager);

		// serverManager
		const serverManager = new ServerManager(this, 0, 0);
		this.add.existing(serverManager);

		this.dropMergeManager = dropMergeManager;
		this.stateManager = stateManager;
		this.serverManager = serverManager;

		this.events.emit("scene-awake");
	}

	/** @type {DropMergeManager} */
	dropMergeManager;
	/** @type {StateManager} */
	stateManager;
	/** @type {ServerManager} */
	serverManager;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		console.log("matter:", this.matter);
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

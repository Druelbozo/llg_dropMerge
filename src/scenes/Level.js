
// You can write more code here

/* START OF COMPILED CODE */

import MusicManager from "../prefabs/audio/MusicManager.js";
import DropMergeGame from "../prefabs/dropMerge/DropMergeGame.js";
import ScreenAnchor from "../scriptNodes/basics/ScreenAnchor.js";
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
		const dropMergeManager = this.add.container(540, 960);
		dropMergeManager.alpha = 0.5;

		this.events.emit("scene-awake");
	}

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

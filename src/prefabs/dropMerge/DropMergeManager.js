
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DropMergeManager extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 5;
		this.scaleY = 5;

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.time.delayedCall(5, () => {this.scene.events.emit("onGameStart"); console.log("HI")}, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	minBallSize = 0.5
	maxBallSize = 3

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

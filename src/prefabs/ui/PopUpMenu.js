
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PopUpMenu extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.input.on('pointerdown', (pointer, currentlyOver) => {
			// If this menu is visible and you didn't click on it
			if (this.visible && !this.getBounds().contains(pointer.x, pointer.y)) {
				this.setVisible(false);
			}
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

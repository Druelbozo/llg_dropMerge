
// You can write more code here

/* START OF COMPILED CODE */

import Button from "../ui/Button.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BasicTextButton extends Button {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// container
		const container = scene.add.container(0, 0);
		this.add(container);

		// btn_Main
		const btn_Main = scene.add.nineslice(0, 0, "Btn_Main", undefined, 250, 128, 40, 40, 34, 34);
		btn_Main.tint = 16721446;
		container.add(btn_Main);

		// text
		const text = scene.add.text(0, 0, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "PRESS";
		text.setStyle({ "fontFamily": "Lato-Bold", "fontSize": "42px" });
		container.add(text);

		this.btn_Main = btn_Main;
		this.text = text;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.animContainer.add(container);
		this.awake();
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.NineSlice} */
	btn_Main;
	/** @type {Phaser.GameObjects.Text} */
	text;
	/** @type {number} */
	buttonX = 250;
	/** @type {number} */
	buttonY = 128;
	/** @type {string} */
	textValue = "WORKS";

	/* START-USER-CODE */

	// Write your code here.

	awake()
	{
		this.text.text = this.textValue	
		this.btn_Main.width = this.buttonX
		this.btn_Main.height = this.buttonY

		this.setHitSize();
	}

	execute()
	{
		this.emit("interact");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

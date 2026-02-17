
// You can write more code here

/* START OF COMPILED CODE */

import BasicTextButton from "./BasicTextButton.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DropMergeEndScreen extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// nineslice_1
		const nineslice_1 = scene.add.nineslice(0, 0, "Btn_Main", undefined, 650, 1000, 37, 44, 39, 47);
		nineslice_1.tint = 4013373;
		this.add(nineslice_1);

		// Title
		const title = scene.add.text(0, -358, "", {});
		title.setOrigin(0.5, 0.5);
		title.text = "GAME OVER";
		title.setStyle({ "fontFamily": "Lato-Bold", "fontSize": "91px" });
		this.add(title);

		// Score
		const score = scene.add.text(0, -184, "", {});
		score.setOrigin(0.5, 0.5);
		score.text = "SCORE";
		score.setStyle({ "fontFamily": "Lato-Bold", "fontSize": "80px" });
		this.add(score);

		// Score_1
		const score_1 = scene.add.text(0, -42, "", {});
		score_1.setOrigin(0.5, 0.5);
		score_1.text = "100,000";
		score_1.setStyle({ "fontFamily": "Lato-Bold", "fontSize": "80px" });
		this.add(score_1);

		// restartButton
		const restartButton = new BasicTextButton(scene, 0, 370);
		this.add(restartButton);

		// restartButton (prefab fields)
		restartButton.textValue = "RESET";

		this.restartButton = restartButton;

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.events.on("onStateChanged", (state) => this.onStateChanged(state), this);
		this.awake();
		/* END-USER-CTR-CODE */
	}

	/** @type {BasicTextButton} */
	restartButton;

	/* START-USER-CODE */

	// Write your code here.
	awake()
	{
		this.scale = 0;
		this.restartButton.awake();

	}

	onStateChanged(state)
	{
		if(state === "gameOver")
		{
			this.restartButton.once("interact", ()=> this.close(), this)
			this.scene.tweens.add
			({
				targets: this,
				scaleX: 1,
				scaleY: 1,
				duration: 500,
				ease: "Back.Out",
			})
		}
	}

	close()
	{
			this.scene.tweens.add
			({
				targets: this,
				scaleX: 0,
				scaleY: 0,
				duration: 500,
				ease: "Back.In",
				complete: ()=> this.scene.stateManager.setState("reset", "DropMergeEndScreen: Clicked To Restart game")
			})		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

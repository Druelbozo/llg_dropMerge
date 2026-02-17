
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class StartMenu extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// hitZone
		const hitZone = scene.add.rectangle(0, 0, 5000, 5000);
		hitZone.setInteractive(new Phaser.Geom.Rectangle(0, 0, 5000, 5000), Phaser.Geom.Rectangle.Contains);
		hitZone.isFilled = true;
		hitZone.fillAlpha = 0;
		this.add(hitZone);

		// text_1
		const text_1 = scene.add.text(0, 0, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "CLICK\nTO\nPLAY";
		text_1.setStyle({ "align": "center", "fontFamily": "Lato-Bold", "fontSize": "155px" });
		this.add(text_1);

		this.hitZone = hitZone;

		/* START-USER-CTR-CODE */
		// Write your code here.

		scene.events.on("onStateChanged", (state) => this.onStateChanged(state), this);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	hitZone;

	/* START-USER-CODE */

	// Write your code here.
	reset()
	{
				this.scene.add.tween
				({
					targets: this,
					scaleX: 1,
					scaleY: 1,
					duration: 500,
					delay: 500,
					ease: "Back.Out",

				});
		this.hitZone.once("pointerdown", () => this.start(), this);
	}

	async start()
	{
		let success = await this.scene.serverManager.buy();

		if(success)
			{
				this.scene.add.tween
				({
					targets: this,
					scaleX: 0,
					scaleY: 0,
					duration: 500,
					delay: 500,
					ease: "Back.In",
					onComplete: () => this.scene.stateManager.setState("playing", "StartMenu: Server HandShake starting game")

				});
			}
		else
		{
			console.log("server failed bozo");			
		}
	}

	onStateChanged(state)
	{
		if(state === "reset")
		{
			this.reset();			
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

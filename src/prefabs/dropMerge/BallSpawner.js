
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BallSpawner extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 0, 900, 10);
		rectangle_1.isFilled = true;
		this.add(rectangle_1);

		// preview
		const preview = scene.add.sprite(0, 0, "DI_Balls_Default", 0);
		this.add(preview);

		this.preview = preview;

		/* START-USER-CTR-CODE */
		// Write your code here.
        scene.events.on('update', this.update, this);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	preview;

	/* START-USER-CODE */
	maxlevel = 9;
	minSize = 0.25
	maxSize = 2.5

	// Write your code here.
	update()
	{
		const pointer = this.scene.input.activePointer;
		let out = new Phaser.Math.Vector2();
		this.parentContainer.getLocalPoint(pointer.worldX, pointer.worldY, out);
		let max = 450;
		out.x = Phaser.Math.Clamp(out.x, -max, max);

        this.preview.x = out.x;
		//this.y = out.y;
		//console.log("Local X:", out.x, "Local Y:", out.y);
	}

	setPreview(level)
	{

		this.preview.scaleX = 0;
		this.preview.scaleY = 0;

		if(this.scene.textures.exists("Balls"))
		{

			this.preview.setTexture("Balls", this.level);
		}
		else
		{
			this.preview.setTexture("DI_Balls_Default", level);
		}

		const size = Phaser.Math.Linear(this.minSize, this.maxSize, level/this.maxlevel);

		this.scene.add.tween
		({
			targets: this.preview,
			scaleX: size,
			scaleY: size,
			duration: 500,
			delay: 500,
			ease: "Back.Out"
		});
	}

	getPosition()
	{
		let out = new Phaser.Math.Vector2();
		out.x = this.preview.x;
		out.y = this.preview.y;
		return out;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

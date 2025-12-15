
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Ball extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "DI_Balls_Default", frame ?? 0);

		this.visible = false;

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.time.delayedCall(0, () => {
			this.init(),
			this
		});

		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	level = 0;

	/* START-USER-CODE */
	maxlevel = 9;
	minSize = 0.25
	maxSize = 2.5

	// Write your code here.
	init()
	{
		if(this.scene.textures.exists("Balls"))
		{

			this.setTexture("Balls", this.level);
		}
		else
		{
			this.setTexture("DI_Balls_Default", this.level);
		}

		const ball = this.scene.matter.add.gameObject(this,
		{
			isStatic: false,
		});


		ball.setCircle(113);
		ball.setBounce(0.5);
		ball.body.label = "Ball";

		const size = Phaser.Math.Linear(this.minSize, this.maxSize, this.level/this.maxlevel);

		this.scaleX = size;
		this.scaleY = size;
		console.log(size);
		this.visible = true;
	}

	setLevel(level)
	{
		this.level = level;
		return;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

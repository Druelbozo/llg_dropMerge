
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Button extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// animContainer
		const animContainer = scene.add.container(0, 0);
		this.add(animContainer);

		this.animContainer = animContainer;

		/* START-USER-CTR-CODE */
		// Write your code here.

		scene.time.delayedCall(0, () => this.onStart());
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Container} */
	animContainer;

	/* START-USER-CODE */
	pointerDownTween;
	pointerUpTween;
	pointerOverTween;

	// Write your code here.
	onStart()
	{
		console.log("'Child', index, child");
		this.list.forEach((child, index) => {
			console.log('Child', index, child);
		});

		this.setHitSize();

		this.on("pointerdown", () => this.onPointerDown(), this);
		this.on("pointerup", () => this.onPointerUp(), this);
		this.on("pointerover", () => this.onPointerOver(), this);
	}

	setHitSize()
	{
		const size = this.getLocalBound();
		console.log(size.width);
		//this.setInteractive(new Phaser.Geom.Rectangle(size.width/2, size.height/2, size.width, size.height), Phaser.Geom.Rectangle.Contains);
		this.setInteractive(new Phaser.Geom.Rectangle(-size.width/2, -size.height/2, size.width, size.height), Phaser.Geom.Rectangle.Contains);
		console.log(this.input.hitArea.width);
	}

	getLocalBound()
	{
		let scaleX = this.scaleX;
		let scaleY = this.scaleY;

		let parent = this.parentContainer;
		while (parent) {
			scaleX *= parent.scaleX;
			scaleY *= parent.scaleY;
			parent = parent.parentContainer;
		}

		// Get world bounds
		const bounds = this.getBounds();

		// Convert to local size
		return {
			width: bounds.width / scaleX,
			height: bounds.height / scaleY
		};		
	}


	onPointerDown()
	{
		if(this.pointerDownTween !== undefined) {this.pointerDownTween.complete();}

		this.animContainer.scaleX = 1
		this.animContainer.scaleY = 1

		this.pointerDownTween = this.scene.add.tween
		({
			targets: this.animContainer,
			scaleX: 0.8,
			scaleY: 0.8,
			duration: 150,
			ease: "Back.easeIn",
			yoyo: true
		})


	}

	onPointerUp()
	{
		this.execute();
	}

	onPointerOver()
	{
		if(this.pointerOverTween !== undefined) {this.pointerOverTween.complete();}
		this.animContainer.y = 0;

		this.pointerOverTween = this.scene.add.tween
		({
			targets: this.animContainer,
			y: -20,
			duration: 150,
			ease: "Back.easeIn",
			yoyo: true
		})
	}

	execute()
	{
		this.emit("interact")
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

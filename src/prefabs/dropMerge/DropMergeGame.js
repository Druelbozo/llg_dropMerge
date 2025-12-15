
// You can write more code here

/* START OF COMPILED CODE */

import BallSpawner from "./BallSpawner.js";
/* START-USER-IMPORTS */
import Ball from "./Ball.js";
/* END-USER-IMPORTS */

export default class DropMergeGame extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// backing
		const backing = scene.add.rectangle(0, 0, 800, 1500);
		backing.scaleX = 1.25;
		backing.alpha = 0.5;
		backing.isFilled = true;
		backing.fillColor = 12369084;
		this.add(backing);

		// wallContainer
		const wallContainer = scene.add.container(0, 0);
		this.add(wallContainer);

		// ballContainer
		const ballContainer = scene.add.container(0, 0);
		ballContainer.alpha = 0.5;
		this.add(ballContainer);

		// floor
		const floor = scene.add.rectangle(0, 787, 1000, 80);
		floor.alpha = 0.5;
		floor.isFilled = true;
		this.add(floor);

		// floor_1
		const floor_1 = scene.add.rectangle(562, -173, 128, 2000);
		floor_1.alpha = 0.5;
		floor_1.isFilled = true;
		this.add(floor_1);

		// floor_2
		const floor_2 = scene.add.rectangle(-564, -173, 128, 2000);
		floor_2.alpha = 0.5;
		floor_2.isFilled = true;
		this.add(floor_2);

		// ballSpawner
		const ballSpawner = new BallSpawner(scene, 0, -738);
		this.add(ballSpawner);

		this.floor = floor;
		this.floor_1 = floor_1;
		this.floor_2 = floor_2;
		this.ballSpawner = ballSpawner;

		/* START-USER-CTR-CODE */
		// Write your code here.
		scene.time.delayedCall(5, () => this.init(), this);

		scene.input.on("pointerdown", ()=> this.spawnBall(), this)

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	floor;
	/** @type {Phaser.GameObjects.Rectangle} */
	floor_1;
	/** @type {Phaser.GameObjects.Rectangle} */
	floor_2;
	/** @type {BallSpawner} */
	ballSpawner;

	/* START-USER-CODE */
	currentBallLevel = 0;
	nextBallLevel = 0;

	onCoolDown;
	coolDownTime = 1000;

	// Write your code here.
	init()
	{

		this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) =>
		{
			event.pairs.forEach(pair =>
			{
				const { bodyA, bodyB } = pair;
				console.log(bodyA.label, bodyB.label);
				this.merge(pair);
			});
		});

		this.scene.matter.add.gameObject(this.floor, {isStatic: true});
		this.scene.matter.add.gameObject(this.floor_1, {isStatic: true});
		this.scene.matter.add.gameObject(this.floor_2, {isStatic: true});

		this.nextBallLevel = Phaser.Math.Between(0, 2);
		this.currentBallLevel = 0;

		this.ballSpawner.setPreview(this.currentBallLevel);
	}

	merge(pair)
	{
		if(pair.bodyA.label == "Ball" && pair.bodyB.label == "Ball")
		{
			if(pair.bodyA.gameObject == null || pair.bodyB.gameObject == null) {return;}
			if(pair.bodyA.gameObject.level == pair.bodyB.gameObject.level)
			{
				console.log("MERGE ACCEPTED")

				const midX = (pair.bodyA.gameObject.x + pair.bodyB.gameObject.x) / 2;
				const midY = (pair.bodyA.gameObject.y + pair.bodyB.gameObject.y) / 2;

				const newBall = new Ball(this.scene, 0, 0);
				this.add(newBall);

				newBall.x = midX;
				newBall.y = midY;

				newBall.setLevel(pair.bodyA.gameObject.level + 1);

				pair.bodyA.gameObject.destroy();
				pair.bodyB.gameObject.destroy();
			}
		}
	}

	spawnBall()
	{
		if(this.onCoolDown) return;

		const newBall = new Ball(this.scene, 0, 0);
		this.add(newBall);

		newBall.level = this.currentBallLevel;

		const pointer = this.scene.input.activePointer;
		let out = new Phaser.Math.Vector2();
		this.getLocalPoint(pointer.worldX, pointer.worldY, out);

		newBall.x = out.x;
		newBall.y = this.ballSpawner.y;

		this.currentBallLevel = this.nextBallLevel;
		this.nextBallLevel = Phaser.Math.Between(0, 2);

		this.ballSpawner.setPreview(this.currentBallLevel);

		this.onCoolDown = true;
		this.scene.time.delayedCall(this.coolDownTime, () => this.onCoolDown = false, this);		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

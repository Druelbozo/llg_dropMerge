
// You can write more code here

/* START OF COMPILED CODE */

import BallSpawner from "./BallSpawner.js";
import Text from "../ui/Text.js";
import StartMenu from "./StartMenu.js";
import DropMergeEndScreen from "./DropMergeEndScreen.js";
/* START-USER-IMPORTS */
import Ball from "./Ball.js";
import MergePartical from "./MergePartical.js";
/* END-USER-IMPORTS */

export default class DropMergeGame extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// backing
		const backing = scene.add.rectangle(0, 153, 1000, 1200);
		backing.alpha = 0.5;
		backing.isFilled = true;
		backing.fillColor = 12369084;
		this.add(backing);

		// BadZone
		const badZone = scene.add.rectangle(0, -1108, 1000, 1200);
		badZone.scaleX = 20;
		badZone.alpha = 0.5;
		badZone.isFilled = true;
		badZone.fillColor = 12812159;
		this.add(badZone);

		// wallContainer
		const wallContainer = scene.add.container(0, 0);
		this.add(wallContainer);

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
		const ballSpawner = new BallSpawner(scene, 0, -429);
		this.add(ballSpawner);

		// ballContainer
		const ballContainer = scene.add.container(0, 0);
		this.add(ballContainer);

		// text
		const text = new Text(scene, 346, -888);
		this.add(text);

		// nextBallPreivew
		const nextBallPreivew = scene.add.image(349, -785, "DI_Balls_Default", 0);
		nextBallPreivew.scaleX = 0.5;
		nextBallPreivew.scaleY = 0.5;
		this.add(nextBallPreivew);

		// startMenu
		const startMenu = new StartMenu(scene, 0, 0);
		this.add(startMenu);

		// dropMergeEndScreen
		const dropMergeEndScreen = new DropMergeEndScreen(scene, 0, 0);
		this.add(dropMergeEndScreen);

		// scoreText
		const scoreText = scene.add.text(0, -886, "", {});
		scoreText.setOrigin(0.5, 0.5);
		scoreText.text = "100,000";
		scoreText.setStyle({ "fontFamily": "Lato-Bold", "fontSize": "95px" });
		this.add(scoreText);

		// text (prefab fields)
		text.textValue = "Next";
		text.textSize = 64;
		text.font = "Lato-Bold";
		text.textType = "DOM";

		this.badZone = badZone;
		this.floor = floor;
		this.floor_1 = floor_1;
		this.floor_2 = floor_2;
		this.ballSpawner = ballSpawner;
		this.ballContainer = ballContainer;
		this.nextBallPreivew = nextBallPreivew;
		this.scoreText = scoreText;

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.group = scene.add.group({
			classType: MergePartical
		});

        scene.events.on('update', (time , delta) => this.update(time, delta), this);
		scene.input.on("pointerup", ()=> this.spawnBall(), this)
		scene.events.on("onStateChanged", (state) => this.onStateChanged(state), this);

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	badZone;
	/** @type {Phaser.GameObjects.Rectangle} */
	floor;
	/** @type {Phaser.GameObjects.Rectangle} */
	floor_1;
	/** @type {Phaser.GameObjects.Rectangle} */
	floor_2;
	/** @type {BallSpawner} */
	ballSpawner;
	/** @type {Phaser.GameObjects.Container} */
	ballContainer;
	/** @type {Phaser.GameObjects.Image} */
	nextBallPreivew;
	/** @type {Phaser.GameObjects.Text} */
	scoreText;

	/* START-USER-CODE */
	currentBallLevel = 0;
	nextBallLevel = 0;

	onCoolDown;
	coolDownTime = 500;

	active = false;

	ballInZone = false;
	ballsInZone = new Set();

	score = 0;
	currentScore = 0;
	scoreTween;

	group

	// Write your code here.

	awake()
	{
		//Show Start Screen	
	}

	start()
	{

		this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) =>
		{
			event.pairs.forEach(pair =>
			{
				const { bodyA, bodyB } = pair;

				if(pair.bodyA.label == "Ball" && pair.bodyB.label == "Ball")
				{
					this.merge(pair);
				}

				if(pair.bodyA.label === "Ball" && pair.bodyB.label === "EndZone" || pair.bodyA.label == "EndZone" && pair.bodyB.label == "Ball")
				{
					const other = pair.bodyA.label === "EndZone" ? pair.bodyB : pair.bodyA;
										console.log(other);


					this.ballInZone = this.ballsInZone.size > 0;
				}



			});
		});

		this.scene.matter.world.on('collisionend', (event, bodyA, bodyB) =>
		{
			event.pairs.forEach((pair) =>
			{
				const { bodyA, bodyB } = pair;

				if (pair.bodyA.label === "Ball" && pair.bodyB.label === "EndZone" || pair.bodyA.label == "EndZone" && pair.bodyB.label == "Ball")
				{
					const other = pair.bodyA.label === "EndZone" ? pair.bodyB : pair.bodyA;
					this.ballsInZone.delete(other);
					this.ballInZone = this.ballsInZone.size > 0;
				}
			});

		});

		this.scene.matter.add.gameObject(this.floor, {isStatic: true});
		this.scene.matter.add.gameObject(this.floor_1, {isStatic: true});
		this.scene.matter.add.gameObject(this.floor_2, {isStatic: true});

		this.scene.matter.add.gameObject(this.badZone, {isStatic: true, isSensor: true, label: "EndZone"});

		this.nextBallLevel = Phaser.Math.Between(0, 2);
		this.currentBallLevel = 0;

		this.ballSpawner.setPreview(this.currentBallLevel);
		this.setNextPreview();

		this.ballsInZone.clear();

		this.active = true;
		this.scene.matter.world.resume();
	}

	update(time, delta)
	{
		if(!this.active) return;
		for (const body of this.ballsInZone)
		{
			if (!body.gameObject || !body.gameObject.active)
			{
				this.ballsInZone.delete(body);
				continue;
			}

			if(body.gameObject.inPlay)
			{
				this.scene.stateManager.setState("gameOver", "DropMergeGame: Ball Passed Threshold Ending game")

			}
		}		
	}

	gameOver()
	{
		this.active = false;
		this.scene.matter.world.pause();
	}

	onStateChanged(state)
	{
		switch(state)
		{
			case "reset":
			this.awake();
			break;
			case "playing":
			this.start();
			break;
			case "gameOver":
			this.gameOver();
			break;
		}
	}

	merge(pair)
	{
		if(pair.bodyA.label == "Ball" && pair.bodyB.label == "Ball")
		{
			if(pair.bodyA.gameObject == null || pair.bodyB.gameObject == null) {return;}
			if(pair.bodyA.gameObject.level == pair.bodyB.gameObject.level)
			{

				const midX = (pair.bodyA.gameObject.x + pair.bodyB.gameObject.x) / 2;
				const midY = (pair.bodyA.gameObject.y + pair.bodyB.gameObject.y) / 2;

				let fx = this.group.get(midX, midY);
				this.add(fx);


				const newBall = new Ball(this.scene, 0, 0);
				this.ballContainer.add(newBall);

				newBall.x = midX;
				newBall.y = midY;

				fx.x = midX;
				fx.y = midY;


				newBall.setLevel(pair.bodyA.gameObject.level + 1);

				this.score += (pair.bodyA.gameObject.level + 1) * 100
				this.updateScore();

				fx.scale = newBall.scale + 0.5


				pair.bodyA.gameObject.destroy();
				pair.bodyB.gameObject.destroy();
			}
			else
			{
				pair.bodyA.gameObject.inPlay = true;
				pair.bodyB.gameObject.inPlay = true;
			}
		}
	}

	spawnBall()
	{
		if(this.onCoolDown || !this.active) return;

		const newBall = new Ball(this.scene, 0, 0);
		this.ballContainer.add(newBall);

		newBall.level = this.currentBallLevel;

		const pointer = this.scene.input.activePointer;
		let out = new Phaser.Math.Vector2();
		this.getLocalPoint(pointer.worldX, pointer.worldY, out);

		const pos = this.ballSpawner.getPosition();

		newBall.x = pos.x;
		newBall.y = this.ballSpawner.y;

		this.currentBallLevel = this.nextBallLevel;
		this.nextBallLevel = Phaser.Math.Between(0, 2);

		this.ballSpawner.setPreview(this.currentBallLevel);

		this.setNextPreview();

		this.onCoolDown = true;
		this.scene.time.delayedCall(this.coolDownTime, () => this.onCoolDown = false, this);		
	}

	setNextPreview()
	{
		if(this.scene.textures.exists("Balls"))
		{

			this.nextBallPreivew.setTexture("Balls", this.nextBallLevel);
		}
		else
		{
			this.nextBallPreivew.setTexture("DI_Balls_Default", this.nextBallLevel);
		}		
	}

	updateScore()
	{
		let val = {value: this.currentScore}
		this.scoreTween = this.scene.tweens.add
		({
			targets: val,
			value: this.score,
			duration: 500,
			ease: 'Linear',
			onUpdate: () =>
			{
				this.currentScore = val.value;
				this.scoreText.text = `${val.value.toFixed(0)}`;
    		}
		})		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

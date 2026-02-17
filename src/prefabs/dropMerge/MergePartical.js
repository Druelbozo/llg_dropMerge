
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MergePartical extends Phaser.GameObjects.Particles.ParticleEmitter {

	constructor(scene, x, y, texture, config) {
		super(scene, x ?? 0, y ?? 0, texture || "ui_star", {...{ scale: { start: 0.5, end: 0, ease: "Expo.easeInOut", random: false }, speed: { min: 450, max: 500, int: false }, lifespan: 500, duration: 1, frequency: 1, maxParticles: 8 }, ...config});

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

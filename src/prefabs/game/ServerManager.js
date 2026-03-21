
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { GameConfig } from '../../config/Global.js';
/* END-USER-IMPORTS */

export default class ServerManager extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.scene.events.on("scene-awake", ()=> this.init(), this)
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	gameSession;
	gameConfig;
	balance = 1000;

	static DEFAULT_GAMEPLAY = {
		type: "Normal",
		minBallSize: 0.5,
		maxBallSize: 3,
		maxBallLevel: 9,
	};

	// Write your code here.
	async init()
	{
		const registryCfg = this.scene.registry.get('preloadGameConfig')
			|| (typeof window !== 'undefined' && window.__selectedGameConfig)
			|| {};
		const d = ServerManager.DEFAULT_GAMEPLAY;
		this.gameConfig = {
			type: registryCfg.type ?? d.type,
			minBallSize: registryCfg.minBallSize ?? d.minBallSize,
			maxBallSize: registryCfg.maxBallSize ?? d.maxBallSize,
			maxBallLevel: registryCfg.maxBallLevel ?? d.maxBallLevel
		};

		const useSession = this.scene.registry.get('preloadUseSessionConfig');
		const minor = this.scene.registry.get('preloadOperatorBalance');
		if (useSession && minor != null) {
			this.balance = minor / 100;
		} else {
			this.balance = GameConfig.game.TEST_BALANCE_MINOR / 100;
		}

		//Remove Time Delay once logic is in
		this.scene.time.delayedCall(500, ()=> 
		{
			this.scene?.stateManager?.setState("reset", "ServerManager: Inital Set Up Complete Starting Game")
			this.scene.events.emit("server-awake", this);
		});
	}

	async buy()
	{
		this.scene?.stateManager?.setState("wait", "ServerManager: Awaiting Responce From Server ensuring no input")
		//Check Balance
		let balance = this.getBalance();
		//If Balance is high enough generate game session
		//This contains the win/loss, what icons show and anything else that should come from the server
		this.gameSession = 
		{
			seed: 89457238945072,
		};

		//Emit Balance event for objects to read it
		this.scene.events.emit("OnBalanceChanged", balance);

		//Return true is everything worked false if anything failed
		return new Promise((resolve, reject) => {resolve(true)});
	}

	async getBalance()
	{
		return this.balance;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

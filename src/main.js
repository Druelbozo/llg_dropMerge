import Level from "./scenes/Level.js";
import Preload from "./scenes/Preload.js";
import ResizeHandler from "./utils/game/ResizeHandler.js";
import ViewportHelper from "./utils/ui/ViewportHelper.js";
import ProviderAPIService from "./services/api/ProviderAPIService.js";
import { GameConfig } from "./config/Global.js";

const DROP_MERGE_DEFAULTS = {
	theme: 'default',
	type: 'Normal',
	minBallSize: 0.5,
	maxBallSize: 3,
	maxBallLevel: 9,
	creditValueMinor: 100,
	match: 3
};

function mergeDropMergeRuntimeConfig(fileConfig = {}, meta = {}) {
	const base = { ...DROP_MERGE_DEFAULTS, ...fileConfig };
	const scratchType = meta.scratchType;
	return {
		theme: meta.theme ?? base.theme ?? 'default',
		type: meta.type ?? base.type ?? 'Normal',
		minBallSize: meta.minBallSize ?? base.minBallSize ?? 0.5,
		maxBallSize: meta.maxBallSize ?? base.maxBallSize ?? 3,
		maxBallLevel: meta.maxBallLevel ?? base.maxBallLevel ?? 9,
		creditValueMinor: meta.creditValueMinor ?? base.creditValueMinor ?? 100,
		paytableId: meta.paytableId ?? base.paytableId,
		match: meta.match ?? base.match ?? 3,
		subcategory: scratchType === 'poker' ? 'poker' : (base.subcategory ?? 'card'),
		pokerType: meta.pokerType ?? base.pokerType,
		scheduleCode: meta.scheduleCode ?? base.scheduleCode,
		currencyCode: meta.currencyCode ?? base.currencyCode,
		credits: meta.credits ?? base.credits
	};
}

function getSessionIdFromUrl() {
	const read = (win) => {
		try {
			return new URLSearchParams(win.location.search).get('sessionId');
		} catch (_) {
			return null;
		}
	};
	return read(window) || read(window.parent) || read(window.top);
}

window.addEventListener('load', async function () {

	const sessionId = getSessionIdFromUrl();
	if (sessionId) {
		window.__sessionId = sessionId;
		window.__selectedGameConfig = mergeDropMergeRuntimeConfig({}, {});
	} else {
		try {
			const { loadSelectedConfig, getSelectedConfigName, DEFAULT_CONFIG } = await import('./config/game/game-config.js');
			let raw = await loadSelectedConfig();
			if (!raw) {
				const name = getSelectedConfigName() || DEFAULT_CONFIG;
				raw = { theme: name };
				console.warn('Game config failed to load, using fallback theme:', name);
			}
			window.__selectedGameConfig = mergeDropMergeRuntimeConfig(raw, {});
		} catch (err) {
			console.error('Failed to load game config:', err);
			window.__selectedGameConfig = mergeDropMergeRuntimeConfig({ theme: 'default' }, {});
		}
	}

	let initialWidth = ViewportHelper.getWidth();
	let initialHeight = ViewportHelper.getHeight();

	if (initialWidth < 100 || initialHeight < 100)
	{
		initialWidth = window.innerWidth;
		initialHeight = window.innerHeight;
	}

	var game = new Phaser.Game
	({
		width: initialWidth,
		height: initialHeight,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		parent: 'game-container',
		scale: {
			mode: Phaser.Scale.RESIZE,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics: {
			default: 'matter',
			matter: {
				debug: false,
				gravity:
				{
					x: 0, y: 1
				}
			}
		},
		dom:{
    			createContainer: true,
			},
	});

	game.global =
	{
		referenceScreenWidth: 1920,
		referenceScreenHeight: 1080
	};

	const ensureCorrectSize = () =>
	{
		const viewportWidth = ViewportHelper.getWidth();
		const viewportHeight = ViewportHelper.getHeight();
		if (game.scale.width !== viewportWidth || game.scale.height !== viewportHeight) {
			game.scale.resize(viewportWidth, viewportHeight);
			game.scale.refresh();
		}
	};

	ensureCorrectSize();
	setTimeout(ensureCorrectSize, 50);
	setTimeout(ensureCorrectSize, 200);

	const onChangeScreen = () => 
	{
    	if (game.scene.scenes.length > 0)
		{
			let currentScene = game.scene.scenes[0];
			if (currentScene instanceof Level && typeof currentScene.resize === 'function')
			{
				currentScene.resize();
			}
		}
	}

	const resizeHandler = new ResizeHandler(game, {
		enableLogging: false,
		pollingInterval: 250,
		focusDelay: 100
	});

	game.scale.on('resize', onChangeScreen);

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	async create() {

		let config = window.__selectedGameConfig || {};
		this.registry.set('preloadUseSessionConfig', false);

		if (window.__sessionId) {
			const providerAPI = new ProviderAPIService();
			if (!providerAPI.sessionId) {
				providerAPI.sessionId = window.__sessionId;
				providerAPI.isSessionMode = true;
			}
			try {
				const sessionInfo = await providerAPI.getSessionInfo();
				const meta = sessionInfo.gameMetadata || {};
				config = mergeDropMergeRuntimeConfig({}, meta);
				window.__selectedGameConfig = config;

				const mode = sessionInfo.mode || providerAPI.mode || 'demo';
				const operatorBalance = sessionInfo.operatorBalance;
				this.registry.set('preloadSessionId', window.__sessionId);
				this.registry.set('preloadSessionMode', mode);
				this.registry.set('preloadUseSessionConfig', true);
				if (mode === 'real' && operatorBalance != null) {
					this.registry.set('preloadOperatorBalance', operatorBalance);
				} else {
					this.registry.set('preloadOperatorBalance', GameConfig.game.SESSION_DEMO_BALANCE_MINOR);
				}
			} catch (err) {
				console.error('Boot: Failed to fetch session:', err);
				window.__sessionId = null;
				try {
					const { loadSelectedConfig } = await import('./config/game/game-config.js');
					const fileCfg = await loadSelectedConfig();
					config = mergeDropMergeRuntimeConfig(fileCfg || {}, {});
				} catch {
					config = mergeDropMergeRuntimeConfig({}, {});
				}
				window.__selectedGameConfig = config;
				this.registry.set('preloadSessionId', null);
				this.registry.set('preloadOperatorBalance', GameConfig.game.SESSION_DEMO_BALANCE_MINOR);
				this.registry.set('preloadSessionMode', 'demo');
				this.registry.set('preloadUseSessionConfig', false);
			}
		}

		this.registry.set('preloadGameConfig', config);
		this.scene.start("Preload");
	}
}

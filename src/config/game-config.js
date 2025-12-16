/**
 * Dynamic Game Configuration Selector
 *
 * Selects a configuration module from /src/config at runtime based on:
 * 1) URL query parameter: ?config=piggy
 * 2) Fallback: neon-number-merge
 *
 * All config files must share the same schema.
 */

import neonNumberMergeConfig from './neon-number-merge.js';

const AVAILABLE_CONFIGS = {
    'neon-number-merge': neonNumberMergeConfig,
};

function getSelectedConfigName() {
    try {
        // Read from current window, then parent/top (Phaser Editor external runner may iframe the game)
        const readParam = (win) => {
            try {
                return new URLSearchParams(win.location.search).get('config');
            } catch (_) { return null; }
        };

        const fromQuery = readParam(window) || readParam(window.parent) || readParam(window.top);
        if (fromQuery && AVAILABLE_CONFIGS[fromQuery]) {
            return fromQuery;
        }
    } catch (_) {
        // In non-browser contexts, fall through to neon-number-merge
    }
    return 'neon-number-merge';
}

const selectedName = getSelectedConfigName();
const gameConfig = AVAILABLE_CONFIGS[selectedName] || AVAILABLE_CONFIGS['neon-number-merge'];

export default gameConfig;
export { selectedName as configName };

let config = {
    authServer: "https://example.com",
    shouldUseHTTPS: true
}
function redirect(url) {
    window.location.href = url
    return window.location
}
/**
 * An object representing the configuration for the authentication process.
 * @typedef {Object} Config
 * @property {string} callback
 * @property {string} backendUrl
 * @property {string} authServer
 * @property {boolean} shouldUseHTTPS
 */

/**
 * Initializes the configuration with the provided settings.
 * @param {Config} _config - The configuration object containing callback and backendUrl.
 */

export function init(_config) {
    for (const key in _config) {
        config[key] = _config[key]
    }
}

export function startAuth() {
    const url = new URL(config.authServer)
    if (config.shouldUseHTTPS) {
        url.protocol = "https:"
    } else {
        url.protocol = "http:"
    }
    url.pathname = `/auth/${encodeURI(config.backendUrl)}`
    url.searchParams.set("callback", config.callback)
    return redirect(url.href)
}

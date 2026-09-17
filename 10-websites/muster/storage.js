/* Shared localStorage helpers used across the Muster site suite.
   Every site that persists data (tasks, transactions, favorites, messages,
   etc.) reads and writes through these two functions instead of repeating
   its own try/catch boilerplate. */

function getJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (raw) {
            return JSON.parse(raw);
        }
    } catch (e) {
        console.warn('Could not read "' + key + '" from storage.', e);
    }
    return fallback;
}

function setJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('Could not save "' + key + '" to storage.', e);
    }
}

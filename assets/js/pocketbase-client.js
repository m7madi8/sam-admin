// PocketBase client singleton
// Override URL by setting window.POCKETBASE_URL before this script loads (e.g. in index.html).
const POCKETBASE_URL = typeof window !== 'undefined' && window.POCKETBASE_URL
    ? window.POCKETBASE_URL
    : 'https://your-pocketbase-url.com';

let pocketBaseClientInstance = null;

function getPocketBaseClient() {
    if (!window.PocketBase) {
        throw new Error('PocketBase SDK not loaded');
    }
    if (!pocketBaseClientInstance) {
        pocketBaseClientInstance = new window.PocketBase(POCKETBASE_URL);
    }
    return pocketBaseClientInstance;
}


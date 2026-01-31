// PocketBase client singleton
const POCKETBASE_URL = 'https://your-pocketbase-url.com';

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


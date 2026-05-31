import { delay } from './utils.js';

export async function getHello() {
    await delay();
    return { message: 'Hello from frontend mock API!' };
}

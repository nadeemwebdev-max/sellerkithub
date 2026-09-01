import { dev } from 'astro';

const server = await dev({
  root: '.'
});

console.log(`Astro dev server listening on http://localhost:${server.address.port || 4321}`);

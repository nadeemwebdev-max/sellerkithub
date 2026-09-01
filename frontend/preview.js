import { preview } from 'astro';

const server = await preview({
  root: '.'
});

console.log(`Astro preview server listening on http://localhost:${server.address.port || 4321}`);

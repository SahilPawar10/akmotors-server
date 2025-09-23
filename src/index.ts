import path from "node:path";

console.log("✅ Running with ESM!");
console.log("Current fileeese:", path.basename(import.meta.url));

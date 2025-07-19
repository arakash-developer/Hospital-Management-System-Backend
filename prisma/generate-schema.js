const fs = require('fs');
const path = require('path');

const HEADER = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

const modelsDir = path.join(__dirname, 'models');
const outputPath = path.join(__dirname, 'schema.prisma');

// Read and combine all model files
const files = fs.readdirSync(modelsDir).filter(file => file.endsWith('.prisma'));
const models = files.map(file => fs.readFileSync(path.join(modelsDir, file), 'utf-8')).join('\n\n');

// Write to schema.prisma
fs.writeFileSync(outputPath, `${HEADER}\n\n${models}`);
console.log('✅ Prisma schema.prisma generated!');

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

// Map sizes first to avoid full hashing 2GB if possible (optimization)
// Actually hashing 2GB takes a few seconds in Node, it's fine.
const framesDir = 'src/assets/frames';
const frameSizes = new Map();

for (const f of fs.readdirSync(framesDir)) {
    if (!f.endsWith('.png')) continue;
    const match = f.match(/frame-(\d+)/);
    if (match) {
        const num = match[1];
        const stat = fs.statSync(path.join(framesDir, f));
        if (!frameSizes.has(stat.size)) {
            frameSizes.set(stat.size, []);
        }
        frameSizes.get(stat.size).push({ num, file: f });
    }
}

const targetDirs = [
    'src/assets/enviromental conservation',
    'src/assets/animal welfare',
    'src/assets/arts',
    'src/assets/children hospitals'
];

const results = {};

for (const dir of targetDirs) {
    results[dir] = {};
    if (!fs.existsSync(dir)) {
        results[dir] = "Directory not found";
        continue;
    }
    
    for (const f of fs.readdirSync(dir)) {
        const filePath = path.join(dir, f);
        if (fs.statSync(filePath).isFile()) {
            const stat = fs.statSync(filePath);
            const candidates = frameSizes.get(stat.size) || [];
            
            if (candidates.length === 1) {
                results[dir][f] = candidates[0].num;
            } else if (candidates.length > 1) {
                // collision, use hash
                const hashTarget = getHash(filePath);
                let found = "Not Found";
                for (const c of candidates) {
                    if (getHash(path.join(framesDir, c.file)) === hashTarget) {
                        found = c.num;
                        break;
                    }
                }
                results[dir][f] = found;
            } else {
                results[dir][f] = "Not Found (size mismatch)";
            }
        }
    }
}

console.log(JSON.stringify(results, null, 2));

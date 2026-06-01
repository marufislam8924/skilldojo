#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'seoPages.js');
let content = fs.readFileSync(filePath, 'utf8');

const titleRegex = /title:\s*"([^"]*)"/g;
const matches = [];
let m;
while ((m = titleRegex.exec(content)) !== null) {
  matches.push({ title: m[1], index: m.index, length: m[0].length });
}

function findRepeatedAdjacentPhrase(title) {
  const tokens = title.split(/\s+/);
  const normTok = (tok) => tok.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '').toLowerCase();

  const n = tokens.length;
  for (let L = Math.floor(n / 2); L >= 1; L--) {
    for (let i = 0; i + 2 * L <= n; i++) {
      const a = tokens.slice(i, i + L).map(normTok).join(' ');
      const b = tokens.slice(i + L, i + 2 * L).map(normTok).join(' ');
      if (a && a === b) {
        // return info about the repetition
        const original = tokens.slice(i, i + 2 * L).join(' ');
        const cleaned = tokens.slice(0, i).concat(tokens.slice(i, i + L)).concat(tokens.slice(i + 2 * L)).join(' ');
        return { index: i, length: L, original, cleaned };
      }
    }
  }
  return null;
}

let found = false;
for (const entry of matches) {
  const title = entry.title;
  const dup = findRepeatedAdjacentPhrase(title);
  if (dup) {
    found = true;
    console.log('Duplicate phrase found in title:');
    console.log('  Title:  ', JSON.stringify(title));
    console.log('  Match:  ', JSON.stringify(dup.original));
    console.log('  Suggest:', JSON.stringify(dup.cleaned));
    console.log('');
  }
}

if (!found) console.log('No duplicate adjacent phrases found in titles.');

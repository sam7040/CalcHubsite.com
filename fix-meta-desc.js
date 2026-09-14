#!/usr/bin/env node
/**
 * Script to add id="metaDesc" to <meta name="description"> tags
 * across all 48 calculator pages (8 calculators × 6 languages)
 */

const fs = require('fs');
const path = require('path');

const calculators = [
  'age-calculator',
  'calorie-calculator',
  'countdown-calculator',
  'percentage-calculator',
  'date-calculator',
  'bmi-calculator',
  'emi-calculator',
  'time-calculator'
];

const languages = ['en', 'hi', 'es', 'pt', 'ru', 'zh'];

let filesChanged = 0;
let errors = [];

// Process English pages (root directory)
calculators.forEach(calc => {
  const filePath = path.join(__dirname, calc, 'index.html');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has id="metaDesc"
    if (content.includes('id="metaDesc"')) {
      console.log(`✓ ${filePath} - already has id="metaDesc"`);
      return;
    }
    
    // Add id="metaDesc" to meta description tag
    const updated = content.replace(
      /<meta name="description" content="/,
      '<meta id="metaDesc" name="description" content="'
    );
    
    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      filesChanged++;
      console.log(`✓ Fixed: ${filePath}`);
    } else {
      errors.push(`${filePath} - pattern not found or already fixed`);
    }
  } else {
    errors.push(`${filePath} - file not found`);
  }
});

// Process language-specific pages
languages.forEach(lang => {
  calculators.forEach(calc => {
    const filePath = path.join(__dirname, lang, calc, 'index.html');
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Check if already has id="metaDesc"
      if (content.includes('id="metaDesc"')) {
        console.log(`✓ ${filePath} - already has id="metaDesc"`);
        return;
      }
      
      // Add id="metaDesc" to meta description tag
      const updated = content.replace(
        /<meta name="description" content="/,
        '<meta id="metaDesc" name="description" content="'
      );
      
      if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        filesChanged++;
        console.log(`✓ Fixed: ${filePath}`);
      } else {
        errors.push(`${filePath} - pattern not found or already fixed`);
      }
    } else {
      errors.push(`${filePath} - file not found`);
    }
  });
});

console.log(`\n✅ Total files changed: ${filesChanged}`);
if (errors.length > 0) {
  console.log(`⚠️  Warnings: ${errors.length}`);
  errors.forEach(err => console.log(`  - ${err}`));
}

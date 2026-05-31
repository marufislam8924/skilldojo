const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', '@supabase', 'ssr', 'tsconfig.json');

try {
  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
    console.log('Removed:', target);
  } else {
    // No-op when file doesn't exist
    // console.log('No tsconfig found at', target);
  }
} catch (err) {
  console.error('Failed to remove tsconfig:', err.message);
  // swallow errors so postinstall doesn't fail the install
}

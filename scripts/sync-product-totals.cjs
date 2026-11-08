const { loadEnvConfig } = require('@next/env');
const mongoose = require('mongoose');

// Preview by default; pass --write to repair existing totals.
async function main() {
  loadEnvConfig(process.cwd());
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'Avanti' });
  try {
    const products = mongoose.connection.collection('products');
    const stock = { $objectToArray: '$sizes_all' };
    const total = {
      $map: {
        input: stock,
        as: 'shop',
        in: {
          shop: { $toInt: '$$shop.k' },
          q: {
            $sum: {
              $map: {
                input: '$$shop.v',
                as: 'size',
                in: { $convert: { input: '$$size.q', to: 'double', onError: 0, onNull: 0 } },
              },
            },
          },
        },
      },
    };
    // Leave legacy documents without per-size stock untouched.
    const filter = { sizes_all: { $type: 'object' } };
    console.log('Products with per-size stock:', await products.countDocuments(filter));
    if (process.argv.includes('--write')) {
      const result = await products.updateMany(filter, [{ $set: { total } }]);
      console.log('Products updated:', result.modifiedCount);
    } else {
      console.log('Preview only. Run with --write to recalculate total from sizes_all.');
    }
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(() => {
  console.error('Stock sync failed. Check the database connection and sizes_all data.');
  process.exitCode = 1;
});

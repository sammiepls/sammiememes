/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  contentfulSpaceID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFL_ACCESS_TOKEN,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

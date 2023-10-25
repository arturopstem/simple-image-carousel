const path = require.context('./assets', false, /\.jpg$/);
const imagesArray = path.keys().map(path);

export default imagesArray;

// refactored based on https://medium.com/dailyjs/leveraging-webpack-power-to-import-all-files-from-one-folder-cddedd3201b3

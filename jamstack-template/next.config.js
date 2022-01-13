const path = require('path')

module.exports = {
  reactStrictMode: true,
  //追加
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

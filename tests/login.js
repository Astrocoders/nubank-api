const NuBank = require('./index.js').default()

NuBank.getLoginToken({ password: 'YOUR_PASSWORD', login: 'YOUR_CPF_NO_DASHES_OR_DOTS' }).then(() => {
  NuBank.getWholeFeed().then(r => console.log(r))
})

NuBank API
==========

Not related to NuBank Inc.

## Install
```
yarn add nubank
# or
npm i --save nubank
```

# Usage
First of all you need to sign in to your account using your credentials:

```js
import createNuBank from 'nubank'
const NuBank = createNuBank()

NuBank.getLoginToken({
  password: 'i_luv_c4ts',
  login: 'YOUR_CPF', // no dashes nor dots!
}).then(r => console.log(`I'm in!`))

// After signing you can now fetch your whole feed
// since the very beginning of your relationship with NuBank <3

NuBank
  .getWholeFeed()
  .then(history => {
    // ... doing some neat personal analysis ...
    // ... jeez, too much money spent on candies and coffee ...
  })
```

## Thanks
For NuBank for having such a great API! 

## Notes
This API _IS NOT_ a official API from NuBank Inc. but it does use the same REST api that
their web app uses.

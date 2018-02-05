NuBank API
==========
[![travis](https://travis-ci.org/Astrocoders/nubank-api.svg?branch=develop)](https://travis-ci.org/Astrocoders/nubank-api)
[![Test Coverage](https://codeclimate.com/repos/580b95b28039330d4c0040e2/badges/a005df44d49d97fbe561/coverage.svg)](https://codeclimate.com/repos/580b95b28039330d4c0040e2/coverage)
[![Code Climate](https://codeclimate.com/repos/580b95b28039330d4c0040e2/badges/a005df44d49d97fbe561/gpa.svg)](https://codeclimate.com/repos/580b95b28039330d4c0040e2/feed)

Not related to NuBank Inc.

## Install
```
yarn add nubank
# or
npm i --save nubank
```

## Is it ok to use this? NuBank won't block me?

As of this tweet, seems that there is no problem in using this!
https://twitter.com/nubankbrasil/status/766665014161932288

# Usage
First of all you need to sign in to your account using your credentials:

```js
import createNuBank from 'nubank'
const NuBank = createNuBank()

NuBank.getLoginToken({
  password: 'i_luv_c4ts',
  login: 'YOUR_CPF', // no dashes nor dots!
}).then(response => console.log(`I'm in!`)) // just need to call this once

// After signing you can now fetch your whole feed
// since the very beginning of your relationship with NuBank <3

NuBank
  .getWholeFeed()
  .then(history => {
    // ... doing some neat personal analysis ...
    // ... jeez, too much money spent on candies and coffee ...

    // history is something like:
    [
     { description: 'Netflix Com',
       category: 'transaction',
       amount: 2290,
       time: '2016-09-06T09:22:00Z',
       title: 'serviços',
       details: [Object],
       id: '57ce8ab9-016d-4060-907d-4e5f4306483f',
       _links: [Object],
       href: 'nuapp://transaction/57ce8ab9-016d-4060-907d-4e5f4306483f'
     }, ...]
  })
```

## API
### NuBank.getCustomer
Gets your customer related information
_You must have called getLoginToken first._
```
NuBank.getCustomer().then(customer => console.log(customer))
// The customer object contains your name, address, devices
// reported income, etc.
```
### NuBank.getCustomerAccount
Gets your credit card account information.
_You must have called getLoginToken first._
```
NuBank.getCustomerAccount().then(account => console.log(account))
// The account object contains your credit limit, current balance,
// interest rate, bill's due day, net related info, etc.
```

## Thanks
For NuBank for having such a great API! 

## Notes
This API _IS NOT_ a official API from NuBank Inc. but it does use the same REST api that
their web app uses.

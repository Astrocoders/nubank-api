import fetch from 'node-fetch'
import { isEmpty } from 'lodash'
import apiURIs from './api_uris'

/* eslint-disable quote-props */
export const REQUEST_HEADERS_SAUCE = {
  'Content-Type': 'application/json',
  'X-Correlation-Id': 'WEB-APP.jO4x1',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  'Origin': 'https://conta.nubank.com.br',
  'Referer': 'https://conta.nubank.com.br/',
}
/* eslint-enable quote-props */

export default function(){
  let signInData = {}

  function withSignedInUser(fn){
    return (...args) => {
      if(isEmpty(signInData)){
        throw new Error('[NuBank] You must sign in first')
      }

      return fn(...args)
    }
  }

  return {
    getLoginToken: ({ password, login }) => (
      fetch(apiURIs.token, {
        body: JSON.stringify({
          password,
          login,
          grant_type: 'password',
          client_id: 'other.conta',
          client_secret: 'yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO',
        }),
        method: 'POST',
        headers: {
          ...REQUEST_HEADERS_SAUCE,
        },
      })
      .then(res => res.json())
      /* eslint-disable no-return-assign */
      .then(data => signInData = data)
      /* eslint-enable no-return-assign */
    ),

    /**
     * Fetches user related data
     * @return {object} customer
    */
    @withSignedInUser
    getCustomer: () => (
      fetch(apiURIs.customers, {
        headers: {
          ...REQUEST_HEADERS_SAUCE,
          Authorization: `Bearer ${signInData.access_token}`,
        },
      })
      .then(res => res.json())
    ),

    /**
     * Fetches credit card account related data
     * @return {object} account
    */
    @withSignedInUser
    getCustomerAccount: () => (
      fetch(signInData._links.account.href, {
        headers: {
          ...REQUEST_HEADERS_SAUCE,
          Authorization: `Bearer ${signInData.access_token}`,
        },
      })
      .then(res => res.json())
    ),

    /**
     * Fetches all transaction history since the very beginning
     * @returns {object} history
    */
    @withSignedInUser
    getWholeFeed: () => (
      fetch(signInData._links.events.href, {
        headers: {
          ...REQUEST_HEADERS_SAUCE,
          Authorization: `Bearer ${signInData.access_token}`,
        },
      }).then(res => res.json())
    ),

    get signInData(){ return signInData },
  }
}

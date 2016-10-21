import fetch from 'node-fetch'
import { isEmpty } from 'lodash'
import apiURIs from './api_uris'

const REQUEST_HEADERS_SAUCE = {
  'Content-Type': 'application/json',
  'X-Correlation-Id': 'WEB-APP.jO4x1',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
  'Origin': 'https://conta.nubank.com.br',
  'Referer': 'https://conta.nubank.com.br/'
}

export default function(){
  let signInData = {}

  return {
    getLoginToken({ password, login }){
      return fetch(apiURIs.token, {
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
      .then(data => signInData = data)
    },

    /**
     * Fetchs all transaction history since the very beginning
     * @returns {object} history
    */
    getWholeFeed(){
      if(isEmpty(signInData)){
        throw new Error('[NuBank] You must sign in first')
      }

      return fetch(signInData._links.events.href, {
        headers: {
          Authorization: `Bearer ${signInData.access_token}`,
          ...REQUEST_HEADERS_SAUCE,
        }
      }).then(res => res.json())
    },

    get signInData(){ return signInData }
  }
}

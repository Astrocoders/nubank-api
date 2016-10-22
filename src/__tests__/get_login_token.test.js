import createNuBank, {
  REQUEST_HEADERS_SAUCE,
} from '../index'
import apiURIs from'../api_uris'

jest.mock('node-fetch', () => jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({value: 1}),
})))

describe('NuBank.getLoginToken', () => {
  const NuBank = createNuBank()
  const credentials = { login: 'CPF', password: 'password' }
  const fetch = require('node-fetch')

  
  it('should not throw on call', () => {
    return NuBank
      .getLoginToken(credentials)
      .then(d => expect(d).toEqual({value: 1}))
  })

  it('should have called fetch', () => {
    expect(fetch).toBeCalled()
  })

  it('should call the token endpoint', () => {
    expect(fetch.mock.calls[0][0]).toEqual(apiURIs.token)
  })

  it('should do a POST request', () => {
    expect(fetch.mock.calls[0][1].method).toEqual('POST')
  })

  it('should set the right request body', () => {
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
      ...credentials,
      grant_type: 'password',
      client_id: 'other.conta',
      client_secret: 'yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO',
    })
  })

  it('should use the right request headers', () => {
    expect(fetch.mock.calls[0][1].headers).toEqual(REQUEST_HEADERS_SAUCE)
  })

  it('should set closure variable signInData at the end', () => {
    Promise.all()
    expect(NuBank.signInData).toEqual({value: 1})
  })
})

import createNuBank from '../index'


test('should return a object on createNuBank', () => {
  const NuBank = createNuBank()
  expect(NuBank).toBeDefined()
})


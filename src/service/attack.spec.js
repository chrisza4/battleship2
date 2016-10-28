import { expect } from 'chai'
import * as Attack from './attack'
import { createMockShip } from './fixtures'
import Sinon from 'sinon'

describe('Attack service', () => {

  function assertThrowPromise (promiseFunc, done) {
    return promiseFunc.then(d => done('should throw'))
  }

  it('should assert schemas', (done) => {
    assertThrowPromise(Attack.placeAttack({
      coordinates: {
        a: 1,
        b: 2
      },
    }), done)
    .catch(err => {
      done()
    })
  })

  it('should throw if attack is duplicated', (done) => {
    const mockData = {
      getAttackByLatestRound: () => Promise.resolve([
        { coordinates: { x: 0, y: 0 } }
      ])
    }
    assertThrowPromise(Attack.placeAttack({
      coordinates: {
        x: 0,
        y: 0
      }
    }, mockData), done).catch(err => {
      expect(err.message).to.equal('Attack duplicated')
      done()
    })
  })

  it('should not be able to play if board is not ready (ship is place less than 10)', done => {
    const mockData = {
      getShipsByLatestRound () {
        const ships = [ ]
        for (let i = 0; i < 9; i++) {
          ships.push(createMockShip())
        }
        return Promise.resolve(ships)
      },
      getAttackByLatestRound: () => Promise.resolve([ ])
    }
    return assertThrowPromise(Attack.placeAttack({
      coordinates: {
        x: 0,
        y: 0
      }
    }, mockData), done).catch(err => {
      expect(err.message).to.equal('Board is not ready')
      done()
    })
  })

  it('should save data if attack is passed prerequisted', async () => {
    let isSaveCalled = false
    const mockData = {
      getShipsByLatestRound () {
        const ships = [ ]
        for (let i = 0; i < 10; i++) {
          ships.push(createMockShip())
        }
        return Promise.resolve(ships)
      },
      getAttackByLatestRound: () => Promise.resolve([ ]),
      saveAttack: () => {
        isSaveCalled = true
        return Promise.resolve({ })
      }
    }
    await Attack.placeAttack({
      coordinates: {
        x: 0,
        y: 0
      }
    }, mockData)
    expect(isSaveCalled).to.be.true
  })

  it('should return hit if board is hit', async () => {
    const mockData = {
      getShipsByLatestRound () {
        const ships = [ ]
        for (let i = 0; i < 10; i++) {
          ships.push(createMockShip())
        }
        return Promise.resolve(ships)
      },
      getAttackByLatestRound: () => Promise.resolve([ ]),
      saveAttack: () => {
        return Promise.resolve({ })
      }
    }
    const result = await Attack.placeAttack({
      coordinates: {
        x: 0,
        y: 0
      }
    }, mockData)
    expect(result.message).to.equal('hit')
  })

  it('should begin next round if board is done', async () => {
    const mockData = {
      getShipsByLatestRound () {
        const ships = [ ]
        for (let i = 0; i < 10; i++) {
          ships.push(createMockShip({
            shipTypes: 4
          }))
        }
        return Promise.resolve(ships)
      },
      getAttackByLatestRound: () => Promise.resolve([ ]),
      saveAttack: () => {
        return Promise.resolve({ })
      },
      newRound: Sinon.stub().returns(Promise.resolve([ ]))
    }
    await Attack.placeAttack({
      coordinates: {
        x: 0,
        y: 0
      }
    }, mockData)
    expect(mockData.newRound.called).to.be.true
  })
})
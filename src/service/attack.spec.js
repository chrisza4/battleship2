import { expect } from 'chai'
import * as Attack from './attack'
import { createMockShip } from './fixtures'

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

  it.skip('should throw if attack is duplicated', (done) => {
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

  it.skip('should not be able to play if board is not ready (ship is place less than 10)', done => {
    const mockData = {
      getShipsByLatestRound () {
        const ships = [ ]
        for (let i = 0; i < 9; i++) {
          ships.push(createMockShip())
        }
        return Promise.resolve(ships)
      }
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
})
import { expect } from 'chai'
import * as AttackUtils from './attack-utils'
import { createMockShip, createMockAttack } from './fixtures'

describe('IsBoardReadyToPlay', () => {
  it('should not be ready to play if ship is place less than 10', () => {
    expect(AttackUtils.isBoardReadyToPlay([])).to.be.false
  })

  it('should not be ready to play if ship is place 10', () => {
    expect(AttackUtils.isBoardReadyToPlay([
      1,2,3,4,5,6,7,8,9,10
    ])).to.be.true
  })

  it('should return false if data input is not array', () => {
    expect(AttackUtils.isBoardReadyToPlay(1)).to.be.false
  })
})

describe('getHitableSpaces', () => {
  it('should return all hitable spaces for ships in each round', () => {
    const ship1 = createMockShip({
      shipTypes: 1,
      coordinates: {
        x: 1,
        y: 1
      },
      direction: 'vertical',
    })
    const ship2 = createMockShip({
      shipTypes: 4,
      coordinates: {
        x: 9,
        y: 9
      },
      direction: 'vertical',
    })
    const expected = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 9, y: 9 }
    ]
    expect(AttackUtils.getHitableSpaces([ ship1, ship2 ])).to.deep.equal(expected)
  })

  it('should throw if some ships in another round is mixing in', () => {
    const ship1 = createMockShip({
      roundId: 'round1'
    })
    const ship2 = createMockShip({
      roundId: 'round2'
    })
    const func = () => AttackUtils.getHitableSpaces([ ship1, ship2 ])
    expect(func).to.throw()
  })
})

describe('getAttackResult', () => {
  it('should miss if no ship is hit', () => {
    const ship1 = createMockShip({
      shipTypes: 1,
      coordinates: {
        x: 1,
        y: 1
      },
      direction: 'vertical',
    })
    const attack1 = createMockAttack({
      coordinates: {
        x: 0,
        y: 0
      }
    })
    expect(AttackUtils.getAttackResult(attack1, [ ], [ ship1 ])).to.equal('miss')
  })

  it('should end the game if all ship is hit', () => {
    const ship1 = createMockShip({
      shipTypes: 2,
      coordinates: {
        x: 1,
        y: 1
      },
      direction: 'vertical',
    })
    const attack1 = createMockAttack({
      coordinates: {
        x: 1,
        y: 1
      },
    })
    const attack2 = createMockAttack({
      coordinates: {
        x: 1,
        y: 2
      },
    })
    const attack3 = createMockAttack({
      coordinates: {
        x: 1,
        y: 3
      },
    })
    expect(AttackUtils.getAttackResult(attack1, [ attack2, attack3 ], [ ship1 ])).to.equal('won')
  })
})
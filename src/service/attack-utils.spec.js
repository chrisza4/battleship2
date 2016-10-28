import { expect } from 'chai'
import * as AttackUtils from './attack-utils'

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
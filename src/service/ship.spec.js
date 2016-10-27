import { expect } from 'chai'
import * as Ship from './ship'

describe('Ship service', () => {

  function assertThrowPromise (promiseFunc, done) {
    return promiseFunc.then(d => done('should throw'))
  }

  it('should assert ship types', (done) => {
    Ship.place({
      shipTypes: 6,
      coordinates: {
        a: 1,
        b: 2
      },
      direction: 'vertical',
      roundId: 'round1'
    }).then(result => {
      done('should not pass')
    })
    .catch(err => {
      done()
    })
  })

  it('should assert ship coordinate', (done) => {
    Ship.place({
      shipTypes: 2,
      coordinates: {
        a: 1,
        b: 2
      },
      direction: 'vertical',
      roundId: 'round1'
    }).then(result => {
      done('should not pass')
    })
    .catch(err => {
      done()
    })
  })

  it('should assert ship coordinate', (done) => {
    return Ship.place({
      shipTypes: 2,
      coordinates: {
        a: 1,
        b: 2
      },
      direction: 'vertical',
      roundId: 'round1'
    }).then(result => {
      done('should not pass')
    })
    .catch(err => {
      done()
    })
  })

  it('should assert direction', done => {
    assertThrowPromise(Ship.place({
      shipTypes: 2,
      coordinates: {
        x: 1,
        y: 2
      },
      direction: 'xxxx',
      roundId: 'round1'
    }), done)
    .catch(err => {
      done()
    })
  })

  it('should not be able to place ship on top of other', done =>{
    const mockDataLayer = {
      getShipsByLatestRound: () => Promise.resolve([
        { 
          shipTypes: 4,
          coordinates: {
            x: 0,
            y: 0
          },
          direction: 'vertical'
        }
      ])
    }
    const shipToPlace = {
      shipTypes: 2,
      coordinates: {
        x: 0,
        y: 0
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    assertThrowPromise(Ship.place(shipToPlace, mockDataLayer), done).catch(err => {
      expect(err.message).to.equal('Illegal placement: too near to another ship')
      done()
    })
  })

  it('should not be able to place ship near each other', done =>{
    const mockDataLayer = {
      getShipsByLatestRound: () => Promise.resolve([
        { 
          shipTypes: 4,
          coordinates: {
            x: 0,
            y: 0
          },
          direction: 'vertical'
        }
      ])
    }
    const shipToPlace = {
      shipTypes: 2,
      coordinates: {
        x: 1,
        y: 1
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    assertThrowPromise(Ship.place(shipToPlace, mockDataLayer), done).catch(err => {
      expect(err.message).to.equal('Illegal placement: too near to another ship')
      done()
    })
  })

  it('should not be able to place ship outside board', done => {
    const shipToPlace = {
      shipTypes: 2,
      coordinates: {
        x: 11,
        y: 5
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    assertThrowPromise(Ship.place(shipToPlace), done).catch(err => {
      expect(err.message).to.equal('Illegal placement: coordinate out of ocean')
      done()
    })
  })

  it('should not be able to place more than 10 ship per round', done => {
    const mockShips = [ ]

    // Create 10 ships
    for (let i = 0; i < 10; i++) {
      mockShips.push({ 
        shipTypes: 4,
        coordinates: {
          x: 0,
          y: 0
        },
        direction: 'vertical',
        roundId: 'round1'
      })
    }
    const mockDataLayer = {
      getShipsByLatestRound: () => Promise.resolve(mockShips)
    }
    const shipToPlace = {
      shipTypes: 4,
      coordinates: {
        x: 9,
        y: 9
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    assertThrowPromise(Ship.place(shipToPlace, mockDataLayer), done).catch(err => {       
      expect(err.message).to.equal('Ship depleted')
      done()
    })
  })

  it('should not be able to place battleship more than 1', done => {
    const mockShips = [ 
      { 
        shipTypes: 1,
        coordinates: {
          x: 0,
          y: 0
        },
        direction: 'vertical',
        roundId: 'round1'
      }
    ]
    const mockDataLayer = {
      getShipsByLatestRound: () => Promise.resolve(mockShips)
    }
    const shipToPlace = {
      shipTypes: 1,
      coordinates: {
        x: 4,
        y: 4
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    assertThrowPromise(Ship.place(shipToPlace, mockDataLayer), done).catch(err => {
      expect(err.message).to.equal('Ship depleted')
      done()
    })
  })

  it('should not be able to place cruiser more than 2', done => {
    const getCruiser = () => ({ 
      shipTypes: 2,
      coordinates: {
        x: 0,
        y: 0
      },
      direction: 'vertical'
    })
    const mockShips = [ 
      getCruiser(), getCruiser()
    ]
    const mockDataLayer = {
      getShipsByLatestRound: () => Promise.resolve(mockShips)
    }
    const shipToPlace = {
      shipTypes: 2,
      coordinates: {
        x: 4,
        y: 4
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    assertThrowPromise(Ship.place(shipToPlace, mockDataLayer), done).catch(err => {
      expect(err.message).to.equal('Ship depleted')
      done()
    })
  })

  it('cannot place ship too near to the edge of ocean', done => {
    const shipToPlace = {
      shipTypes: 2,
      coordinates: {
        x: 8,
        y: 8
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    const mockDataLayer = {
      getShipsByLatestRound: () => Promise.resolve([ ]),
      saveShip: () => Promise.resolve('ok')
    }
    assertThrowPromise(Ship.place(shipToPlace, mockDataLayer), done).catch(err => {
      expect(err.message).to.equal('Illegal placement: coordinate out of ocean')
      done()
    })
  })

  it('should save ship if all condition satisfied', () => {
    const shipToPlace = {
      shipTypes: 2,
      coordinates: {
        x: 4,
        y: 4
      },
      direction: 'vertical',
      roundId: 'round1'
    }
    const mockDataLayer = {
      getShipsByLatestRound: () => Promise.resolve([ ]),
      saveShip: () => Promise.resolve('ok')
    }
    return Ship.place(shipToPlace, mockDataLayer).then(result =>{
      expect(result).to.equal('ok')
    })
  })
})
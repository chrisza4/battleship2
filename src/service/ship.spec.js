import { expect } from 'chai'
import * as Ship from './ship'

describe('Ship service', () => {
  it('should assert ship types', (done) => {
    Ship.place({
      shipTypes: 6,
      coordinates: {
        a: 1,
        b: 2
      },
      direction: 'vertical'
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
      direction: 'vertical'
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
      direction: 'vertical'
    }).then(result => {
      done('should not pass')
    })
    .catch(err => {
      done()
    })
  })

  it('should assert direction', done => {
    Ship.place({
      shipTypes: 2,
      coordinates: {
        x: 1,
        y: 2
      },
      direction: 'xxxx'
    }).then(result => {
      done('should not pass')
    })
    .catch(err => {
      done()
    })
  })

  // it('should not be able to place ship near each other', done =>{
    
  //   Ship.place({
  //     shipTypes: 2,
  //     coordinates: {
  //       x: 0,
  //       y: 0
  //     },
  //     direction: 'vertical'
  //   })

  // })
})

describe('isShipCanBePlaced', () => {
  it('should return false if ship was placed nearby diagonally', () => {

  })
})

describe('occupiedSpace', () => {
  // it('for battleship vertically, should return correct spaces', () => {
  //   const input = {
  //     shipTypes: 1,
  //     coordinates: {
  //       x: 1,
  //       y: 1,
  //     },
  //     direction: 'horizontal'
  //   }
  //   const expected = [ ]
  //   for (let x = 0; x < 5; x++) {
  //     for (let y = 0; y < 5; y++) {
  //       expected.push({ x, y })
  //     }
  //   }
  //   const actual = Ship.occupiedSpace(input)
  //   expect(actual).to.deep.equal(expected)
  // })
})

describe('realSpace', () => {
  it('should return correct ship space for battleship horizontally', () => {
    const input = {
      shipTypes: 1,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'horizontal'
    }
    const expected = [ 
      { x:1, y: 1 },
      { x:2, y: 1 },
      { x:3, y: 1 },
      { x:4, y: 1 },
    ]
    const actual = Ship.realSpace(input)
    expect(actual).to.deep.equal(expected)

   
  })

  it('should return correct ship space for battleship vertically', () => {
     const input2 = {
      shipTypes: 1,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'vertical'
    }
    const expected2 = [ 
      { x:1, y: 1 },
      { x:1, y: 2 },
      { x:1, y: 3 },
      { x:1, y: 4 },
    ]
    const actual2 = Ship.realSpace(input2)
    expect(actual2).to.deep.equal(expected2)
  })

  it('should return correct ship space for cruisers horizontally', () => {
    const input = {
      shipTypes: 2,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'horizontal'
    }
    const expected = [ 
      { x:1, y: 1 },
      { x:2, y: 1 },
      { x:3, y: 1 }, 
    ]
    const actual = Ship.realSpace(input)
    expect(actual).to.deep.equal(expected)
  })

  it('should return correct ship space for cruisers vertically', () => {
     const input2 = {
      shipTypes: 2,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'vertical'
    }
    const expected2 = [ 
      { x:1, y: 1 },
      { x:1, y: 2 },
      { x:1, y: 3 },
    ]
    const actual2 = Ship.realSpace(input2)
    expect(actual2).to.deep.equal(expected2)
  })

  it('should return correct ship space for destroyers horizontally', () => {
    const input = {
      shipTypes: 3,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'horizontal'
    }
    const expected = [ 
      { x:1, y: 1 },
      { x:2, y: 1 }, 
    ]
    const actual = Ship.realSpace(input)
    expect(actual).to.deep.equal(expected)
  })

  it('should return correct ship space for destroyers vertically', () => {
     const input2 = {
      shipTypes: 3,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'vertical'
    }
    const expected2 = [ 
      { x:1, y: 1 },
      { x:1, y: 2 },
    ]
    const actual2 = Ship.realSpace(input2)
    expect(actual2).to.deep.equal(expected2)
  })

  it('should return correct ship space for submarine horizontally', () => {
    const input = {
      shipTypes: 4,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'horizontal'
    }
    const expected = [ 
      { x:1, y: 1 }, 
    ]
    const actual = Ship.realSpace(input)
    expect(actual).to.deep.equal(expected)
  })

  it('should return correct ship space for submarine vertically', () => {
     const input2 = {
      shipTypes: 4,
      coordinates: {
        x: 1,
        y: 1,
      },
      direction: 'vertical'
    }
    const expected2 = [ 
      { x:1, y: 1 },
    ]
    const actual2 = Ship.realSpace(input2)
    expect(actual2).to.deep.equal(expected2)
  })
})
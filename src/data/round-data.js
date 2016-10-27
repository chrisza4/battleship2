export function newRound (db) {
  return db.collection('rounds').insert({
    created: new Date()
  }).then(r => r.ops)
}

export function getLatestRound (db) {
  return db.collection('rounds').find({}).sort({ _id: -1 }).limit(1).toArray().then(rounds => {
    if (!rounds || !rounds.length) return newRound(db)
    return rounds[0]
  })
}
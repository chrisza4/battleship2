export function isBoardReadyToPlay (ships) {
  if (!Array.isArray(ships)) return false
  if (ships.length < 10) return false
  return true
}
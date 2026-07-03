export const getRoundPrice = (price, percent) => {
   return Math.round(Number(price) / 10 * (100 - Number(percent)) / 100) * 10
}
/**
 * @author @jshaw-ar
 *
 * @export
 * @param {number} m slope
 * @param {number} C constant (should be 1)
 * @param {number} x1 first point on the x-axis
 * @param {number} x2 second point on the x-axis
 * @return {*}
 */
export function calculatePriceBits(
  m: number,
  C: number,
  x1: number,
  x2: number
) {
  // The antidirivitive of f(x) = m * x;
  const F = (x: number) => (m * (x * x)) / 2 + C;

  // Return the difference between the values of the antiderivative at x1 and x2
  // This calculates the "Area under the curve"
  // Calculates the "Definite Integral"
  return F(x2) - F(x1);
}

/**
 * @description Calculates a fee of 5% of price. (Rounded up)
 *
 * @author @jshaw-ar
 * @export
 * @param {number} price
 * @return {*}
 */
export function calculateFeeBits(price: number) {
  return Math.ceil(0.05 * price);
}

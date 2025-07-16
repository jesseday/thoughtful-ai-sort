export enum Stack {
  STANDARD = "STANDARD",
  SPECIAL = "SPECIAL",
  REJECTED = "REJECTED",
}
/**
 * Sorts packages into the correct stack for shipment.
 *
 * @param width The package width, in centimeters.
 * @param height The package height, in centimeters.
 * @param length The package length, in centimeters.
 * @param mass The package mass, in kilograms.
 * @returns
 */
export function sort(
  width: number,
  height: number,
  length: number,
  mass: number
): Stack {
  // Despite typing, there is the possibility that inputs could be
  // strings.  We will convert them to numbers if possible.
  const numericWidth = getNumericValue(width);
  const numericHeight = getNumericValue(height);
  const numericLength = getNumericValue(length);
  const numericMass = getNumericValue(mass);

  if (numericWidth <= 0 || numericHeight <= 0 || numericLength <= 0 || numericMass <= 0) {
    throw new Error("Dimensions and mass must be non-negative");
  }

  const volume = numericWidth * numericHeight * numericLength;

  const hasLargeDimension = numericWidth >= 150 || numericHeight >= 150 || numericLength >= 150;
  const isBulky = hasLargeDimension || volume >= 1000000;
  const isHeavy = numericMass >= 20;

  if (isHeavy && isBulky) {
    return Stack.REJECTED;
  }

  if (isHeavy || isBulky) {
    return Stack.SPECIAL;
  }

  return Stack.STANDARD;
}

function getNumericValue(value: any): number {
  if (typeof value === "number") {
    return value;
  }

  const num = parseFloat(value);
  if (isNaN(num)) {
    throw new Error("Invalid numeric value");
  }
  return num;
}
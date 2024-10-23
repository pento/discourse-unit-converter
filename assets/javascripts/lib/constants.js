export const SETTING_NAME = "unit-converter-preference";

function rounder(value) {
  return Math.round(value * 10) / 10;
}

export const MATCHERS = [
  {
    pattern: "((°|deg(ree)?s?)\\s*f(ahrenheit)?|℉|f(ahrenheit)?)",
    unit: "fahrenheit",
    unitType: "imperial",
    convert: (value) => rounder(((value - 32) * 5) / 9) + " ℃",
  },
  {
    pattern: "((°|deg(ree)?s?)\\s*c(elsius)?|℃|c(elsius)?)",
    unit: "celsius",
    unitType: "metric",
    convert: (value) => rounder((value * 9) / 5 + 32) + " ℉",
  },
  {
    pattern: "(tsps?\\.?|teaspoons?)",
    unit: "teaspoon",
    unitType: "imperial",
    convert: (value) => rounder(value * 5) + " mL",
  },
  {
    pattern: "(tbs(ps?)?\\.?|tablespoons?)",
    unit: "tablespoon",
    unitType: "imperial",
    convert: (value) => rounder(value * 15) + " mL",
  },
  {
    pattern: "(fl(\\.|uid)?)\\s+(oz\\.?|ounces?)",
    unit: "fluid ounce",
    unitType: "imperial",
    convert: (value) => rounder(value * 30) + " mL",
  },
  {
    pattern: "c(ups?)?",
    unit: "cup",
    unitType: "imperial",
    convert: (value) => rounder(value * 240) + " mL",
  },
  {
    pattern: "(qts?\\.?|quarts?)",
    unit: "quart",
    unitType: "imperial",
    convert: (value) => rounder(value * 1.13652) + " L",
  },
  {
    pattern: "(gals?\\.?|gallons?)",
    unit: "gallon",
    unitType: "imperial",
    convert: (value) => rounder(value * 4.54609) + " L",
  },
  {
    pattern: "m(ls?\\.?|illiliters?)",
    unit: "milliliter",
    unitType: "metric",
    convert: (value) => rounder(value * 0.033814) + " fl oz",
  },
  {
    pattern: "l(iters?)",
    unit: "liter",
    unitType: "metric",
    convert: (value) => rounder(value * 1.05669) + " qts",
  },
  {
    pattern: "(oz\\.?|ounces?)",
    unit: "ounce",
    unitType: "imperial",
    convert: (value) => rounder(value * 28.3495) + " g",
  },
  {
    pattern: "(lbs?\\.?|pounds?)",
    unit: "pound",
    unitType: "imperial",
    convert: (value) => rounder(value * 0.453592) + " kg",
  },
  {
    pattern: "g(rams?)?",
    unit: "gram",
    unitType: "metric",
    convert: (value) => rounder(value * 0.035274) + " oz",
  },
  {
    pattern: "k(gs?\\.?|ilograms?)",
    unit: "kilogram",
    unitType: "metric",
    convert: (value) => rounder(value * 2.20462) + " lbs",
  },
  {
    pattern: "in(ches?)",
    unit: "inch",
    unitType: "imperial",
    convert: (value) => rounder(value * 2.54) + " cm",
  },
  {
    pattern: "ft|feet",
    unit: "foot",
    unitType: "imperial",
    convert: (value) => rounder(value * 0.3048) + " m",
  },
  {
    pattern: "yd|yards?",
    unit: "yard",
    unitType: "imperial",
    convert: (value) => rounder(value * 0.9144) + " m",
  },
  {
    pattern: "mi|miles?",
    unit: "mile",
    unitType: "imperial",
    convert: (value) => rounder(value * 1.60934) + " km",
  },
  {
    pattern: "mm|millimeters?",
    unit: "millimeter",
    unitType: "metric",
    convert: (value) => rounder(value * 0.0393701) + " in",
  },
  {
    pattern: "cm|centimeters?",
    unit: "centimeter",
    unitType: "metric",
    convert: (value) => rounder(value * 0.393701) + " in",
  },
  {
    pattern: "m(eters?)",
    unit: "meter",
    unitType: "metric",
    convert: (value) => rounder(value * 3.28084) + " ft",
  },
  {
    pattern: "km|kilometers?",
    unit: "kilometer",
    unitType: "metric",
    convert: (value) => rounder(value * 0.621371) + " mi",
  },
];

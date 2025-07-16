import minimist from "minimist";
import { sort } from "./sort";

const args = minimist(process.argv.slice(2), {
  string: ["width", "height", "length", "mass"],
  boolean: ["help"],
  alias: {
    w: "width",
    h: "height",
    l: "length",
    m: "mass",
  },
  default: {
    width: "0",
    height: "0",
    length: "0",
    mass: "0",
  },
});

if (args.help) {
  console.log(`
    Usage: bun run index.ts --width <width> --height <height> --length <length> --mass <mass>
    Example: bun run index.ts --width 100 --height 50 --length 30 --mass 10
    Options:
      --width, -w   Width of the package in centimeters (default: 0)
      --height, -h  Height of the package in centimeters (default: 0)
      --length, -l  Length of the package in centimeters (default: 0)
      --mass, -m    Mass of the package in kilograms (default: 0)
      --help        Show this help message
  `);
  process.exit(0);
}

const stack = sort(
  parseFloat(args.width),
  parseFloat(args.height),
  parseFloat(args.length),
  parseFloat(args.mass)
)

console.log(stack)
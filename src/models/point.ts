export class Point {
  constructor(public x: number, public y: number) {}

  static areSiblings(point1: Point, point2: Point) {
    // exclude diagonals from siblings
    if (point1.x !== point2.x && point1.y !== point2.y) {
      return false;
    }

    return (
      Math.abs(point1.x - point2.x) <= 1 && Math.abs(point1.y - point2.y) <= 1
    );
  }
}

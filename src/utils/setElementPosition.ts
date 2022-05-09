import { Point } from 'src/point';

export const setElementPosition = (element: HTMLElement, position: Point) => {
  element.style.top = `${position.y}em`;
  element.style.left = `${position.x}em`;
};

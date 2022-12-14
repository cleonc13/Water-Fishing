import { VectorLike } from "./vector";
import { entries } from "./util";

/**
 * A return value type for collision detection.
 * - **isColliding.char** is used to test a collision to specific character.
 *  e.g. `isColliding.char.f`
 * - **isColliding.rect** is used to test a collision to specific color rects.
 *  e.g. `isColliding.rect.blue`
 * - **isColliding.text** is used to test a collision to specific text.
 *  e.g. `isColliding.text.e`
 */
export type Collision = {
  isColliding: {
    rect?: {
      transparent?: boolean;
      white?: boolean;
      red?: boolean;
      green?: boolean;
      yellow?: boolean;
      blue?: boolean;
      purple?: boolean;
      cyan?: boolean;
      black?: boolean;
      light_red?: boolean;
      light_green?: boolean;
      light_yellow?: boolean;
      light_blue?: boolean;
      light_purple?: boolean;
      light_cyan?: boolean;
      light_black?: boolean;
    };
    text?: { [k: string]: boolean };
    char?: { [k: string]: boolean };
  };
  /** @ignore */
  transparent?: boolean;
  /** @ignore */
  white?: boolean;
  /** @ignore */
  red?: boolean;
  /** @ignore */
  green?: boolean;
  /** @ignore */
  yellow?: boolean;
  /** @ignore */
  blue?: boolean;
  /** @ignore */
  purple?: boolean;
  /** @ignore */
  cyan?: boolean;
  /** @ignore */
  black?: boolean;
  /** @ignore */
  light_red?: boolean;
  /** @ignore */
  light_green?: boolean;
  /** @ignore */
  light_yellow?: boolean;
  /** @ignore */
  light_blue?: boolean;
  /** @ignore */
  light_purple?: boolean;
  /** @ignore */
  light_cyan?: boolean;
  /** @ignore */
  light_black?: boolean;
};
export type HitBox = {
  pos: VectorLike;
  size: VectorLike;
  collision: Collision;
};
export let hitBoxes: HitBox[];
export let tmpHitBoxes: HitBox[];

export function clear() {
  hitBoxes = [];
  tmpHitBoxes = [];
}

export function concatTmpHitBoxes() {
  hitBoxes = hitBoxes.concat(tmpHitBoxes);
  tmpHitBoxes = [];
}

export function checkHitBoxes(box: HitBox) {
  let collision: Collision = {
    isColliding: { rect: {}, text: {}, char: {} },
  };
  hitBoxes.forEach((r) => {
    if (testCollision(box, r)) {
      collision = {
        ...collision,
        ...createShorthand(r.collision.isColliding.rect),
        isColliding: {
          rect: {
            ...collision.isColliding.rect,
            ...r.collision.isColliding.rect,
          },
          text: {
            ...collision.isColliding.text,
            ...r.collision.isColliding.text,
          },
          char: {
            ...collision.isColliding.char,
            ...r.collision.isColliding.char,
          },
        },
      };
    }
  });
  return collision;
}

function testCollision(r1: HitBox, r2: HitBox) {
  const ox = r2.pos.x - r1.pos.x;
  const oy = r2.pos.y - r1.pos.y;
  return -r2.size.x < ox && ox < r1.size.x && -r2.size.y < oy && oy < r1.size.y;
}

export function createShorthand(rects) {
  if (rects == null) {
    return {};
  }
  const colorReplaces = {
    transparent: "tr",
    white: "wh",
    red: "rd",
    green: "gr",
    yellow: "yl",
    blue: "bl",
    purple: "pr",
    cyan: "cy",
    black: "lc",
  };
  let shorthandRects = {};
  entries(rects).forEach(([k, v]) => {
    const sh = colorReplaces[k];
    if (v && sh != null) {
      shorthandRects[sh] = true;
    }
  });
  return shorthandRects;
}

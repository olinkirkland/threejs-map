import * as d3 from 'd3';

export default function generatePoints(map) {
  const { width, height, spacing, precision, offset } = map.options;

  const quadtree = d3.quadtree();
  const queue = [];
  let point = [Math.floor(width / 2) + offset, Math.floor(height / 2) + offset];
  quadtree.add(point);
  queue.push(point);

  while (queue.length > 0) {
    point = queue.pop();

    for (let i = 0; i < precision; i++) {
      const angle = rng() * Math.PI * 2;
      const radius = rng() * spacing + spacing;
      const candidate = [
        Math.floor(point[0] + Math.cos(angle) * radius),
        Math.floor(point[1] + Math.sin(angle) * radius)
      ];

      // If candidate is out of bounds, skip it
      if (
        candidate[0] < offset ||
        candidate[0] >= width + offset ||
        candidate[1] < offset ||
        candidate[1] >= height + offset
      ) {
        continue;
      }

      // If candidate is too close to another point, skip it
      const neighbor = quadtree.find(candidate[0], candidate[1], radius / 2);
      if (neighbor) {
        continue;
      }

      quadtree.add(candidate);
      queue.push(candidate);
    }

    if (queue.length > 10000) {
      console.error('Too many points');
      break;
    }
  }

  quadtree.all = function () {
    // Return an array of all points in the quadtree
    const points = [];
    this.visit((node, x1, y1, x2, y2) => {
      if (!node.length) {
        do {
          points.push(node.data);
        } while ((node = node.next));
      }
      return (
        x1 > width + offset ||
        y1 > height + offset ||
        x2 < offset ||
        y2 < offset
      );
    });
    return points;
  };

  return {
    ...map,
    quadtree
  };
}

function addPoint() {
  const point = {
    x: Math.floor(rng() * width),
    y: Math.floor(rng() * height)
  };

  quadtree.add(point);
  queue.push(point);
}

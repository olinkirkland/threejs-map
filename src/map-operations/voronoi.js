import * as d3 from 'd3';

export default function generateVoronoi(map) {
  const { width, height, offset } = map.options;
  const { quadtree } = map;

  // Create a Delaunay triangulation from the quadtree
  const delaunay = d3.Delaunay.from(quadtree.all());

  // Create a Voronoi diagram from the Delaunay triangulation
  const voronoi = delaunay.voronoi([
    offset,
    offset,
    width + offset,
    height + offset
  ]);

  // Create cells from the Voronoi diagram

  // Return the updated map object with the Voronoi diagram
  return {
    ...map,
    voronoi
    // cells
  };
}

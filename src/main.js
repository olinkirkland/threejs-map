import seedrandom from 'seedrandom';
import '../styles/css/styles.css';
import generatePoints from './map-operations/points';
import generateVoronoi from './map-operations/voronoi';
import { randomCode } from './utils';

document.getElementById('btnReset').addEventListener('click', generateMap);

generateMap();
function generateMap() {
  let map = {
    options: {
      seed: randomCode(),
      width: 600,
      height: 600,
      spacing: 5,
      precision: 20,
      offset: 20
    }
  };

  document.getElementById('labelSeed').innerHTML = 'Seed: ' + map.options.seed;

  window.rng = seedrandom(map.options.seed);

  console.log(map);
  map = generatePoints(map);
  console.log(map);
  map = generateVoronoi(map);
  console.log(map);

  const canvas = document.getElementById('canvas');
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  drawPoints(map.quadtree, canvas);
  drawVoronoi(map.quadtree, map.voronoi, canvas);
}

function drawPoints(quadtree, canvas) {
  const context = canvas.getContext('2d');

  // Get all the points from the quadtree
  const points = quadtree.all();
  console.log('Total points:', points.length);

  // Loop over the points array and draw each point
  points.forEach((point) => {
    // Draw the point using the canvas API
    context.beginPath();
    context.arc(point[0], point[1], 3, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
  });
}

function drawVoronoi(quadtree, voronoi, canvas) {
  const context = canvas.getContext('2d');
  const points = quadtree.all();

  // Set the fill and stroke styles
  context.fillStyle = 'transparent';
  context.strokeStyle = 'black';

  // Loop over each Voronoi cell and draw it
  for (var i = 0; i < points.length; i++) {
    const cell = voronoi.cellPolygon(i);

    // // Fill the cell with its color
    // context.beginPath();
    // context.moveTo(cell[0][0], cell[0][1]);
    // for (var j = 1; j < cell.length; j++) {
    //   context.lineTo(cell[j][0], cell[j][1]);
    // }
    // context.closePath();
    // context.fill();

    // Stroke the cell
    context.beginPath();
    context.moveTo(cell[0][0], cell[0][1]);
    for (var j = 1; j < cell.length; j++) {
      context.lineTo(cell[j][0], cell[j][1]);
    }
    context.closePath();
    context.stroke();
  }
}

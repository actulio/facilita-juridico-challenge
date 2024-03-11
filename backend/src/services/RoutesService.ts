import { Client } from '../interfaces/IClientService';

type Coordinate = { x: number; y: number };

export default class RoutesService {
  async getBestRoute(nodes: Client[]) {
    return this.nearestNeighbor(nodes);
  }

  private nearestNeighbor(nodes: Client[]): { distance: number; route: Client[] } {
    const visited = new Array(nodes.length).fill(false);
    const route = [nodes[0]];

    let distanceSum = 0;
    let currentNode = nodes[0];
    visited[0] = true;

    while (route.length < nodes.length) {
      let minDistance = Infinity;
      let nearestNodeIndex = 0;

      for (let i = 0; i < nodes.length; i++) {
        if (!visited[i]) {
          const distance = this.calcEuclideanDistance(
            { x: currentNode.coord_x, y: currentNode.coord_y },
            { x: nodes[i].coord_x, y: nodes[i].coord_y }
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestNodeIndex = i;
          }
        }
      }
      distanceSum += minDistance;
      visited[nearestNodeIndex] = true;
      route.push(nodes[nearestNodeIndex]);
      currentNode = nodes[nearestNodeIndex];
    }

    route.push(nodes[0]);

    return { distance: distanceSum, route };
  }

  private calcEuclideanDistance(node1: Coordinate, node2: Coordinate): number {
    return Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));
  }
}

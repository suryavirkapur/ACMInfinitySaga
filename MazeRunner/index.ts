interface Portal {
  row1: number;
  col1: number;
  row2: number;
  col2: number;
}

class Maze {
  private grid: string[][];
  private portals: Portal[];
  private startRow: number;
  private startCol: number;
  private exitRow: number;
  private exitCol: number;

  constructor(rows: number, cols: number, grid: string[][], portalConnections: string[]) {
    this.grid = grid;
    this.portals = [];
    this.startRow = -1;
    this.startCol = -1;
    this.exitRow = -1;
    this.exitCol = -1;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === "S") {
          this.startRow = i;
          this.startCol = j;
        } else if (grid[i][j] === "E") {
          this.exitRow = i;
          this.exitCol = j;
        }
      }
    }

    for (const connection of portalConnections) {
      const [portal1, portal2] = connection.split(";");
      const [row1, col1] = portal1.split(":").map(Number);
      const [row2, col2] = portal2.split(":").map(Number);
      this.portals.push({ row1, col1, row2, col2 });
    }
  }

  private isPortal(row: number, col: number): Portal | undefined {
    for (const portal of this.portals) {
      if ((portal.row1 === row && portal.col1 === col) || (portal.row2 === row && portal.col2 === col)) {
        return portal;
      }
    }
    return undefined;
  }

  private bfs(): number {
    const queue: [number, number, number][] = [[this.startRow, this.startCol, 0]];
    const visited: boolean[][] = Array.from({ length: this.grid.length }, () => Array(this.grid[0].length).fill(false));

    while (queue.length > 0) {
      const [row, col, moves] = queue.shift()!;
      if (row === this.exitRow && col === this.exitCol) {
        return moves;
      }

      if (visited[row][col]) {
        continue;
      }

      visited[row][col] = true;

      const portal = this.isPortal(row, col);
      if (portal) {
        if (portal.row1 === row && portal.col1 === col) {
          queue.push([portal.row2, portal.col2, moves + 1]);
        } else {
          queue.push([portal.row1, portal.col1, moves + 1]);
        }
      }

      for (const [dr, dc] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < this.grid.length && nc >= 0 && nc < this.grid[0].length && this.grid[nr][nc] !== "P") {
          queue.push([nr, nc, moves + 1]);
        }
      }
    }

    return -1;
  }

  public solve(): number {
    return this.bfs();
  }
}

const fs = require("fs");

const fileContent = fs.readFileSync("input.txt", "utf8");
const lines = fileContent.split("\n");

const [rows, cols] = lines[0].split(" ").map(Number);
const grid: string[][] = [];
for (let i = 1; i <= rows; i++) {
  grid.push(lines[i].split(""));
}

const portalCount = parseInt(lines[rows + 1]);
const portalConnections: string[] = [];
for (let i = rows + 2; i < lines.length; i++) {
  portalConnections.push(lines[i]);
}

const maze = new Maze(rows, cols, grid, portalConnections);
console.log(maze.solve());

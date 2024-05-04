function maxEarnings(jobs: any[][]): number {
  jobs.sort((a, b) => a[2] - b[2]);
  let earnings = 0;
  let currentJobIndex = 0;
  let currentDeadline = 0;

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i][2] > currentDeadline) {
      currentJobIndex = i;
      currentDeadline = jobs[i][2];
    }
    earnings += jobs[currentJobIndex][1];
  }

  return earnings;
}

function main() {
  const fs = require("fs");
  const fileContent = fs.readFileSync("input.txt", "utf8");
  const jobCount = parseInt(fileContent.split("\n")[0]);
  let jobs = [];

  for (let i = 1; i <= jobCount; i++) {
    const line = fileContent.split("\n")[i];
    const [id, payout, deadline] = line.split(" ").map(Number);
    jobs.push([id, payout, deadline]);
  }
  console.log(jobCount);
  console.log(jobs);
  console.log(maxEarnings(jobs));
}

main();

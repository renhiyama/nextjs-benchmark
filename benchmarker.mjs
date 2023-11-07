import {spawn} from 'node:child_process';
import {join} from 'node:path';

const projectDir = process.cwd();

const benchmarker = async () => {
  const startTime = Date.now();
  const viteProcess = spawn('node', [join(projectDir, 'node_modules/.bin/next')], {
    cwd: projectDir,
  });
  //wait for the server to start
  await new Promise((resolve) => {
    viteProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Ready in')) {
        console.log(data.toString())
        resolve();
      }
    });
  });
  //make a request to the server
  await fetch('http://localhost:3000');
  //kill the vite process and return
  viteProcess.kill();
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  console.log(`Total time taken: ${totalTime}ms`);
}
await benchmarker();
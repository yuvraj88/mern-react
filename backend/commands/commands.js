const { spawn } = require('node:child_process');
const ls = spawn('ping', ['google.com', '-c', '2']);

function slowFunction(){
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      
      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      ls.on('close', (code) =>{
        process.on('message', (message) => {
            if (message == 'START') {
              console.log('Child process received START message');
              
              let message = `{"isPinged":${code}}`;
              process.send(message);
            }
          });
      });
}


slowFunction()

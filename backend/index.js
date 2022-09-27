const express = require('express');
const cors = require('cors');
const app = express();
const { fork } = require('child_process');

app.use(cors());
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/sse", function (req, res) {
//   res.writeHead(200, {
//     Connection: "keep-alive",
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//   });
  const child = fork(__dirname + '/commands/commands');

    child.on('message', (message) => {
        const x = JSON.parse(message)
        console.log('message', x.isPinged);
        let onboardingMessage = "working on it...."
    if(x.isPinged === 0){
        onboardingMessage = 'pinged successfully'
    } else {
        onboardingMessage = 'something went wrong'
    }
      res.writeHead(200,{
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      });
      setInterval(() => {
        res.write(
          `data: {"time": "${onboardingMessage}"}`
        );
        res.write("\n\n");
      }, 2000);
    //   res.end(message);
    });

    child.send('START');
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
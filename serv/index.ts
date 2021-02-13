const express = require('express');
const app = express();
const PORT = 8000;
app.use(express.static('public'));
app.get('/test', (req: any,res: any) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
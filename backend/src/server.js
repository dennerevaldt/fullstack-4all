import app from './app';

const PORT = process.env.PORT || process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});

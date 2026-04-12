const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// 도커 컴포즈 안에서는 IP 주소 대신 컨테이너 이름('redis')으로 통신이 가능합니다!
const redisClient = redis.createClient({
  url: 'redis://redis:6379'
});

redisClient.connect().catch(console.error);

app.get('/', async (req, res) => {
  await redisClient.set('visitor_message', '환영합니다! Nginx + Node.js + Redis 구성 성공! github Action을 사용한 CI/CD자동화 구성했습니다.');
  const message = await redisClient.get('visitor_message');
  res.send(`<h1>${message}</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

export default fastify;




fastify.post('/uppercase', (request, reply) => {

  if(request.body.toLowerCase().indexOf('fuck') === -1) {
    return reply.status(200).send(request.body.toUpperCase())
  } else {
    return reply.status(403).send('unresolved')
  }

});

fastify.post('/lowercase', (request, reply) => {

  if(request.body.toLowerCase().indexOf('fuck') === -1) {
    return reply.status(200).send(request.body.toLowerCase())
  } else {
    return reply.status(403).send('unresolved')
  }

});

fastify.get('/user/:id', (request, reply) => {

  if(users[request.params.id] === undefined){
    return reply.status(400).send('User not exist')
  } else {
    return reply.send(users[request.params.id])
  }

});


fastify.get('/users', (request, reply) => {

  let arr = Object.values(users)

  if(!request.query.filter || !request.query.value) {

    return reply.send(arr)

  } else {

    let filteredArr = arr.filter(function (item, i, arr) {

      return arr[i][request.query.filter].toString() === request.query.value
    })

    return reply.send(filteredArr)
  }

});



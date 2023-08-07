// const request = require('supertest');
// const express = require('express');
// const { describe, it } = require('node:test');

// const app = express();
// const server = 'http://localhost:5050'

// describe('Route integration', () => {
//   describe('/', () => {
//     describe('GET', () => {
//       // Note that we return the evaluation of `request` here! It evaluates to
//       // a promise, so Jest knows not to say this test passes until that
//       // promise resolves. See https://jestjs.io/docs/en/asynchronous
//       it('responds with 200 status and text/html content type', () => {
//         return request(server)
//           .get('/')
//           .expect('Content-Type', 'text/html')
//           .expect(200);
//       });
//     });
//   });
//   describe('/login', () => {
//     describe('POST', () => {
//       it('responds with 200 status and application/json content type', () => {
//         return request(server)
//         .get('/')
//         .expect('Content-Type', 'application/json')
//         .expect(200);
//       });
//     });
//   });
//   describe('/signup', () => {
//     describe('POST', () => {
//       it('responds with 200 status and application/json content type', () => {
//         return request(server)
//         .get('/')
//         .expect('Content-Type', 'application/json')
//         .expect(200);
//       });
//     });
//   });
//   describe('/user', () => {
//     describe('GET', () => {
//       it('responds with 200 status and application/json content type', () => {
//         return request(server)
//         .get('/')
//         .expect('Content-Type', 'application/json')
//         .expect(200);
//       });
//     });
//   });
// })

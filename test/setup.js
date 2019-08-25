require('dotenv').config(); //ensure env vars are loaded when running tests
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;


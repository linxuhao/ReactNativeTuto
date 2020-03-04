/* ******** from https://www.reactnativeschool.com/mocking-fetch-api-calls-when-using-jest ***********
   ******** To solve the fetch not defined error when running jtest **************
*/
global.fetch = require('jest-fetch-mock');
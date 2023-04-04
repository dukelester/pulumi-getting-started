"use strict";
const pulumi = require("@pulumi/pulumi");
const docker = require('@pulumi/docker');

const config = new pulumi.Config();
const frontendPort = config.requireNumber('frontendPort');
const backendPort = config.requireNumber('backendPort');
const mongoPort = config.requireNumber('mongoPort');

const stack = pulumi.getStack();

// Pull the backend image
const backendImageName = 'backend';
const backend = new docker.RemoteImage(`${backendImageName}Image`, {
    name: 'dukelester/backend:latest',
});

// Pull the frontend image
const frontendImageName = 'frontend';
const frontend = new docker.RemoteImage(`${frontendImageName}Image`, {
    name: 'dukelester/frontend:latest',
});

// Pull the database image

const databaseImage = 'database';
const database = new docker.RemoteImage(`${databaseImage}Image`, {
    name: 'dukelester/database:latest',
});

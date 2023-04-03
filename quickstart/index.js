const pulumi = require('@pulumi/pulumi');
const gcp = require('@pulumi/gcp');

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket('my-bucket', {
  location: 'US',
});

// Export the DNS name of the bucket
exports.bucketName = bucket.url;
exports.bucketLocation = bucket.location;
exports.name = bucket.name;
exports.project = bucket.project;

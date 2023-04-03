const pulumi = require('@pulumi/pulumi');
const gcp = require('@pulumi/gcp');

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket('my-bucket', {
  location: 'US',
});

const bucketObject = new gcp.storage.BucketObject('index.html', {
  bucket: bucket.name,
  source: new pulumi.asset.FileAsset('index.html'),
});
// Export the DNS name of the bucket
exports.bucketName = bucket.url;
exports.bucketLocation = bucket.location;
exports.name = bucket.name;
exports.project = bucket.project;

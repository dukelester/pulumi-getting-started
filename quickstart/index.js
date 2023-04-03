const pulumi = require('@pulumi/pulumi');
const gcp = require('@pulumi/gcp');

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket('my-bucket', {
  location: 'US',
  website: {
    mainPageSuffix: 'index.html',
  },
  uniformBucketLevelAccess: true,
});

const bucketObject = new gcp.storage.BucketObject('index.html', {
  bucket: bucket.name,
  contentType: 'text/html',
  source: new pulumi.asset.FileAsset('index.html'),
});

const styleObject = new gcp.storage.BucketObject('styles.css', {
  bucket: bucket.name,
  source: new pulumi.asset.FileAsset('styles.css'),
});
// Export the DNS name of the bucket
exports.bucketName = bucket.url;
exports.bucketLocation = bucket.location;
exports.name = bucket.name;
exports.project = bucket.project;

const bucketIAMBinding = new gcp.storage.BucketIAMBinding('bucket-IAMBinding', {
  bucket: bucket.name,
  role: 'roles/storage.objectViewer',
  members: ['allUsers'],
});

exports.bucketEnpoint = pulumi.concat('http://storage.googleapis.com/', bucket.name, '/', bucketObject.name);

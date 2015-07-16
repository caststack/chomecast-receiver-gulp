var s3 = require('s3');

module.exports = {
  sync: function(target_dir) {
    var client = s3.createClient({
      s3Options: {
        accessKeyId: '<AWS Access Key ID>',
        secretAccessKey: '<AWS Access Secret>',
      },
    });

    var params = {
      localDir: target_dir,
      deleteRemoved: true,
      s3Params: {
        Bucket: 'supercasttv',
        Prefix: 'castreceiver'
      }
    };

    var uploader = client.uploadDir(params);
    uploader.on('error', function(err) {
      console.error('unable to sync:', err.stack);
    });

    uploader.on('progress', function() {
      console.log('progress', uploader.progressAmount, uploader.progressTotal);
    });

    uploader.on('end', function() {
      console.log('done uploading');
    });
  }
};

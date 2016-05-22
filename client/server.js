const express = require('express');
express().use(express.static(__dirname + '/build')).listen(1234, () => {
  console.log('Server up on port: 1234');
});

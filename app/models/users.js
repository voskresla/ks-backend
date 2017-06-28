let usersRecords = [
  { id: 0, username: "valera", password: "valera", role: "valera" },
  { id: 1, username: "hqmanager", password: "hqmanager", role: "hq" },
  { id: 2, username: "hqmanager1", password: "hqmanager1", role: "hq" },
  { id: 3, username: "hqmanager2", password: "hqmanager2", role: "hq" },
  { id: 4, username: "storemanager", password: "storemanager", role: "store" },
  { id: 5, username: "storemanager1", password: "storemanager1", role: "store" },
  { id: 6, username: "storemanager2", password: "storemanager2", role: "store" }
]

exports.findById = function(id, callback) {
  process.nextTick( function() {
    if (usersRecords[id]) {
      return callback(null, usersRecords[id])
    } else {
      return callback(new Error('User '+id+' does not exist'));
    }
  })
}

exports.findByUsername = function (username, callback) {
  process.nextTick( function() {
    for (let i = 0, len = usersRecords.length; i < len; i++) {
      let record = usersRecords[i];
      if (username === record.username) {
        return callback(null, record);
      }
    }
    return callback(null,null);
  })
}

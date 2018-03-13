const MongoClient = require('mongodb').MongoClient

const uri = 'mongodb://ttol:motorbikes@ds241578.mlab.com:41578/motorcycles'

module.exports = {
  getMongoBikes: (values) => {
    return MongoClient.connect(uri)
      .then(client => {
        const db = client.db('motorcycles')
        return db.collection('Bikes')
          .find(values)
          .toArray()
          .then(output => output)
          .then((output) => {
            client.close()
            return output
          })
      })
  },
  deleteMongoBike: (make) => {
    return MongoClient.connect(uri)
      .then(client => {
        const db = client.db('motorcycles')
        return db.collection('Bikes')
          .deleteOne(make)
          .then(() => {
            return db.collection('Bikes')
              .find({})
              .toArray()
          })
          .then(output => output)
          .then((output) => {
            client.close()
            return output
          })
      })
  },
  addMongoBike: (bike) => {
    return MongoClient.connect(uri)
      .then(client => {
        const db = client.db('motorcycles')
        return db.collection('Bikes')
          .insert(bike)
          .then(() => {
            return db.collection('Bikes')
              .find({})
              .toArray()
          })
          .then(output => output)
          .then((output) => {
            client.close()
            return output
          })
      })
  }
}

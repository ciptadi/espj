const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/espj'
mongoose.connect(uri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
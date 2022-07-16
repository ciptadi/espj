
const mongoose = require('mongoose')
//  const uri = 'mongodb://127.0.0.1:27017/espj'
const uri = "mongodb+srv://ciptadi:1Jakx13bESVtl1uj@cluster0.92ixh.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));






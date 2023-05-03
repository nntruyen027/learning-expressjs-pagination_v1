const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LearningExpressJs',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .catch((err) => console.log(`Kết nối thất bại: ${err}`))

const AccountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true
        },
        password: String
    },
    {
        collection: 'account'
    }
)

const Account = new mongoose.model('Account', AccountSchema);


module.exports = Account
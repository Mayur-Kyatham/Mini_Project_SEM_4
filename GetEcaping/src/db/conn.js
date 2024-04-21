const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/GetEscaping", {
    useNewUrlParser: true, 
    useUnifiedToplogy: true,    
    useCreaateIndex: true
}).then(() => {
    console.log('connection successful');
}).catch((e) => {
    console.log('no connection');
});

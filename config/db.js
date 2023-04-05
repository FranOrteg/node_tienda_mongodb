const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

// protocolo://user:password@host:puerto/nombre_bd

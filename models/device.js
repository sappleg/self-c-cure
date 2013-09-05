var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var DeviceSchema = new Schema({
    name: String,
    userId: Schema.Types.ObjectId,
    limit: Number,
    ranges: [],
    armed: Boolean
});

DeviceSchema.statics.getDevices = function(userId, cb) {
    var MyObjectId = require('mongoose').Types.ObjectId;
//    var userIdObj = new MyObjectId(userId);
//    var ret;
    mongoose.models.Device
        .find({"userId": userId}, cb);
}

mongoose.model('Device', DeviceSchema);
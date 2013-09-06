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
    if (userId) {
        mongoose.models.Device
            .find({ "userId": userId }, cb);
    }
}

DeviceSchema.statics.updateDevice = function(deviceId, deviceData, cb) {
    if (deviceId && deviceData) {
        mongoose.models.Device
            .update({ "_id": mongoose.mongo.BSONPure.ObjectID.fromString(deviceId)}, deviceData, cb);
    }
}

DeviceSchema.statics.deleteDevice = function(deviceId, cb) {
    if (deviceId) {
        mongoose.models.Device
            .remove({"_id": mongoose.mongo.BSONPure.ObjectID.fromString(deviceId)}, cb);
    }
}

mongoose.model('Device', DeviceSchema);
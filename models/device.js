var Schema = mongoose.Schema;
//    ObjectId = Schema.ObjectId;

var DeviceSchema = new Schema({
    name: String,
    userId: Schema.Types.ObjectId,
    deviceId: String,
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

DeviceSchema.statics.getDevice = function(deviceId, cb) {
    if (deviceId) {
        mongoose.models.Device
            .find({ "deviceId": deviceId }, cb);
    }
}

DeviceSchema.statics.updateDevice = function(deviceId, deviceData, cb) {
    if (deviceId && deviceData) {
        mongoose.models.Device
            .update({ "deviceId": deviceId }, deviceData, cb);
    }
}

DeviceSchema.statics.deleteDevice = function(deviceId, cb) {
    if (deviceId) {
        mongoose.models.Device
            .remove({ "deviceId": deviceId }, cb);
    }
}

DeviceSchema.statics.getDeviceUserEmail = function(deviceId, cb) {
    if (deviceId) {
        mongoose.models.Device
            .find({ "deviceId": deviceId }, cb);
    }
}

mongoose.model('Device', DeviceSchema);
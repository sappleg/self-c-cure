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
            .where('userId', userId)
            .find({}, cb);
    }
}

mongoose.model('Device', DeviceSchema);
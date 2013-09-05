var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var DeviceSchema = new Schema({
    name: String,
    userId: Schema.Types.ObjectId,
    limit: Number,
    ranges: [],
    armed: Boolean
});

mongoose.model('Device', DeviceSchema);
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var DeviceSchema = new Schema({
    name: String,
    type: String,
    _id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    limit: Number,
    range: {
        start: Date,
        end: Date
    },
    armed: Boolean
});

mongoose.model('Device', DeviceSchema);

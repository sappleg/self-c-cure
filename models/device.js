var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var DeviceSchema = new Schema({
    name: String,
    type: String,
    _id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    range: {
        start: Date,
        end: Date
    },
    limit: Number
});

mongoose.model('Device', DeviceSchema)

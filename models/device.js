var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var DeviceSchema = new Schema({
    name: String,
    type: String,
    _id: MongoDB::OID,
    user_id: MongoDB::OID,
    range: {
        start: Date,
        end: Date
    },
    limit: Number
});

mongoose.model('Device', DeviceSchema)

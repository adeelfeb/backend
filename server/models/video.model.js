import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({
    videoUrl:{
        type: String,
        required: true,
    },
    thumbnailUrl:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        required: true
    },
    transcript:{

    },
    summary:{

    },
    qnas:{
        
    }

}, {timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)
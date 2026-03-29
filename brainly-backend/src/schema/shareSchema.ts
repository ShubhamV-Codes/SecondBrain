import mongoose, {model, Schema} from "mongoose";

const shareSchema = new Schema ({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    hash:{
        type:String, 
        unique:true
    },
    isShared:{
        type:Boolean,
        default:false
    },
    expiresAt:{
        type:Date,
        default:null
    }
});

export const ShareModel = model("Share", shareSchema);
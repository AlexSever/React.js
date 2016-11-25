import mongoose from "mongoose";

// SCHEMA SETUP
const NoteSchema = new mongoose.Schema({
    title     : { type: String },
    text      : { type: String, required: true },
    color     : { type: String },
    createdAt : { type: Date }
});

const Note = mongoose.model("Note", NoteSchema);

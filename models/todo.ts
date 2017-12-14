import * as mongoose from "mongoose";

export type Todo = {
    id?: number,
    text: string,
    checked: boolean
};

const Schema = mongoose.Schema;

const TodoModelSchema = new Schema({
    id: Number,
    text: String,
    checked: Boolean
} as any);

export const TodoModel = mongoose.model('Todo', TodoModelSchema);
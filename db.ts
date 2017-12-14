import * as mongoose from 'mongoose';
import {Todo, TodoModel} from "./models/todo";

export namespace db {
    mongoose.connect('mongodb://<test_user>:<test_password>@ds135186.mlab.com:35186/todolist', {useMongoClient: true});

    export async function initWithSeed(): Promise<any> {
        return await remove().then(() => {
            [
                {
                    text: "example",
                    checked: false
                },
                {
                    text: "example2",
                    checked: true
                }
            ].forEach(async (it) => await post(it));
        }).then(() => get());
    }

    export async function get(id?: string): Promise<any> {
        if (id) {
            return TodoModel.findById({"_id": id}).exec();
        } else {
            return TodoModel.find({}).exec();
        }
    }

    export async function post(it: Todo): Promise<any> {
        const todoToSave = {text: it.text, checked: it.checked};
        if (it.id) {
            return TodoModel.findByIdAndUpdate({"_id": it.id}, todoToSave).exec();
        } else {
            return new TodoModel(todoToSave).save(err => {
                if (err) throw err;
            });
        }
    }

    export async function remove(id?: string): Promise<any> {
        if (id) {
            return TodoModel.findByIdAndRemove({"_id": id}).then(() => get());
        } else {
            return TodoModel.remove({}, err => {
                if (err) throw err;
            }).then(() => get());
        }
    }
}
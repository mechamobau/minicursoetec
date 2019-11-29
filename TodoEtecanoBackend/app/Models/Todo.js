"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Todo extends Model {
    photos() {
        return this.hasMany("App/Models/Photo");
    }
}

module.exports = Todo;

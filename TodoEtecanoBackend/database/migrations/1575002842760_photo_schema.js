"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PhotoSchema extends Schema {
    up() {
        this.create("photos", table => {
            table.increments();
            table
                .integer("todo_id")
                .unsigned()
                .references("id")
                .inTable("todos");
            table.string("url", 255).notNullable();
            table.timestamps();
        });
    }

    down() {
        this.drop("photos");
    }
}

module.exports = PhotoSchema;

"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TodoSchema extends Schema {
    up() {
        this.create("todos", table => {
            table.increments();
            table.string("user", 255).notNullable();
            table.string("title", 255).notNullable();
            table.string("description", 255);
            table.datetime("date").notNullable();
            table.timestamps();
        });
    }

    down() {
        this.drop("todos");
    }
}

module.exports = TodoSchema;

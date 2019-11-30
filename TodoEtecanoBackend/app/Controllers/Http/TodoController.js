"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todo = use("App/Models/Todo");
const Photo = use("App/Models/Photo");
const Helpers = use("Helpers");
const Env = use("Env");
/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
    /**
     * Show a list of all todos.
     * GET todos
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async index({ response }) {
        try {
            const todos = await Todo.query()
                .with("photos")
                .where("vote", "<", "3")
                .whereRaw("date >= date('now')")
                .orderBy("date", "asc")
                .fetch();

            return response.json({
                data: todos,
                message: "TODOs listados com sucesso!",
                error: false
            });
        } catch (error) {
            return response.json({
                data: error,
                message: "Erro ao lista TODOs",
                error: true
            });
        }
    }
    /**
     * Show a list of all todos completed.
     * GET completed todos
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async completed({ response }) {
        try {
            const todos = await Todo.query()
                .with("photos")
                .where("vote", "<", "3")
                .whereRaw("date < date('now')")
                .orderBy("date", "asc")
                .fetch();

            return response.json({
                data: todos,
                message: "TODOs listados com sucesso!",
                error: false
            });
        } catch (error) {
            return response.json({
                data: error,
                message: "Erro ao lista TODOs",
                error: true
            });
        }
    }

    /**
     * Create/save a new todo.
     * POST todos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        const data = request.only(["user", "title", "description", "date"]);

        try {
            const todo = await Todo.create(data);

            const photos = request.file("photos", {
                types: ["image"],
                size: "100mb"
            });

            if (photos) {
                const relative = `/storage/todo/${todo.id}/`;
                const path = Helpers.publicPath() + relative;
                const url = Env.get("PROD_URL") + relative;

                await photos.moveAll(path, async file => {
                    const data = {
                        todo_id: todo.id,
                        url: url + file.clientName
                    };
                    await Photo.create(data);
                });

                if (!photos.movedAll()) {
                    return response.json({
                        data: todo,
                        message: `TODO criado com sucesso, porem erro ao fazer upload de todas as imagens`,
                        error: false
                    });
                }
            }

            response.json({
                data: todo,
                message: "TODO criado com sucesso",
                error: false
            });
        } catch (error) {
            response.json({
                data: error,
                message: "Erro ao criar TODO!",
                error: true
            });
        }
    }

    /**
     * Display a single todo.
     * GET todos/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async show({ params, response }) {
        try {
            const { id } = params;
            const todo = await Todo.query()
                .with("photos")
                .where("vote", "<", "3")
                .where("id", id)
                .first();

            return response.json({
                data: todo,
                message: todo
                    ? "TODO exibido com sucesso!"
                    : "TODO não existente",
                error: todo ? false : true
            });
        } catch (error) {
            return response.json({
                data: error,
                message: "Erro ao exibir TODO",
                error: true
            });
        }
    }

    /**
     * Update todo details.
     * PUT or PATCH todos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        const data = request.only(["user", "title", "description", "date"]);

        try {
            const { id } = params;
            const todo = await Todo.query()
                .with("photos")
                .where("vote", "<", "3")
                .where("id", id)
                .first();

            if (todo) {
                todo.merge(data);

                await todo.save();

                const photos = request.file("photos", {
                    types: ["image"],
                    size: "100mb"
                });

                if (photos) {
                    const relative = `/storage/todo/${todo.id}/`;
                    const path = Helpers.publicPath() + relative;
                    const url = Env.get("PROD_URL") + relative;

                    await photos.moveAll(path, async file => {
                        const data = {
                            todo_id: todo.id,
                            url: url + file.clientName
                        };
                        await Photo.create(data);
                    });

                    if (!photos.movedAll()) {
                        return response.json({
                            data: todo,
                            message: `TODO atualizado com sucesso, porem erro ao fazer upload de todas as imagens`,
                            error: false
                        });
                    }
                }

                response.json({
                    data: todo,
                    message: "TODO atualizado com sucesso",
                    error: false
                });
            } else {
                return response.json({
                    data: todo,
                    message: "TODO não existente",
                    error: true
                });
            }
        } catch (error) {
            response.json({
                data: error,
                message: "Erro ao atualizar TODO!",
                error: true
            });
        }
    }

    /**
     * Delete a todo with id.
     * DELETE todos/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async destroy({ params, response }) {
        try {
            const { id } = params;
            const todo = await Todo.query()
                .with("photos")
                .where("vote", "<", "3")
                .where("id", id)
                .first();

            if (todo) {
                todo.merge({
                    vote: todo.vote + 1
                });

                await todo.save();

                return response.json({
                    data: todo,
                    message: "Voto para remover TODO adicionado com sucesso",
                    error: false
                });
            } else {
                return response.json({
                    data: todo,
                    message: "TODO não existente",
                    error: true
                });
            }
        } catch (error) {
            response.json({
                data: error,
                message: "Erro ao remover TODO!",
                error: true
            });
        }
    }
}

module.exports = TodoController;

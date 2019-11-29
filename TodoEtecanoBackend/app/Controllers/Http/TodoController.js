"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todo = use("App/Models/Todo");
const Photo = use("App/Models/Photo");
const Drive = use("Drive");
const Helpers = use('Helpers')
/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
    /**
     * Show a list of all todos.
     * GET todos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({ request, response }) {
        try {
            const todos = await Todo.query()
                .with("photos")
                .whereRaw("date >= date('now')")
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
     * GET todos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async completed({ request, response }) {
        try {
            const todos = await Todo.query()
                .with("photos")
                .whereRaw("date < date('now')")
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

        console.log(Helpers.publicPath());

        try {
            const todo = await Todo.create(data);

            const photos = request.input("photos");
            if (photos && photos.length) {
                photos.forEach(async (photo, idx) => {
                    try {
                        const img = Buffer.from(photo, "base64");
                        const path = `/storage/todo/${todo.id}/photo-${idx +
                            1}.png`;
                        await Drive.put(path, img);

                        const data = { todo_id: todo.id, url: path };
                        await Photo.create(data);
                    } catch (error) {
                        response.json({
                            data: error,
                            message: `Erro ao fazer upload da imagem ${idx}`,
                            error: true
                        });
                    }
                });
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
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({ params, request, response }) {
        try {
            const { id } = params;
            const todo = await Todo.query()
                .with("photos")
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
            const todo = await Todo.find(id);

            if (todo) {
                todo.merge(data);

                await todo.save();

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
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        try {
            const { id } = params;
            const todo = await Todo.find(id);

            if (todo) {
                const tempTodo = todo;

                await todo.delete();

                response.json({
                    data: tempTodo,
                    message: "TODO removido com sucesso",
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

'use strict'

class HomeController {
    index({ response }) {
        return response.json({
            data: [
                {
                    route: 'api/v1/todos',
                    method: 'GET',
                    description: 'Lista de TODOs'
                },
                {
                    route: 'api/v1/todos/completed',
                    method: 'GET',
                    description: 'Lista de TODOs concluidos'
                },
                {
                    route: 'api/v1/todos',
                    method: 'POST',
                    description: 'Adicionar TODO',
                    data: ['user', 'title', 'description', 'date']
                },
                {
                    route: 'api/v1/todos/:id',
                    method: 'GET',
                    description: 'Exibir TODO'
                },
                {
                    route: 'api/v1/todos/:id',
                    method: 'PUT',
                    description: 'Atualizar TODO',
                    data: ['user', 'title', 'description', 'date']
                },
                {
                    route: 'api/v1/todos/:id',
                    method: 'DELETE',
                    description: 'Remover TODO'
                },
            ],
            message: 'Seja bem vindo ao TODO Etecano, as rotas ficam em /api/v1/todos',
            error: false
        });
    }
}

module.exports = HomeController

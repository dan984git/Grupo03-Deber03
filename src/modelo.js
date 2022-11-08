/**
 * Objeto de negocio del sistema
 */
export class Todo {
    title = ''
    complete = false

    constructor(title = '', complete = false) {
        this.title = title;
        this.complete = complete;
    }

    display() {
        return (this.title || '').toUpperCase()
    }

    /// IMPLEMENTACION PATRON MEMENTO
    save() {
        let memento = JSON.stringify(this)
        return memento
    }

    restore(memento) {
        let aux = JSON.parse(memento)
        this.title = aux.title
        this.complete = aux.complete
    }

}

/**
 * Datos de la aplicacion que se pueden guardar tambien utilizando Memento
 */
export class TodoData {
    contador = 0
    lista = []

    save() {
        let memento = JSON.stringify(this)
        return memento
    }

    restore(memento) {
        let aux = JSON.parse(memento)
        this.contador = aux.contador
        for (const obj of aux.lista) {
            let t = new Todo(obj.title, obj.complete)
            this.lista.push(t)
        }
    }

}

/**
 * CLASE BASE PARA COMANDOS
 */
export class Command {
    execute() {}

    undo() {}

    info() {
        return this.constructor.name;
    }
}

/// IMPLEMENTACIONES DE COMANDOS EXPECIFICOS

export class AddCommand extends Command {
    lista = null
    title = null

    constructor(lista, title) {
        super();
        this.lista = lista;
        this.title = title;
    }

    execute() {
        let todo = new Todo(this.title)
        this.lista.push(todo);
    }

    undo() {
        this.lista.pop();
    }

    info() {
        return super.info() + `: ${this.title}`;
    }
}

export class RemoveCommand extends Command {
    lista = null
    todo = null
    index = null

    constructor(lista, index) {
        super();
        this.lista = lista;
        this.index = index;
    }

    execute() {
        this.todo = this.lista[this.index]
        this.lista.splice(this.index, 1)
    }

    undo() {
        this.lista.splice(this.index, 0, this.todo)
    }

    info() {
        return super.info() + `: index ${this.index}`;
    }
}

export class CompleteCommand extends Command {
    todo = null
    memento = null

    constructor(todo) {
        super();
        this.todo = todo;
    }

    execute() {
        /// Uso de Memento para guardar estado anterior del objeto de negocio
        this.memento = this.todo.save()
        this.todo.complete = !this.todo.complete
    }

    undo() {
        // restaurar estado anterior desde el Memento
        this.todo.restore(this.memento)
    }

    info() {
        let t = this.todo
        return super.info() + `: ${t.title}`
            + ', complete: ' + (t.complete ? 'TRUE' : 'FALSE')
    }
}

export class EditCommand extends Command {
    todo = null
    title = null
    memento = null

    constructor(todo, newData) {
        super();
        this.todo = todo;
        this.newData = newData;
    }

    execute() {
        this.memento = this.todo.save()
        this.todo.complete = this.newData.complete
        this.todo.title = this.newData.title
    }

    undo() {
        this.todo.restore(this.memento)
    }
}

/**
 * Ejecutor de comandos que mantiene una lista para poder deshacer
 */
export class CommandHandler {
    lista = [] // max capacity: 10

    add(command) {
        command.execute();
        if (this.lista.length >= 10)
            this.lista.pop();
        this.lista.push(command);
    }

    canUndo() { return this.lista.length > 0}

    undo() {
        let cmd = this.lista.pop();
        if (cmd)
            cmd.undo()
    }

    infoList() {
        return this.lista.map(x => {
            return x.info();
        })
    }

}

export const TodoCaretaker = {
    mementos: [],

    add(key, memento) {
        this.mementos[key] = memento
    },

    get(key) {
        return this.mementos[key]
    },
}

/**
 * Clase de persistencia y manejador de eventos simple
 * @type {{updateEvent: null, restoreData(): TodoData, saveTodos(*): void, notify(*): void}}
 */
export const Historico = {
    updateEvent: null,

    saveTodos(todoData) {
        localStorage.setItem('todo-items', todoData.save());
    },

    restoreData() {
        let data = new TodoData();
        let json = localStorage.getItem('todo-items')
        if (json)
            data.restore(json)
        return data
    },

    notify(commands) {
        if (this.updateEvent)
            this.updateEvent(commands)
    }
}


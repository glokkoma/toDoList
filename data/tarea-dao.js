class TareaDAO {
    #database = null;

    constructor(database) {
        this.#database = database;
    }

    findTareasByUserId(id){
        const sql= `SELECT * FROM tareas WHERE id_usuario=?`;
        return this.#database.prepare(sql).all(id);
    }

    saveTarea(id_usuario, titulo, descripcion, completada = 0, fecha_creacion) {
        fecha_creacion = new Date()
        const sql = `INSERT INTO tareas (id_usuario, titulo, descripcion, completada) VALUES (?, ?, ?, ?)`;
        return this.#database.prepare(sql).run(id_usuario, titulo, descripcion, completada);
    }

    deleteTarea(id) {
        const sql = `DELETE FROM tareas WHERE id = ?`;
        return this.#database.prepare(sql).run(id);
    }

    finishTarea(id) {
        const sql = `UPDATE tareas SET completada = 1 WHERE id = ?`;
        return this.#database.prepare(sql).run(id);
    }
}

module.exports = TareaDAO;
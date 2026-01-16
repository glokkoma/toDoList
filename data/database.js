const BetterSqlite3 = require("better-sqlite3");

class Database {
  static #db = null;

  constructor() {
    throw new Error("Usa .getInstance() para inicializarla");
  }

  static getInstance(dbPath) {
    if (Database.#db == null) {
      if (!dbPath) throw new Error("dbPath es requerido");
      
      Database.#db = new BetterSqlite3(dbPath);
      // Inicializar tablas
      require("./initialize-tareas")(Database.#db);
      require("./initialize-usuarios")(Database.#db);
    }
    return Database.#db;
  }

  static prepare(sql) {
    return Database.#db.prepare(sql);
  }
}

module.exports = Database;
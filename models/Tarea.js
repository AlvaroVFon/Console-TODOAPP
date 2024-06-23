class Tarea {
  constructor(description) {
    this.id = crypto.randomUUID();
    this.description = description;
    this.createtAt = new Date().toISOString();
    this.completed = false;
  }
}
export default Tarea;

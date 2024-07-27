import { TaskList, runMigrations } from "graphile-worker";
import config from "./graphile.worker.config";
import sayHello from "./tasks/enviarCorreo";

export const tasks: TaskList = {
    sayHello,
};

  
  async function main() {
    try {
      await runMigrations(config);
      console.log("Esquemas de Graphile Worker creados exitosamente");
    } catch (err) {
      console.error("Error al crear los esquemas de Graphile Worker:", err);
    }
  }
  
  

main();

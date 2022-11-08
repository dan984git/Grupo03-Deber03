# Todoapp Microfrontends Grupo2

### Universidad Poliltecnica Salesiana - Maestria de Software
### Patrones de diseño de software

Grupo 3:
- Daniel Burbano
- José Castillo
- Klever Simaliza
- Carlos Párraga
- Manuel Gómez

Tema: Patrones Command y Memento, demo

# Aplicación: Gestión de tareas: TODOs:

### Detalles técnicos:

- Frontend MVC: Vue.js 3 SPA
- Persistencia: localStorage
- Implementación patrones: archivo modelo.js

### Explicación:

La aplicación guarda una lista de tareas para completar, la lista se
despliega en pantalla. Se muestra al lado derecho, otra lista con las operaciones
que se han realizado desde que se cargó la página web.

Además de los patrones Command y Memento, se utilizó un muy simple Observer
para notificar cambios al componente que muestra la cola de comandos.

**Patrón Command**

Las operaciones para adicionar, eliminar, completar y editar tareas son
clases que heredan de la clase abstracta Command y tiene métodos para
ejecutar la operación y para deshacerla (undo), además de un método para 
mostrar detalles.

Los datos especificos de cada comando se pasan en el constructor.

La clase CommandHandler se encarga de ejecutar los comandos y mantener una
lista de estos que permite deshacer en secuencia. La lista tiene una
capacidad máxima de 10 elementos por efectos de demostración.

**Patrón Memento**

La clase Todo tiene métodos para crear un memento y para cargar datos
desde uno. En este caso particular, el memento no es otra clase sino la 
representación JSON del objeto que también se utiliza para persistencia.

En el caso de los Todos, el memento se utiliza para la funcionalidad de deshacer
edición, pudiendo regresar al estado anterior cuando se necesita ya que este
se almacena antes de ejecutar la edición.

Los datos de la aplicación están en la clase TodoData que también genera
mementos para guardar y cargar los datos, en este caso desde el localStorage
del navegador usando el mismo formato JSON.

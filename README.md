# ToDoList
📦 Instalación y ejecución
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/theizok/ToDoList.git
Abre la solución ToDoList.sln en Visual Studio.

Restaura los paquetes NuGet y compila la solución.

Configura la cadena de conexión a la base de datos en el archivo appsettings.json del proyecto ToDo.API.

Ejecuta las migraciones para crear la base de datos:

bash
Copiar
Editar
dotnet ef database update --project ToDo.API
Establece ToDo.API y ToDoList.FrontEnd como proyectos de inicio y ejecuta la solución.

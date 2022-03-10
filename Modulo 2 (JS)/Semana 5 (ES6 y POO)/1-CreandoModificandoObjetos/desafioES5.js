//Crea estructura consultorio
function Consultorio(nombre, pacientes) {
    var _nombre = nombre
    this.pacientes = pacientes || []

    //Get y Set para nombre
    Object.defineProperty(this, "_getNombre", {
        get: function () {
            return _nombre
        }
    })

    Object.defineProperty(this, "_setNombre", {
        set: function (nombre) {
            _nombre = nombre
        }
    })

    //Crear método para Get y Set de nombre
    Consultorio.prototype.getNombre = function () {
        return this._getNombre
    }

    Consultorio.prototype.setNombre = function (nombre) {
        this._setNombre = nombre
    }

    //Método para agregar un paciente
    Consultorio.prototype.agregarPaciente = function (paciente) {
        this.pacientes.push(paciente)
    }

    //Método para buscar un paciente por el nombre
    Consultorio.prototype.buscarNombre = function (nombre) {    
        for (var i = 0; i < pacientes.length; i++) {
            if(this.pacientes[i].getNombre() == nombre)
                return `Nombre: ${this.pacientes[i].getNombre()} \nEdad: ${this.pacientes[i].getEdad()}\nRut: ${this.pacientes[i].getRut()}\nDiagnóstico: ${this.pacientes[i].getDiagnostico()}`
        }
    }
    
    //Método para mostrar todos los pacientes
    Consultorio.prototype.mostrarPacientes = function () {
        for (var i = 0; i < pacientes.length; i++) {
            console.log(`Nombre: ${this.pacientes[i].getNombre()} \nEdad: ${this.pacientes[i].getEdad()}\nRut: ${this.pacientes[i].getRut()}\nDiagnóstico: ${this.pacientes[i].getDiagnostico()}`)
        }
    }
}

//Crea estructura paciente
function Paciente(nombre, edad, rut, diagnostico) {
    var _nombre = nombre
    var _edad = edad
    var _rut = rut
    var _diagnostico = diagnostico

    //Get y Set para nombre
    Object.defineProperty(this, "_getNombre", {
        get: function () {
            return _nombre
        }
    })

    Object.defineProperty(this, "_setNombre", {
        set: function (nombre) {
            _nombre = nombre
        }
    })

    //Crear método para Get y Set de nombre
    Paciente.prototype.getNombre = function () {
        return this._getNombre
    }

    Paciente.prototype.setNombre = function (nombre) {
        this._setNombre = nombre
    }

    //Get y Set para edad
    Object.defineProperty(this, "_getEdad", {
        get: function () {
            return _edad
        }
    })

    Object.defineProperty(this, "_setEdad", {
        set: function (edad) {
            _edad = edad
        }
    })

    //Crear método para Get y Set de nombre
    Paciente.prototype.getEdad = function () {
        return this._getEdad
    }

    Paciente.prototype.setEdad = function (edad) {
        this._setEdad = edad
    }

    //Get y Set para rut
    Object.defineProperty(this, "_getRut", {
        get: function () {
            return _rut
        }
    })

    Object.defineProperty(this, "_setRut", {
        set: function (rut) {
            _rut = rut
        }
    })

    //Crear método para Get y Set de rut
    Paciente.prototype.getRut = function () {
        return this._getRut
    }

    Paciente.prototype.setRut = function (rut) {
        this._setRut = rut
    }

    //Get y Set para diagnostico
    Object.defineProperty(this, "_getDiagnostico", {
        get: function () {
            return _diagnostico
        }
    })

    Object.defineProperty(this, "_setDiagnostico", {
        set: function (diagnostico) {
            _diagnostico = diagnostico
        }
    })

    //Crear método para Get y Set de diagnostico
    Paciente.prototype.getDiagnostico = function () {
        return this._getDiagnostico
    }

    Paciente.prototype.setDiagnostico = function (diagnostico) {
        this._setDiagnostico = diagnostico
    }
}

//Instanciar 3 obejetos Paciente
p1 = new Paciente('Alfredo', 20, "12.111.568-5", "Resfriado")
p2 = new Paciente('Natalia', 35, "20.502.510-3", "Hipertensión")
p3 = new Paciente('Javiera', 10, "23.364.044-3", "Diabetes")

//Instanciar 1 objeto Consultorio y agregar 2 Paciente
c1 = new Consultorio('Consult', [p1,p2])

//Agrega el tercer Paciente
c1.agregarPaciente(p3)

//Muestra por consola la lista de los pacientes
console.log(c1.mostrarPacientes());

//Muestra los datos de un paciente buscándolo por su nombre
console.log(c1.buscarNombre('Natalia'));
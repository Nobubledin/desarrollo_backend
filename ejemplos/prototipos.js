'use strict';

function Persona(nombre) {
  this.nombre = nombre;
  // this.saluda = function() { console.log('Hola soy', this.nombre); }
}

const pepe = new Persona('Pepe');
const luis = new Persona('Luis');

Persona.prototype.saluda = function() { console.log('Hola soy', this.nombre); }

pepe.saluda();
luis.saluda();
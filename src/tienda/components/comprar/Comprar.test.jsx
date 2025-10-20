<reference types="vitest" />
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Comprar from './Comprar.jsx';

global.localStorage = {
  store: {},
  getItem: function(key) {
    return this.store[key] || null;
  },
  setItem: function(key, value) {
    this.store[key] = value.toString();
  },
  removeItem: function(key) {
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  }
};

beforeEach(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify([
      { id: 1, nombre: "Pastel", precio_nuevo: 1000, quantity: 1, imagen: "img.jpg" }
    ])
  );
});

describe('Formulario Comprar - Nombre', () => {

  it('Renderiza el input "Nombre" correctamente', () => {
    render(
      <MemoryRouter>
        <Comprar />
      </MemoryRouter>
    );
    const nombreInput = screen.getByLabelText(/Nombre \*/i);
    expect(nombreInput).toBeTruthy();
  });

  it('Permite escribir texto en el input "Nombre"', async () => {
    render(
      <MemoryRouter>
        <Comprar />
      </MemoryRouter>
    );
    const nombreInput = screen.getByLabelText(/Nombre \*/i);
    await userEvent.type(nombreInput, 'Pedro');
    expect(nombreInput.value).toBe('Pedro');
  });

  it('No acepta números en el input "Nombre"', async () => {
    render(
      <MemoryRouter>
        <Comprar />
      </MemoryRouter>
    );
    const nombreInput = screen.getByLabelText(/Nombre \*/i);
    await userEvent.type(nombreInput, 'Pedro123');
    expect(nombreInput.value).not.toMatch(/\d/);
  });

});

describe('Formulario Comprar - Correo', () => {

  it('Renderiza el input de correo correctamente', () => {
    render(
      <MemoryRouter>
        <Comprar />
      </MemoryRouter>
    );
    const correoInput = screen.getByLabelText(/Correo \*/i);
    expect(correoInput).toBeTruthy();
  });

  it('Permite escribir texto en el input de correo', async () => {
    render(
      <MemoryRouter>
        <Comprar />
      </MemoryRouter>
    );
    const correoInput = screen.getByLabelText(/Correo \*/i);
    await userEvent.type(correoInput, 'ejemplo@gmail.com');
    expect(correoInput.value).toBe('ejemplo@gmail.com');
  });

  it('Valida que el correo tenga formato válido', async () => {
    render(
      <MemoryRouter>
        <Comprar />
      </MemoryRouter>
    );
    const correoInput = screen.getByLabelText(/Correo \*/i);

  await userEvent.clear(correoInput);
  await userEvent.type(correoInput, 'correo@valido.com');
  const correoValido2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoInput.value);
  expect(correoValido2).toBe(true); 
  });

});

describe('Formulario Comprar - Calle', () => {

  it('Renderiza el input "Calle" correctamente', () => {
    render(
      <MemoryRouter>
        <Comprar />
      </MemoryRouter>
    );
    const calleInput = screen.getByLabelText(/Calle \*/i);
    expect(calleInput).toBeTruthy();
  });

});

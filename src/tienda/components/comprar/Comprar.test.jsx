<reference types="vitest" />
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Comprar from './Comprar.jsx';

beforeEach(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify([
      { id: 1, nombre: "Pastel", precio_nuevo: 1000, quantity: 1, imagen: "img.jpg" }
    ])
  );
});

describe('Formulario Comprar', () => {

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

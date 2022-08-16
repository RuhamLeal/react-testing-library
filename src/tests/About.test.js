import { screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';
import renderWithRouter from '../RenderWithRouter';

describe('o componente <About.js /> é renderizado corretamente', () => {
  test('a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const subTitle = screen.getByRole('heading', { name: 'About Pokédex' }, { level: 2 });
    expect(subTitle).toBeInTheDocument();
  });
  test('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const parOne = screen
      .getByText(/This application simulates a Pokédex, a digital encyclopedia contain/i);
    expect(parOne).toBeInTheDocument();
    const parTwo = screen
      .getByText(/One can filter Pokémons by type, and see more details for each one o/i);
    expect(parTwo).toBeInTheDocument();
  });
  test('a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img.alt).toContain('Pokédex');
  });
});

import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import NotFound from '../pages/NotFound';

describe('o componente <NotFound.js /> é renderizado corretamente', () => {
  test('a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen
      .getByRole('heading', { name: /Page requested not found/i }, { level: 2 });
    expect(notFoundTitle).toBeInTheDocument();
  });
  test('a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imgs = screen.getAllByRole('img');
    const myImg = imgs.find((img) => img.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(myImg).toBeInTheDocument();
    expect(myImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(myImg.alt)
      .toContain('Pikachu crying because the page requested was not found');
  });
});

import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/RenderWithRouter';
import App from '../App';

describe('O componente <App.js /> é renderizado corretamente', () => {
  test('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linksNames = ['Home', 'About', 'Favorite Pokémons'];
    linksNames.forEach((linkName) => {
      const link = screen.getByRole('link', { name: linkName });
      expect(link).toBeInTheDocument();
    });
  });
  test(`a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkToHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test(`a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkToAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test(`a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkToFavoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test(`a aplicação é redirecionada para a página
   Not Found ao entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const notFoundTitle = screen.getByRole('heading', { level: 2 },
      { name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});

// test('', () => {});

import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('o componente <FavoritePokemons.js /> é renderizado corretamente', () => {
  test(`é exibida na tela a mensagem No favorite pokemon found,
  caso a pessoa não tenha pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const favPokemonTitle = screen
      .getByRole('heading', { name: /Favorite pokémons/i }, { level: 2 });
    expect(favPokemonTitle).toBeInTheDocument();
    const notFoundPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundPokemon).toBeInTheDocument();
  });
  test('são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkToDetails).toBeInTheDocument();
    userEvent.click(linkToDetails);
    const favInput = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favInput);
    expect(favInput.checked).toBe(true);
    const linkToFavsPok = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkToFavsPok).toBeInTheDocument();
    userEvent.click(linkToFavsPok);
    const favPokemonTitle = screen
      .getByRole('heading', { name: /Favorite pokémons/i }, { level: 2 });
    expect(favPokemonTitle).toBeInTheDocument();
    const pokemon01 = screen.getByText(/Pikachu/i);
    expect(pokemon01).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    const favIcon = imgs.find((img) => img.alt === 'Pikachu is marked as favorite');
    expect(favIcon.alt).toContain('Pikachu is marked as favorite');
  });
});

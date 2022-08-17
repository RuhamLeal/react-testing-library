import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';
import pokemons from '../data';

describe('o componente <Pokedex.js /> é renderizado corretamente', () => {
  test('a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen
      .getByRole('heading', { name: /Encountered pokémons/i }, { level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });
  test(`é exibido o próximo pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const nextPokButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokButton).toBeInTheDocument();
    const allPokemons = screen.getByRole('button', { name: /All/i });
    expect(allPokemons).toBeInTheDocument();
    userEvent.click(allPokemons);
    pokemons.forEach((pokemon) => {
      const pokTitle = screen.getByText(pokemon.name);
      expect(pokTitle).toBeInTheDocument();
      const linkToDetails = screen.getAllByRole('link', { name: /More details/i });
      expect(linkToDetails).toHaveLength(1);
      userEvent.click(nextPokButton);
    });
    const returnListToFirstPok = screen.getByText('Pikachu');
    expect(returnListToFirstPok).toBeInTheDocument();
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    buttonsType.forEach((button, ButtonIndex) => {
      const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
      expect(button.innerHTML).toBe(types[ButtonIndex]);
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const pokemonsType = pokemons
        .filter((pokemon) => pokemon.type === button.innerHTML);
      pokemonsType.forEach((pokType, i, arr) => {
        const pokTitle = screen.getByText(pokType.name);
        expect(pokTitle).toBeInTheDocument();
        const linkToDetails = screen.getAllByRole('link', { name: /More details/i });
        expect(linkToDetails).toHaveLength(1);
        expect(allPokemons).toBeInTheDocument();
        if (i !== arr.length - 1) {
          userEvent.click(nextPokButton);
        }
      });
    });
  });
});

// test('', () => {});

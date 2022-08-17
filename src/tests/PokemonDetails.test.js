import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';
import pokemons from '../data';

describe('o componente <PokemonDetails.js /> é renderizado corretamente', () => {
  test('as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    const three = 3;
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);
      const title = screen
        .getByRole('heading', { name: `${pokemon.name} Details` }, { level: 2 });
      expect(title).toBeInTheDocument();
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(three);
      const summaryTitle = screen.getByRole('heading', { name: 'Summary' }, { level: 2 });
      expect(summaryTitle).toBeInTheDocument();
      const summaryContent = screen.getByText(pokemon.summary);
      expect(summaryContent).toBeInTheDocument();
    });
  });
  test(`existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { foundAt } = pokemon;
      history.push(`/pokemons/${pokemon.id}`);
      const pokemonLocationsTitle = screen
        .getByRole(
          'heading',
          { name: `Game Locations of ${pokemon.name}` },
          { level: 2 },
        );
      expect(pokemonLocationsTitle).toBeInTheDocument();
      const imgs = screen.getAllByRole('img');
      const locationImgs = imgs.filter((img) => img.alt === `${pokemon.name} location`);
      expect(locationImgs).toHaveLength(foundAt.length);
      foundAt.forEach((e, index) => {
        const location = screen.getByText(e.location);
        expect(location).toBeInTheDocument();
        expect(locationImgs[index]).toBeInTheDocument();
        expect(locationImgs[index].src).toContain(e.map);
        expect(locationImgs[index].alt).toContain(`${pokemon.name} location`);
      });
    });
  });
  test(' o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      history.push(`/pokemons/${pokemon.id}`);
      const favPokemonInput = screen.getByLabelText('Pokémon favoritado?');
      expect(favPokemonInput).toBeInTheDocument();
      userEvent.click(favPokemonInput);
      expect(favPokemonInput.checked).toBe(true);
      const favImg = screen.getAllByRole('img')
        .find((img) => img.alt === `${pokemon.name} is marked as favorite`);
      expect(favImg).toBeInTheDocument();
      history.push('/favorites');
      const favPokTitle = screen
        .getByRole('heading', { name: /Favorite pokémons/i }, { level: 2 });
      expect(favPokTitle).toBeInTheDocument();
      const pokName = screen.getByText(pokemon.name);
      expect(pokName).toBeInTheDocument();
      const favImgInFavorites = screen.getAllByRole('img')
        .find((img) => img.alt === `${pokemon.name} is marked as favorite`);
      expect(favImgInFavorites).toBeInTheDocument();
      history.push(`/pokemons/${pokemon.id}`);
      const favPokemonInput01 = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(favPokemonInput01);
      expect(favPokemonInput01.checked).toBeFalsy();
      const notFavImg = screen.getAllByRole('img')
        .some((img) => img.alt === `${pokemon.name} is marked as favorite`);
      expect(notFavImg).toBeFalsy();
      history.push('/favorites');
      const favPokTitle01 = screen
        .getByRole('heading', { name: /Favorite pokémons/i }, { level: 2 });
      expect(favPokTitle01).toBeInTheDocument();
      expect(screen.queryByText(pokemon.name)).toBeNull();
    });
  });
});

// test('', () => {});

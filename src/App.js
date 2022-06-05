import React, { useState } from "react";
import Axios from "axios";
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

import Header from './components/headerComponent';
import Recipe from './components/recipe';

import img1 from './images/Book.svg'
import img2 from './images/Search.svg'

const APP_ID = "90de009a";
const APP_KEY = "b1dbb8e46a7813c3da3c985d75e5be86";

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <Recipe.RecipeContainer>
      <Dialog
        onClose={() => console.log("Container Closed")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <Recipe.RecipeName>{label}</Recipe.RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Recipe.SeeNewTab onClick={() => window.open(url)}>See More</Recipe.SeeNewTab>
          <Recipe.SeeMoreText onClick={() => setShow("")}>Close</Recipe.SeeMoreText>
        </DialogActions>
      </Dialog>
      <Recipe.RecipeName>{label}</Recipe.RecipeName>
      <Recipe.CoverImage src={image} alt={label} />
      <Recipe.IngredientsText onClick={() => setShow(!show)}>
        Ingredients List
      </Recipe.IngredientsText>
      <Recipe.SeeMoreText onClick={() => window.open(url)}>
        Full Recipe
      </Recipe.SeeMoreText>
    </Recipe.RecipeContainer>
  );
};

const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Header.Container>
      <Header.Header>
        <Header.AppName>
        <Header.RecipeImage src={img1}/>
          Recipe App
        </Header.AppName>
        <Header.SearchBox>
          <Header.SearchIcon src={img2}/>
          <Header.SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </Header.SearchBox>
      </Header.Header>
      <Header.RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Header.Placeholder src={img1}/>
        )}
      </Header.RecipeListContainer>
    </Header.Container>
  );
};

export default AppComponent;
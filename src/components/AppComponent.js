import React, { useState } from "react";
import Axios from "axios";
import img1 from '../images/hamburger.svg'
import img2 from '../images/search-icon.svg'
import RecipeComponent from "./RecipeComponent";
import styled from 'styled-components'
import '../index.css'

const APP_ID = "90de009a";
const APP_KEY = "b1dbb8e46a7813c3da3c985d75e5be86";

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;

const AppComponent = (props) => {
  //maintaining a state for keeping track of what the user enters in the search bar using searchQuery state 
  const [searchQuery, updateSearchQuery] = useState("");

  //this state stores the recipe list for a particular search 
  const [recipeList, updateRecipeList] = useState([]);

  //this state is for managing the time required displaying the search results after user enters in the search bar,
  const [timeoutId, updateTimeoutId] = useState();

  //Fetching JSON data from the API 
  //reccieve the searchstring (whatever user types in the search bar)
  //based on what the user enters in the searchstring, axios tries to find it from the data available to it, after data is recieved, DOM is populated with this data in the form of cards, each card representing a recipe for that particular value present inside the JSON data of the URL endpoint 
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https:api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    console.log('response',response)
    updateRecipeList(response.data.hits);
  };

  //for every text change were making an API call 
  //use concept of debouncing for making API calls 
  //when user completes typing in the search bar and make the app wait for around 1/2second (500ms) before loading the results 
  const onTextChange = (e) => {
    //every time user searchs in searchbar again, the previous timeout is erased, so we start with a fresh slate 
    clearTimeout(timeoutId);

    updateSearchQuery(e.target.value);
    //were storing the timeout in a constant because we'll be updating the time state with this value 
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    //updating the time state 
    updateTimeoutId(timeout);
  };

  return (
    <div className='Container'>
      <div className='Header'>
        <div className='AppName'>
          <img className='RecipeImage' src={img1} />
          Recipe's
        </div>
        <div className='SearchBox'>
          <img className='SearchIcon' src={img2} />
          <input className='SearchInput'
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
        {/* Searchbox ends  */}
      </div>
      {/* header ends  */}

      {/* whenever there is some content inside recipeList, map over the recipeList and return the recipeComponent else if there is no content inside recipeList then display the default svg*/}
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src={img1} />
        )}
      </RecipeListContainer>
     {/* recipelistcontainer ends */}
    </div>
    //container ends 
  );
};

export default AppComponent;
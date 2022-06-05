import React, { useState } from "react";
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import '../index.css'

const RecipeComponent = (props) => {
  //if Dialog is open or not, show or dont show the dialog
  const [show, setShow] = useState("");

  //recieve props from recipe object which returns every recipe present for a partular search, defined inside RecipeListContainer inside App component 
  //const {recipe} = props

  console.log('props', props)
  //destructuring recipe object 
  const { label, image, ingredients, url } = props.recipe;

  return (
    <div className='RecipeContainer'>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}>

        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <div className='RecipeName'>{label}</div>
          <table>
            <thead>
              <th>Food</th>
              <th>Text</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.food}</td>
                  <td>{ingredient.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <div className='SeeNewTab' onClick={() => window.open(url)}>See More</div>
          <div className='SeeMoreText' onClick={() => setShow("")}>Close</div>
        </DialogActions>
      </Dialog>

      <img className='CoverImage' src={image} alt={label} />
      <div className='RecipeName'>{label}</div>

      {/* when user clicks on ingredients button, setShow will be set to true, then open the popup */}
      <div className='IngredientsText' onClick={() => setShow(!show)}>
        Ingredients
      </div>
      
      {/* when user clicks on see complete recipe it redirects to the url passed from recipe object */}
      <div className='SeeMoreText' onClick={() => window.open(url)}>
        See Complete Recipe
      </div>
    </div>
    // recipe container ends 
  );
};

export default RecipeComponent
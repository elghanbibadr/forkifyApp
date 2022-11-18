'use strict';

const RrecipeUrl='https://forkify-api.herokuapp.com/api/search?q=';
const ingredientUrl='https://forkify-api.herokuapp.com/api/get?rId='
const searchInput=document.querySelector('.input-search');
const searchBtn=document.querySelector('.btn__search');
const loader1=document.querySelector('.loader1')
const recipeIngredientContainer=document.querySelector('.recipeIngredientContainer');
const recipeResultContainer=document.querySelector('.recipeResult');
const errorMsg=document.querySelector('.errorMsg');
const searchMsgBox=document.querySelector('.searchMsgBox')
const loader2=document.querySelector('.loader2')
 let recipes;

// FUNCTIONS
const clearRecipeResultContainer=()=>recipeResultContainer.innerHTML=0;

const showLoader=(element)=> element.classList.remove('hidden');

const hideLoader=(element)=>element.classList.add('hidden');


const showError =(message)=>{
errorMsg.classList.remove('hidden');
errorMsg.textContent=message;
}

const hideError=()=>{
    errorMsg.classList.add('hidden')
}

const clearInput=()=>searchInput.value='';

const showRecipies=({recipes:results})=>{
    let recipeBox;
 results.forEach(result=>{
    let {publisher,title,recipe_id,image_url}=result;
     recipeBox=document.createElement('div');
    recipeBox.classList.add('recipe');
    recipeBox.id=recipe_id;
    recipeBox.innerHTML=`
    <img class='recipe__image' src=${image_url}>
    <div class="recipe__desc">
        <h4 class='recipe__title'>${title}</h4>;
        <p class='recipe__publisher'>${publisher}</p>
    </div>
    `;
    recipeResultContainer.append(recipeBox)    
    recipeBox.addEventListener('click',getIngredients)
    }); 
}

const getResult=async(recipeName)=>{
    clearRecipeResultContainer();
    showLoader(loader1);
  
     try{
          const response=await fetch(`${RrecipeUrl}${recipeName}`)
           recipes=await response.json();
          hideLoader(loader1);
          if (!response.ok){
            throw new Error('No recipes found for your query! Please try again');
           
            }else{
                showRecipies(recipes);
            }
       }
       catch(error){ 
        showError(error.message)
      setTimeout(()=> hideError(),1000);
      }
   }


 async function getIngredients(){
    console.log(searchMsgBox)
    searchMsgBox.classList.add('hidden')
        showLoader(loader2)
      let recipeId=this.id;
      
          const response=await fetch(`${ingredientUrl}${recipeId}`)
          const  ingredients=await response.json();
          hideLoader(loader2);
          console.log(ingredients)
      }
    // now we need to bind the results to the ingredient container
   
//EVENT LISTENER
searchBtn.addEventListener('click',(e)=>{
    if (!searchInput.value){
        alert('please Enter a valid recipe name')
        return;
    }
    getResult(searchInput.value);
    clearInput();
})



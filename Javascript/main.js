const RrecipeUrl='https://forkify-api.herokuapp.com/api/search?q=';
const ingredientUrl='https://forkify-api.herokuapp.com/api/get?rId='
const searchInput=document.querySelector('.input-search');
const searchBtn=document.querySelector('.btn__search');
const loader=document.querySelector('.loader')
const recipeResultContainer=document.querySelector('.recipeResultContainer');
const errorMsg=document.querySelector('.errorMsg');
 let recipes;
//  let recipeBoxs=document.querySelector('.recipe');

// FUNCTIONS



const showLoader=()=>loader.classList.remove('hidden');

const hideLoader=()=>loader.classList.add('hidden');


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
    recipeBox.innerHTML=`
    <img class='recipe__image' src=${image_url}>
    <div class="recipe__desc">
        <h4 class='recipe__title'>${title}</h4>;
        <p class='recipe__publisher'>${publisher}</p>
    </div>
    `;
    recipeResultContainer.append(recipeBox)
     console.log(recipes)
     
     
    })
    recipeBox.addEventListener('click',()=>{
       console.log('clicked')
   })
}

const getResult=async(recipeName)=>{
  showLoader();
  
       try{
          const response=await fetch(`${RrecipeUrl}${recipeName}`)
           recipes=await response.json();
          hideLoader();
          showRecipies(recipes)
          if (!response.ok)
          throw new Error('No recipes found for your query! Please try again');
       }
       catch(error){ 
        showError(error.message)
      setTimeout(()=> hideError(),3000);
      }
   }

searchBtn.addEventListener('click',(e)=>{
    if (!searchInput.value){
        alert('please Enter a valid recipe name')
        return;
    }
    getResult(searchInput.value);
    clearInput();
    })


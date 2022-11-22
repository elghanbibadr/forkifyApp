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
let ingredientInfo=document.querySelector('.ingredientInfo')
let recipes;
let ingredientList=document.querySelector('.ingredient-list');
let btnController=document.querySelector('.btn-controler-box');
let recipeToBeVisiblePerPage=7;
let count=0;
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
    let count=recipes.count;
 results.forEach((result,index)=>{
    let {publisher,title,recipe_id,image_url}=result;
     recipeBox=document.createElement('div');
    recipeBox.classList.add('recipe');
    recipeBox.classList.add('hidden');
    recipeBox.id=recipe_id;
    recipeBox.setAttribute('recipe-index',index);
    recipeBox.innerHTML=`
    <img class='recipe__image' src=${image_url}>
    <div class="recipe__desc">
        <h4 class='recipe__title'>${title}</h4>;
        <p class='recipe__publisher'>${publisher}</p>
    </div>
    `;
    btnController.classList.remove('hidden');
    splitResults(recipeBox,count)
    recipeResultContainer.append(recipeBox)    
    recipeBox.addEventListener('click',getIngredients)
    }); 
}

const splitResults=(element,total)=>{
  if ((+element.getAttribute('recipe-index') >count) &&  (+element.getAttribute('recipe-index') < recipeToBeVisiblePerPage)){
      element.classList.remove('hidden');
  }
}
const getNextPageResult=(e)=>{
    console.log(e.target)
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


const showIngredient=(items)=>{
    ingredientList.innerHTML='';
    let {recipe:{ingredients,image_url,title}}=items;
    ingredientInfo.classList.remove('hidden')
    ingredientInfo.querySelector('.recipe-bg').src=image_url;  
  ingredients.forEach(value=>{
     value.slice(0,1);  
     let li=document.createElement('li');
     li.className='list-ingredient-item';
     li.textContent= value;
     ingredientList.append(li)
    })
  

}

async function getIngredients(){
    searchMsgBox.classList.add('hidden')
        showLoader(loader2)
      let recipeId=this.id;
      
          const response=await fetch(`${ingredientUrl}${recipeId}`)
          const  ingredients=await response.json();
          hideLoader(loader2);
          showIngredient(ingredients);
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


btnController.addEventListener('click',getNextPageResult)









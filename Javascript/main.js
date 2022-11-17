const RrecipeUrl='https://forkify-api.herokuapp.com/api/search?q=';
const ingredientUrl='https://forkify-api.herokuapp.com/api/get?rId='
const searchInput=document.querySelector('.input-search');
const searchBtn=document.querySelector('.btn__search');
const loader=document.querySelector('.loader')
const recipeResultContainer=document.querySelector('.recipeResultContainer');
const errorMsg=document.querySelector('.errorMsg');
export let result;

import './data.js';
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


const getResult=async(recipeName)=>{
  showLoader();
  
       try{
          const response=await fetch(`${RrecipeUrl}${recipeName}`)
          const data=await response.json();
          result=data;
          hideLoader();
        //    console.log(data)

          if (!response.ok)
          throw new Error('No recipes found for your query! Please try again');
       }
       catch(error){ 
        showError(error.message)
      setTimeout(()=> hideError(),3000);
      }
   
    //   console.log(result)
}

searchBtn.addEventListener('click',(e)=>{
    if (!searchInput.value){
        alert('please Enter a valid recipe name')
        return;
    }
    getResult(searchInput.value);
    clearInput();
    })






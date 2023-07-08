const apiId = '797617bc';
const apiKey = '6507b59b61669b627effa26a840eedf4';

// Variables
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const recipeContainer = document.getElementById('recipeContainer');
const ingredientsContainer = document.getElementById('ingredientsContainer');
const ingredientsList = document.getElementById('ingredientsList');

// Event listeners
searchBtn.addEventListener('click', searchRecipes);
document.addEventListener('click', hideIngredientsTile);

// Function to search recipes
function searchRecipes() {
    const searchTerm = searchInput.value;

    // Make API request to Edamam
    fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${apiId}&app_key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => console.log(error));
}

// Function to display recipes
function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeContainer.appendChild(recipeCard);
    });
}

// Function to create a recipe card
function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipeCard');

    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = recipe.recipe.label;

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.recipe.image;

    const ingredientsButton = document.createElement('button');
    ingredientsButton.textContent = 'View Ingredients';
    ingredientsButton.classList.add("ingredientsBtn");
    ingredientsButton.textContent = 'Ingredients';
    ingredientsButton.addEventListener('click', () => showIngredients(recipe.recipe.ingredients));

    recipeCard.appendChild(recipeTitle);
    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(ingredientsButton);

    return recipeCard;
}

// Function to display ingredients
function showIngredients(ingredients) {
    ingredientsList.innerHTML = '';

    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient.text;
        ingredientsList.appendChild(listItem);
    });

    ingredientsContainer.classList.remove('hidden');
    document.body.classList.add('overlay');
}

// Function to hide ingredients tile
function hideIngredientsTile(event) {
    if (!event.target.closest('#ingredientsContainer') && !event.target.matches('button')) {
        ingredientsContainer.classList.add('hidden');
        document.body.classList.remove('overlay');
    }
}

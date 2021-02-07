//handle search button and inputs
function searchMeal() {
    const searchedMeal = document.getElementById('search-meal').value;
    getMealsData(searchedMeal);
}

//get matching searched meals data and display
const getMealsData = searchedMeal => {
    const mealsDiv = document.getElementById('meals');

    mealsDiv.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
        .then(res => res.json())
        .then(data => {
            const meals = data.meals;
            console.log(meals);
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'meal';
                const mealInfo =
                    `<img onclick="displayMealDetail(${meal.idMeal})" src="${meal.strMealThumb}" alt="" class="meal-img img-fluid mb-2"> 
                    <h5 class="meal-name p-2">${meal.strMeal}</h5>`;
                mealDiv.innerHTML = mealInfo;
                mealsDiv.appendChild(mealDiv);
            });
        })
}


//display a meal details
const displayMealDetail = id => {
    const mealInfoDiv = document.getElementById("meal-detail");

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(data => data.json())
        .then(data => {
            const meal = data.meals[0];
            let ingredients = "";
            for (let i = 0; i < 10; i++) {
                ingredients += `<li> ${meal["strIngredient" + i]}</li>`;
            }
            mealInfoDiv.innerHTML = `
            <section class="container">
                    <div class="meal-info d-flex">      
                    <img src="${meal.strMealThumb}" class="text-center"/>
                    <div class="details p-3">
                    <h2>${meal.strMeal}</h2>
                      <h4>Ingredients</h4>
                      <ul>${ingredients}</ul>
                    </div>
                    </div>          
                  </div>  
            </div>
            <section>`;
        });
}


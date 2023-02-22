const GET_ALL_RECIPES = "recipe/GET_ALL_RECIPES";
const GET_SINGLE_RECIPE = "recipe/GET_SINGLE_RECIPE";
const CREATE_SINGLE_RECIPE = "recipe/CREATE_SINGLE_RECIPE";

const getAllRecipes = (data) => ({
    type: GET_ALL_RECIPES,
    payload: data,
});

const getSingleRecipe = (data) => ({
    type: GET_SINGLE_RECIPE,
    payload: data
});

const createSingleRecipe = (data) => ({
    type: CREATE_SINGLE_RECIPE,
    payload: data
});

const initialState = { singleRecipe: null, allRecipes: null };


export const thunkGetAllRecipe = () => async (dispatch) => {
    const response = await fetch("/api/recipes/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log('thunkhit')
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllRecipes(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export const thunkGetSingleRecipe = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleRecipe(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export const thunkCreateRecipe = (body) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${1}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...body
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createSingleRecipe(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};


export default function recipeReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_RECIPES:
            let result = {}
            action.payload.Recipes.forEach((recipe) => {
                result[recipe.id] = recipe;
            });
            return { allRecipes: result };
        case GET_SINGLE_RECIPE:
            newState = Object.assign({}, state);
            newState.singleRecipe = action.payload
            return newState;
        case CREATE_SINGLE_RECIPE:
            newState = Object.assign({}, state);
            newState.allRecipes[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}
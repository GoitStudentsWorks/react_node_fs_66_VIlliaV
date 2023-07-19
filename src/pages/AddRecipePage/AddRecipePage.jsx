import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainPageTitle from 'components/MainPageTitle/MainPageTitle';
import { StyledBody } from './AddRecipePage.styled';
import HeadContainer from 'components/HeadContainer/HeadContainer';
import FallowUs from 'components/AddRecipeForm/FallowUs';
import Popular from 'components/AddRecipeForm/PopularRecipe';
import { AddRecipeForm } from 'components/AddRecipeForm/AddRecipeForm';
import { getIngredients, getCategories } from 'components/AddRecipeForm/redux/AddRecipreOperation';

export default function AddRecipePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <HeadContainer>
      <MainPageTitle title="Add recipe" />

      <StyledBody>
        <div>
          <AddRecipeForm />
        </div>
        <div>
          <FallowUs />
          <Popular />
        </div>
      </StyledBody>
    </HeadContainer>
  );
}

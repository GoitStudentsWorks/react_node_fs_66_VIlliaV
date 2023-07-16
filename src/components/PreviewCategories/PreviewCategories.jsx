import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { CategoryRecipeCard } from 'components/CategoryRecipeCard/CategoryRecipeCard';
import { store } from 'redux/store';
import {
  ListRecipesContainer,
  ListRecipesItem,
  CategoryListItem,
  CategoryListHeader,
  SeeAllButton,
  OtherCategoriesButton,
} from './PreviewCategories.styled';

const token = store.getState().auth.token;

axios.defaults.baseURL = 'https://final-project-utf-8-backend.onrender.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const PreviewCategories = () => {
  const [previewCategoriesList, setPreviewCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPreviewCategoriesList().then(data => setPreviewCategoriesList(data));
  }, []);

  const fetchPreviewCategoriesList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/recipes/main-page`);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast.error('Ups...Something went wrong. Try again');
      setIsLoading(false);
    }
  };

  const handleClick = (category, event) => {
    event.preventDefault();
    const categoryLowCase = category.toLowerCase();
    navigate({
      pathname: `/categories/${categoryLowCase}`,
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && previewCategoriesList?.length > 0 && (
        <div>
          <ul>
            {previewCategoriesList.map(item => {
              const categoryName = Object.keys(item)[0];
              return (
                <CategoryListItem key={categoryName}>
                  <CategoryListHeader>{categoryName}</CategoryListHeader>
                  <ListRecipesContainer>
                    {Object.values(item)[0].map(({ _id, title, thumb }) => {
                      return (
                        <ListRecipesItem key={_id}>
                          <CategoryRecipeCard
                            itemId={_id}
                            imageUrl={thumb}
                            imageAlt={title}
                            title={title}
                          ></CategoryRecipeCard>
                        </ListRecipesItem>
                      );
                    })}
                  </ListRecipesContainer>
                  <SeeAllButton type="button" onClick={event => handleClick(categoryName, event)}>
                    See all
                  </SeeAllButton>
                </CategoryListItem>
              );
            })}
          </ul>
          <OtherCategoriesButton type="button" onClick={event => handleClick('beef', event)}>
            Other categories
          </OtherCategoriesButton>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default PreviewCategories;

import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ItemsCarousel from '../components/common/Carousel/ItemsCarousel';
import settings from '../settings/ShopBannerSettings';
import '../styles/pages/Shop.css';
import Product from '../components/common/ProductContainer/Product';
import CategoryList from '../components/CategoryList';
import { styled } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryProductsData } from '../actions/CategoryProductsAction';
import ProductsSkeleton from '../components/common/ProductsSkeleton';
import queryString from 'query-string';
import { getFeaturedProductsData } from '../actions/FeaturedProductsAction';
import { getNewProductsData } from '../actions/NewProductsAction';
import { searchProductApi } from '../apis/SearchProductApi';
const _ = require('lodash');

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

function Shop(props) {
  const history = useHistory();
  const [categoryId, setCategoryId] = useState();
  const [type, setType] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const categoryProducts = useSelector((state) => state.cateogryProducts);
  const newProducts = useSelector((state) => state.newProducts);
  const featuredProducts = useSelector((state) => state.featuredProducts);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const value = queryString.parse(props.location.search);
    window.scrollTo(0, 0);
    if (Object.keys(value).length > 0) {
      setType(value.type);
      if (value.type.toLowerCase() === 'category') {
        if (value?.id === null || value?.id === '' || value.id === undefined) {
          history.push('/not-found');
        }
        setCategoryId(value.id);
        dispatch(getCategoryProductsData(value.id));
      } else if (value.type.toLowerCase() === 'featured-product') {
        dispatch(getFeaturedProductsData());
      } else if (value.type.toLowerCase() === 'new-product') {
        dispatch(getNewProductsData());
      } else if (value.type.toLowerCase() === 'search') {
        if (
          value?.keyword === null ||
          value?.keyword === '' ||
          value.keyword === undefined
        ) {
          history.push('/not-found');
        }
        setKeyword(value.keyword);
        setProductLoading(true);
        searchProductApi(value.keyword).then((response) => {
          setProductLoading(false);
          setProducts(response?.result);
        });
      } else {
        setType('featured-product');
        dispatch(getFeaturedProductsData());
      }
    } else {
      setType('featured-product');
      dispatch(getFeaturedProductsData());
    }
  }, [categoryId, keyword, props.location.search, history, dispatch]);

  const mockData = [
    { id: 1, image: '/assets/ps4-banner.bmp', url: '#' },
    { id: 2, image: '/assets/drone-banner.jpg', url: '#' },
  ];

  const types = [
    {
      objectId: 'featured-product',
      category: 'Featured',
    },
    {
      objectId: 'new-product',
      category: 'New',
    },
  ];

  const handleCategoryChange = (id) => {
    history.push(`/shop?type=category&id=${id}`);
    setCategoryId(id);
    setType('category');
  };

  const handleTypeChange = (id) => {
    setType(id);
    setCategoryId(null);
    history.push(`/shop?type=${id}`);
  };

  return (
    <>
      <Container className="mt-30">
        <ItemsCarousel
          items={mockData}
          settings={settings}
          customStyle={{ width: '100%', height: '250px' }}
        />

        <div className="mt-50">
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <h3 className="filter-title">Categories {categoryId}</h3>
              <CategoryList
                categories={categories.categoryData}
                selectedId={categoryId}
                onCategoryChange={handleCategoryChange}
              />

              <section className="mt-30">
                <h3 className="filter-title">Price</h3>

                <FormControl fullWidth className="mt-10">
                  <Select
                    labelId="price-filter-label"
                    id="price-filter"
                    value={sortBy}
                    label="Filter by price"
                    input={<BootstrapInput />}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="asc">Lowest to Highest</MenuItem>
                    <MenuItem value="desc">Highest to Lowest</MenuItem>
                  </Select>
                </FormControl>
              </section>
              <br />
              <br />
              <h3 className="filter-title">Product Types</h3>
              <CategoryList
                categories={types}
                selectedId={type}
                onCategoryChange={handleTypeChange}
              />
            </Grid>

            {type === 'category' && (
              <Grid item lg={9} md={9} sm={8} xs={12}>
                <Grid container spacing={2}>
                  {categoryProducts &&
                  categoryProducts?.categoryProductsData.length === 0 &&
                  categoryProducts.categoryProductsDataLoader ? (
                    <ProductsSkeleton count={3} column={4} />
                  ) : categoryProducts?.categoryProductsData.length > 0 ? (
                    _.orderBy(
                      categoryProducts.categoryProductsData,
                      ['finalPrice'],
                      [sortBy]
                    )
                      .map((x) => ({
                        id: x.objectId,
                        productName: x.name,
                        isNew: false,
                        description: x.description,
                        price: x.finalPrice,
                        image: x.image1.url,
                      }))
                      .map((product) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={4}
                          sm={6}
                          key={product.id}
                        >
                          <Product
                            key={product.id}
                            product={product}
                            showBtn={true}
                          />
                        </Grid>
                      ))
                  ) : (
                    <Grid item xs={12} md={12} lg={12} sm={12}>
                      <p className="no-product">
                        Sorry we could not find any products by that category.
                      </p>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}

            {/* new-products Id */}
            {type === 'new-product' && (
              <Grid item lg={9} md={9} sm={8} xs={12}>
                <Grid container spacing={2}>
                  {newProducts && newProducts.newProductsDataLoader ? (
                    <ProductsSkeleton count={3} column={4} />
                  ) : newProducts.newProductsData ? (
                    _.orderBy(
                      newProducts?.newProductsData,
                      ['finalPrice'],
                      [sortBy]
                    )
                      .map((x) => ({
                        id: x.objectId,
                        productName: x.name,
                        isNew: false,
                        description: x.description,
                        price: x.finalPrice,
                        image: x.image1.url,
                      }))
                      .map((product) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={4}
                          sm={6}
                          key={product.id}
                        >
                          <Product
                            key={product.id}
                            product={product}
                            showBtn={true}
                            isNew={true}
                          />
                        </Grid>
                      ))
                  ) : (
                    <Grid item xs={12} md={12} lg={12} sm={12}>
                      <p className="no-product">
                        Sorry we could not find any products
                      </p>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}

            {/* search */}
            {type === 'search' && (
              <Grid item lg={9} md={9} sm={8} xs={12}>
                <h4 className="mb-10">
                  Search Results: {products && products?.length}
                </h4>
                <br />
                <Grid container spacing={2}>
                  {products &&
                  productLoading === true &&
                  Object.keys(products).length === 0 ? (
                    <ProductsSkeleton count={3} column={4} />
                  ) : products && products.length > 0 ? (
                    _.orderBy(products, ['finalPrice'], [sortBy])
                      .map((x) => ({
                        id: x.objectId,
                        productName: x.name,
                        isNew: false,
                        description: x.description,
                        price: x.finalPrice,
                        image: x.image1.url,
                      }))
                      .map((product) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={4}
                          sm={6}
                          key={product.id}
                        >
                          <Product
                            key={product.id}
                            product={product}
                            showBtn={true}
                            isNew={true}
                          />
                        </Grid>
                      ))
                  ) : (
                    <Grid item xs={12} md={12} lg={12} sm={12}>
                      <p className="no-product">
                        Sorry we could not find any products
                      </p>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}

            {/* featured-product Id */}
            {type === 'featured-product' && (
              <Grid item lg={9} md={9} sm={8} xs={12}>
                <Grid container spacing={2}>
                  {featuredProducts &&
                  featuredProducts.featuredProductsDataLoader ? (
                    <ProductsSkeleton count={3} column={4} />
                  ) : featuredProducts?.featuredProductsData ? (
                    _.orderBy(
                      featuredProducts.featuredProductsData,
                      ['finalPrice'],
                      [sortBy]
                    )
                      .map((x) => ({
                        id: x.objectId,
                        productName: x.name,
                        isNew: false,
                        description: x.description,
                        price: x.finalPrice,
                        image: x.image1.url,
                      }))
                      .map((product) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          lg={4}
                          sm={6}
                          key={product.id}
                        >
                          <Product
                            key={product.id}
                            product={product}
                            showBtn={true}
                          />
                        </Grid>
                      ))
                  ) : (
                    <Grid item xs={12} md={12} lg={12} sm={12}>
                      <p className="no-product">
                        Sorry we could not find any products
                      </p>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      </Container>
    </>
  );
}

export default Shop;

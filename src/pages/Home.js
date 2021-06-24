import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Banner from '../components/common/Banner';
import ItemsCarousel from '../components/common/Carousel/ItemsCarousel';
import ProductList from '../components/common/ProductContainer/ProductList';
import SlickSettings from '../settings/SlickSettings';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelector } from 'react-redux';
import ProductsSkeleton from '../components/common/ProductsSkeleton';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';

const promotions = [
  {
    image: 'assets/ads1.webp',
    url: '/',
  },
  {
    image: 'assets/ads2.webp',
    url: '/',
  },
];

function Home() {
  const history = useHistory();
  const categoryState = useSelector((state) => state.categories);
  const newProducts = useSelector((state) => state.newProducts);
  const featuredProducts = useSelector((state) => state.featuredProducts);
  return (
    <>
      <Carousel
        infiniteLoop={true}
        swipeable={false}
        stopOnHover={true}
        showStatus={false}
        showArrows={false}
        showIndicators={true}
        showThumbs={false}
      >
        <div>
          <img src="assets/banner1.webp" alt="Main Banner 1" />
        </div>
        <div>
          <img src="assets/banner2.webp" alt="Main Banner 2" />
        </div>
      </Carousel>

      <Container>
        {categoryState.categoryDataLoader ? (
          <Grid container spacing={2} style={{ marginTop: '50px' }}>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <Skeleton variant="rect" width={300} height={150} />
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <Skeleton variant="rect" width={300} height={150} />
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <Skeleton variant="rect" width={300} height={150} />
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <Skeleton variant="rect" width={300} height={150} />
            </Grid>
          </Grid>
        ) : (
          <div>
            <h1 className="page-heading">Categories</h1>
            <ItemsCarousel
              items={categoryState.categoryData.map((x) => ({
                id: x.objectId,
                url: `shop?type=category&id=${x.objectId}`,
                image: x?.image.url,
                name: x.category,
              }))}
              settings={SlickSettings}
            />
          </div>
        )}

        <section className="mt-90">
          {featuredProducts.featuredProductsDataLoader ? (
            <ProductsSkeleton count={4} />
          ) : (
            <ProductList
              products={featuredProducts.featuredProductsData.map((x) => ({
                id: x.objectId,
                productName: x.name,
                isNew: false,
                description: x.description,
                price: x.finalPrice,
                image: x?.image1.url,
              }))}
              title="FEATURED PRODUCTS"
              showBtn={true}
              onViewMoreClick={() => {
                history.push('/shop?type=featured-products');
              }}
            />
          )}
        </section>
        <section className="mt-90">
          {newProducts.newProductsDataLoader ? (
            <ProductsSkeleton count={4} />
          ) : (
            <ProductList
              products={newProducts.newProductsData.map((x) => ({
                id: x.objectId,
                productName: x.name,
                isNew: true,
                description: x.description,
                price: x.finalPrice,
                image: x?.image1.url,
              }))}
              title="newly arrived products"
              showBtn={true}
              onViewMoreClick={() => {
                history.push('/shop?type=new-products');
              }}
            />
          )}
        </section>
        <Grid container spacing={2} className="mt-50">
          {promotions.map((promotion, index) => (
            <Grid item xs={12} lg={6} sm={6} md={6} key={index}>
              <Banner image={promotion.image} url={promotion.url} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;

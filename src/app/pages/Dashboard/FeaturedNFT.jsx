import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { topartWork } from '../../../vendor/common/data/index';
import { featuredNFTData } from '../../../vendor/common/data/dashboardNFT';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';

// Import Chart
import { TopArtworkChart } from './DashboardNFTCharts';

//SimpleBar
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';

const FeaturedNFT = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xxl={12}>
          <div className='d-flex pt-2 pb-4'>
            <h5 className='card-title fs-18 mb-1'>Ruanganku</h5>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={4}
            spaceBetween={10}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className='mySwiper marketplace-swiper rounded gallery-light'
          >
            <div className='swiper-wrapper'>
              {featuredNFTData.map((item, key) => (
                <SwiperSlide key={key}>
                  <div className='card explore-box card-animate rounded'>
                    <div className='bookmark-icon position-absolute top-0 end-0 p-2'>
                      <button
                        aria-label='button'
                        type='button'
                        className='btn btn-icon active'
                        data-bs-toggle='button'
                        aria-pressed='true'
                      >
                        <i className='mdi mdi-cards-heart fs-16'></i>
                      </button>
                    </div>
                    <div className='explore-place-bid-img'>
                      <img src={item.img} alt='' className='img-fluid card-img-top explore-img' />
                      <div className='bg-overlay'></div>
                      <div className='place-bid-btn'>
                        <Link to='#!' className='btn btn-success'>
                          <i className='ri-auction-fill align-bottom me-1'></i> Place Bid
                        </Link>
                      </div>
                    </div>
                    <CardBody>
                      <p className='fw-medium mb-0 float-end'>
                        <i className='mdi mdi-heart text-danger align-middle'></i> {item.price}{' '}
                      </p>
                      <h5 className='mb-1'>
                        <Link to='/apps-nft-item-details'>{item.title}</Link>
                      </h5>
                      <p className='text-muted mb-0'>{item.category}</p>
                    </CardBody>
                    <div className='card-footer border-top border-top-dashed'>
                      <div className='d-flex align-items-center'>
                        <div className='flex-grow-1 fs-14'>
                          <i className='ri-price-tag-3-fill text-warning align-bottom me-1'></i>{' '}
                          Highest: <span className='fw-medium'>{item.highest}</span>
                        </div>
                        <h5 className='flex-shrink-0 fs-14 text-primary mb-0'>{item.price}</h5>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
            <div className='swiper-button-next'></div>
            <div className='swiper-button-prev'></div>
          </Swiper>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FeaturedNFT;

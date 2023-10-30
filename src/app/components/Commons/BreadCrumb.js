import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Row, Col } from 'reactstrap';

import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
const BreadCrumb = ({ title, pageTitle, canvasTitle, canvasComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(0);
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'F2') {
        setIsOpen(!isOpen);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className='page-title-box d-sm-flex align-items-center justify-content-between'>
            <h4 className='mb-sm-0'>{title}</h4>

            <div className='page-title-right'>
              <ol className='breadcrumb m-0 align-items-center'>
                {/* <li className="breadcrumb-item"><Link to="#">{pageTitle}</Link></li> */}
                <li className='breadcrumb-item active'>{pageTitle}</li>
                <li className='active ml-4'>
                  <Button
                    onClick={() => setIsOpen(true)}
                    size='sm'
                    className='btn-soft-secondary fs-13'
                    title='Open Documentation Page'
                  >
                    <i className='mdi mdi-school fs-14'></i> LEARN
                    <Badge className='ml-2'>F2</Badge>
                  </Button>
                </li>
              </ol>
            </div>
          </div>
        </Col>
      </Row>
      <Offcanvas
        show={isOpen}
        onHide={() => setIsOpen(!isOpen)}
        scroll={false}
        placement='end'
        backdrop='static'
      >
        <Offcanvas.Header closeButton className='border-bottom'>
          <Offcanvas.Title>{canvasTitle}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{canvasComponent}</Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

BreadCrumb.propTypes = {
  title: PropTypes.string,
  pageTitle: PropTypes.string,
  canvasTitle: PropTypes.string,
  canvasComponent: PropTypes.any,
};

BreadCrumb.defaultProps = {
  title: '',
  pageTitle: '',
  canvasTitle: 'Page Documentation',
  canvasComponent: <>I will not close if you click outside of me.</>,
};

export default BreadCrumb;

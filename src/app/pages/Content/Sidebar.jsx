import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const ComponentName = () => {
  const [mailList, setMailList] = useState([]);
  const [activeTabs, setActive] = useState('all');
  const [isLabelTab, setIsLabelTab] = useState('');
  const [isTypeTab, setIsTypeTab] = useState('primary');
  const [displayCategory, setCategory] = useState('all');
  const [displaytype, settype] = useState('all');
  const [displaylabel, setLabel] = useState('all');
  const toggleTab = (ncategory, ntype, nlabel) => {
    var element = document.getElementById('mail-filter-navlist');
    if (ncategory === 'all' || ncategory === 'inbox') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
    if (activeTabs !== ncategory) {
      setActive(ncategory);
    }
    if (isLabelTab !== nlabel) {
      setIsLabelTab(nlabel);
    }
    if (isTypeTab !== ntype) {
      setIsTypeTab(ntype);
    }
    setCategory(ncategory);
    settype(ntype);
    setLabel(nlabel);
  };
  useEffect(() => {
    // initEditor();
  }, []);
  return (
    <div>
      <SimpleBar className='mx-n4 px-4 email-menu-sidebar-scroll' data-simplebar>
        <div className='mail-list mt-3'>
          <Link
            to='#'
            onClick={() => {
              toggleTab('all', 'all', 'all');
            }}
            className={classnames({ active: activeTabs === 'all' })}
          >
            <i className='ri-mail-fill me-3 align-middle fw-medium'></i>{' '}
            <span className='mail-list-link'>All </span>
            <span className='badge badge-soft-success ms-auto'>5</span>
          </Link>
          <Link
            to='#'
            onClick={() => {
              toggleTab('inbox', 'all', 'all');
            }}
            className={classnames({ active: activeTabs === 'inbox' })}
          >
            <i className='ri-inbox-archive-fill me-3 align-middle fw-medium'></i>{' '}
            <span className='mail-list-link'>Inbox </span>
            <span className='badge badge-soft-success ms-auto'>5</span>
          </Link>
          <Link
            to='#'
            onClick={() => {
              toggleTab('sent', 'all', 'all');
            }}
            className={activeTabs === 'sent' ? 'active' : null}
          >
            <i className='ri-send-plane-2-fill me-3 align-middle fw-medium'></i>{' '}
            <span className='mail-list-link'>Sent</span>
          </Link>
          <Link
            to='#'
            onClick={() => {
              toggleTab('draft', 'all', 'all');
            }}
            className={activeTabs === 'draft' ? 'active' : null}
          >
            <i className='ri-edit-2-fill me-3 align-middle fw-medium'></i>
            <span className='mail-list-link'>Draft</span>
          </Link>
          <Link
            to='#'
            onClick={() => {
              toggleTab('spam', 'all', 'all');
            }}
            className={activeTabs === 'spam' ? 'active' : null}
          >
            <i className='ri-error-warning-fill me-3 align-middle fw-medium'></i>
            <span className='mail-list-link'>Spam</span>
          </Link>
          <Link
            to='#'
            onClick={() => {
              toggleTab('trash', 'all', 'all');
            }}
            className={activeTabs === 'trash' ? 'active' : null}
          >
            <i className='ri-delete-bin-5-fill me-3 align-middle fw-medium'></i>
            <span className='mail-list-link'>Trash</span>
          </Link>
          <Link
            to='#'
            onClick={() => {
              toggleTab('starred', 'all', 'all');
            }}
            className={activeTabs === 'starred' ? 'active' : null}
          >
            <i className='ri-star-fill me-3 align-middle fw-medium'></i>
            <span className='mail-list-link'>Starred</span>
          </Link>
          <Link
            to='#'
            onClick={() => {
              toggleTab('important', 'all', 'all');
            }}
            className={activeTabs === 'important' ? 'active' : null}
          >
            <i className='ri-price-tag-3-fill me-3 align-middle fw-medium'></i>
            <span className='mail-list-link'>Important</span>
          </Link>
        </div>

        <div>
          <h5 className='fs-12 text-uppercase text-muted mt-4'>Labels</h5>

          <div className='mail-list mt-1'>
            <Link
              to='#'
              onClick={() => {
                toggleTab('all', 'all', 'support');
              }}
              className={isLabelTab === 'support' ? 'active' : null}
            >
              <span className='ri-checkbox-blank-circle-line me-2 text-info'></span>{' '}
              <span className='mail-list-link'>Support </span>
              <span className='badge badge-soft-success ms-auto'>3</span>
            </Link>
            <Link
              to='#'
              onClick={() => {
                toggleTab('all', 'all', 'freelance');
              }}
              className={isLabelTab === 'freelance' ? 'active' : null}
            >
              <span className='ri-checkbox-blank-circle-line me-2 text-warning'></span>{' '}
              <span className='mail-list-link'>Freelance</span>
            </Link>
            <Link
              to='#'
              onClick={() => {
                toggleTab('all', 'all', 'social');
              }}
              className={isLabelTab === 'social' ? 'active' : null}
            >
              <span className='ri-checkbox-blank-circle-line me-2 text-primary'></span>{' '}
              <span className='mail-list-link'>Social</span>
            </Link>
            <Link
              to='#'
              onClick={() => {
                toggleTab('all', 'all', 'friend');
              }}
              className={isLabelTab === 'friend' ? 'active' : null}
            >
              <span className='ri-checkbox-blank-circle-line me-2 text-danger'></span>{' '}
              <span className='mail-list-link'>Friends</span>
              <span className='badge badge-soft-success ms-auto'>2</span>
            </Link>
            <Link
              to='#'
              onClick={() => {
                toggleTab('all', 'all', 'family');
              }}
              className={isLabelTab === 'family' ? 'active' : null}
            >
              <span className='ri-checkbox-blank-circle-line me-2 text-success'></span>{' '}
              <span className='mail-list-link'>Family</span>
            </Link>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ComponentName;

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import BreadCrumb from '../../../vendor/Components/Common/BreadCrumb';
import { __openModal } from '../../modules/Modal';
import EditorJs from '../../components/EditorJS/EditorJs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

import classnames from 'classnames';

import SimpleBar from 'simplebar-react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import InputEmojiWithRef from 'react-input-emoji';
import { EDITOR_JS_TOOLS } from '../../components/EditorJS/EditorJs';

import Sidebar from './Sidebar';
// import { createReactEditorJS } from 'react-editor-js';
// const ReactEditorJS = createReactEditorJS();

// Initial Data

const blocks = [
  {
    id: 'mZnqbXk4Ch',
    type: 'alert',
    data: {
      type: 'info',
      align: 'left',
      message:
        '<b>GitBook tip:</b><div><span data-offset-key="d9c1ab7251964fd9b00bcec4398744d5:1" data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdpdEJvb2slMjB0aXAlM0ElMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMm1hcmslMjIlMkMlMjJ0eXBlJTIyJTNBJTIyYm9sZCUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0QlNUQlMkMlMjJzZWxlY3Rpb25zJTIyJTNBJTVCJTVEJTdEJTJDJTdCJTIyb2JqZWN0JTIyJTNBJTIybGVhZiUyMiUyQyUyMnRleHQlMjIlM0ElMjIlMjB5b3VyJTIwcHJvZHVjdCUyMGRvY3MlMjBhcmVuJ3QlMjBqdXN0JTIwYSUyMHJlZmVyZW5jZSUyMG9mJTIwYWxsJTIweW91ciUyMGZlYXR1cmVzISUyMHVzZSUyMHRoZW0lMjB0byUyMGVuY291cmFnZSUyMGZvbGtzJTIwdG8lMjBwZXJmb3JtJTIwY2VydGFpbiUyMGFjdGlvbnMlMjBhbmQlMjBkaXNjb3ZlciUyMHRoZSUyMHZhbHVlJTIwaW4lMjB5b3VyJTIwcHJvZHVjdC4lMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU1RCUyQyUyMnNlbGVjdGlvbnMlMjIlM0ElNUIlNUQlN0QlNUQlMkMlMjJrZXklMjIlM0ElMjJhMjFkYWQ2NDFiNGE0NDhmOTNmYjdjODgwZGVlMDIxOSUyMiU3RCU1RCUyQyUyMmtleSUyMiUzQSUyMjg3Yzk4MWRjNzdhMzRkZDFiNDkwNGVmZmY0MmIwYTMzJTIyJTdEJTVEJTJDJTIya2V5JTIyJTNBJTIyYWM2ZDQ2MzBmNjZhNGY4M2I2NTQxM2M3ZWNiMWQ3NWUlMjIlN0Q=">your product docs aren\'t just a reference of all your features! use them to encourage folks to perform certain actions and discover the value in your product.</span></div>',
    },
  },
  {
    id: 'xEd2L6fZLB',
    type: 'header',
    data: {
      text: '<span data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJoZWFkaW5nLTElMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMk92ZXJ2aWV3JTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlMkMlMjJzZWxlY3Rpb25zJTIyJTNBJTVCJTVEJTdEJTVEJTJDJTIya2V5JTIyJTNBJTIyYjFkNTg4MWQ3N2JhNGE1MTgwNzQxYTMzNzE5OWZjMzglMjIlN0QlNUQlMkMlMjJrZXklMjIlM0ElMjI1M2Y3NWQyN2Q5OTQ0N2IwOTRlZmFmNGY2ZjZhMThhMiUyMiU3RCU1RCUyQyUyMmtleSUyMiUzQSUyMjA1MmRjODM1ZDFmMTQwZDc5ZjM3ZThhYjFlYjFiNWI1JTIyJTdE" style="white-space: pre;">Overview</span>',
      level: 2,
    },
  },
  {
    id: 'fTWVpu-Bk-',
    type: 'paragraph',
    data: {
      text: '<font style="color: rgb(255, 255, 255);"></font><font style="color: rgb(255, 255, 255);"></font><font style="color: rgb(255, 255, 255);"></font><font style="color: rgb(150, 150, 150);">Here are a couple of example overviews from products with really great docs:</font>',
    },
    tunes: {
      anyTuneName: {
        alignment: 'left',
      },
    },
  },
  {
    id: 'Q8LN_ppwP_',
    type: 'paragraph',
    data: {
      text: 'Loom is a video messaging tool that helps you get your message across through instantly shareable videos.With Loom, you can record your camera, microphone, and desktop simultaneously. Your video is then instantly available to share through Loom\'s patented technology. — <font style="color: rgb(0, 112, 255);">From the Loom Docs</font>',
    },
    tunes: {
      anyTuneName: {
        alignment: 'left',
      },
    },
  },
  {
    id: 'WIEdexHDvP',
    type: 'header',
    data: {
      text: 'Test Code',
      level: 2,
    },
  },
  {
    id: 'G2tkJtEyRX',
    type: 'codeBox',
    data: {
      html: 'using System;\n\nnamespace HelloWorld\n{\n  class Program\n  {\n    static void Main(string[] args)\n    {\n      Console.WriteLine("Hello World!");    \n    }\n  }\n}',
    },
  },
  {
    id: 'wWJZY3Mmii',
    type: 'header',
    data: {
      text: 'Test Formula',
      level: 2,
    },
  },
  {
    id: 'Kt1iqykfik',
    type: 'math',
    data: {
      text: 'f_x = {a \\above{2pt} b+1}',
    },
  },
];

const INITIAL_DATA = {
  time: 1698474725639,
  blocks: blocks,
};

const ContentPage = () => {
  const ejInstance = useRef();
  const textbox = useRef(null);
  const textbox2 = useRef(null);

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
  /**
   * Initial dispatch variabel assign to useDispatch
   */
  const dispatch = useDispatch();
  const [height, setHeight] = useState({ height: '50px' });
  const handleMessageChange = (e, ref) => {
    adjustHeight(ref);
    // const { target, height, currentTarget } = e;
    // if (target.value) {
    //   return setHeight({ height: target.scrollHeight + 'px' });
    // }
    // return setHeight({ height: '50px' });
  };

  function adjustHeight(ref) {
    ref.current.style.height = 'inherit';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }

  /**
   * Initial ModulTypeuser Reducer
   */
  //  const modulContent = useSelector(state => state.modulContent);
  //  const { status } = modulContent;
  /**
   * Listen to reducer
   */
  useEffect(() => {
    if (status === 'default') {
      /**
       * Fetching data
       */
    }
  }, [status, dispatch]);
  const [data, setData] = useState(INITIAL_DATA);

  console.log(data);
  // useLayoutEffect(adjustHeight, []);

  return (
    <div className='page-content h-100' style={{ minHeight: '100vh' }}>
      {/**
       * Init Form Add Component
       */}
      {/*  Component Form Add */}

      {/**
       * Init Form Edit Component
       */}
      {/* // Component Form Edit */}
      <Container fluid>
        <BreadCrumb title='Page Title' pageTitle='Dashboard' />
        <div className='email-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1 border'>
          <div className='email-menu-sidebar h-100'>
            <div className='p-4 d-flex flex-column h-100'>
              <div className='pb-4 border-bottom border-bottom-dashed'>
                <button
                  type='button'
                  className='btn btn-danger w-100'
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <FeatherIcon icon='plus-circle' className='icon-xs me-1 icon-dual-light' />
                  New Content
                </button>
                <Sidebar />
              </div>
            </div>
          </div>
          <div className=' w-100 bg-white pt-5'>
            <Card className='shadow-none w-100 h-100 '>
              <div className='editor '>
                <div className=''>
                  <div className='m-auto form-title'>
                    <div>
                      <textarea
                        className='editor-title mb-1 p-0'
                        rows={1}
                        placeholder='Content Title'
                        defaultValue='Page Title'
                        onChange={(e) => handleMessageChange(e, textbox)}
                        ref={textbox}
                      ></textarea>
                      <textarea
                        className='editor-description mb-1 p-0'
                        rows={1}
                        placeholder={'Page description ( optional )'}
                        onChange={(e) => handleMessageChange(e, textbox2)}
                        ref={textbox2}
                      ></textarea>
                    </div>
                  </div>
                  <EditorJs data={data} onChange={setData} editorblock='editorjs-container' />
                  {/* <ReactEditorJS defaultBlock={INITIAL_DATA} tools={EDITOR_JS_TOOLS} /> */}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContentPage;

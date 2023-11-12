import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../components/Commons/BreadCrumb';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { actDetailDataRoom } from '../../modules/Room';
import { useState } from 'react';
import {
  actDeleteDataContent,
  actDetailDataContent,
  actPostDataContent,
  actPublishDataContent,
  actUpdateDataContent,
} from '../../modules/Room/Content_act';
import { Confirm } from '../../components/Confirm/Confirm';
import EditorJs, { EDITOR_JS_TOOLS } from '../../components/EditorJS/EditorJs';
import { useRef } from 'react';
// import { createReactEditorJS } from 'react-editor-js';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import moment from 'moment';

// const ReactEditorJS = createReactEditorJS();

const DetailRoom = (props) => {
  const textbox = useRef(null);
  const textbox2 = useRef(null);
  const toast = useRef(null);

  const { id, contentid } = useParams();
  const { idRoom } = useSelector(({ modulRoom }) => ({
    idRoom: modulRoom.id,
  }));
  const [data, setData] = useState({
    room_title: '',
    category_icon: '',
    _id: '',
    room_description: '',
  });
  const [blocks, setBlocks] = useState({});
  const [dataContent, setDataContent] = useState({
    title: '',
    description: '',
    blocks: {},
    room: data._id,
    header: '0',
    status: '0',
    room_id: '0',
    _id: '0',
    content_slug: '',
    updated_at: new Date(),
  });

  const dispath = useDispatch();
  useEffect(() => {
    if (id !== idRoom) {
      dispath(actDetailDataRoom({ id: id }));
    }
  }, [id, idRoom]);

  const { detailRoom } = useSelector(({ modulRoom }) => ({
    detailRoom: modulRoom.detail,
  }));

  useEffect(() => {
    if (Object.keys(detailRoom)) {
      setData(detailRoom);
    }
  }, [detailRoom]);

  const { idContent, detailContent, statusContent } = useSelector(({ modulContentRoom }) => ({
    idContent: modulContentRoom.id,
    detailContent: modulContentRoom.detail,
    statusContent: modulContentRoom.status,
  }));

  useEffect(() => {
    if (contentid !== undefined && contentid !== idContent) {
      setBlocks({});
      dispath(actDetailDataContent({ id: contentid }));
    }
  }, [contentid, idContent]);

  useEffect(() => {
    if (contentid === idContent && Object.keys(detailContent).length) {
      setDataContent({
        ...detailContent,
        title: detailContent.content_title,
        description: detailContent.content_description,
        blocks: detailContent.content_blocks,
        header: detailContent.is_header,
        status: detailContent.content_status,
      });

      setBlocks(detailContent.content_blocks);
    }
  }, [contentid, idContent, detailContent]);

  const handleMessageChange = (e, ref) => {
    adjustHeight(ref);

    const { target } = e;
    setDataContent({
      ...dataContent,
      [target.name]: target.value,
    });
  };

  function adjustHeight(ref) {
    ref.current.style.height = 'inherit';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }

  const UpdateContent = () => {
    // console.log(dataContent);
    const { title, description, status, room_id, _id, header } = dataContent;

    return dispath(
      actUpdateDataContent({
        id: _id,
        title: title,
        description: description,
        status: status,
        blocks: blocks,
        room: room_id,
        header: header,
        code: contentid,
        room_code: idRoom,
      })
    );
  };

  const handleBlocks = (data) => {
    // console.log(data);
    setDataContent({
      ...dataContent,
      blocks: data,
    });
  };

  const newContent = () => {
    confirmDialog({
      message: 'Do you want to create new content?',
      header: 'New Content',
      icon: 'pi pi-info-circle',
      acceptClassName: 'btn-sm btn-default',
      rejectClassName: 'btn-sm me-2 btn-danger',
      draggable: false,
      accept: () =>
        dispath(
          actPostDataContent({
            room: data._id,
            title: 'Untitle Content',
            description: 'Short Description',
            header: '0',
            status: '0',
            blocks: {
              time: new Date(),
            },
          })
        ),

      reject: () => {},
    });
  };

  const handleDeleteContent = (params) => {
    confirmDialog({
      message: 'Do you want to delete the content?',
      header: 'Delete Content',
      icon: 'pi pi-info-circle',
      acceptClassName: 'btn-sm btn-default',
      rejectClassName: 'btn-sm me-2 btn-danger',
      draggable: false,
      accept: () => dispath(actDeleteDataContent(params)),

      reject: () => {},
    });
  };

  return (
    <div className='page-content pb-0 m-0 pt-0'>
      <ConfirmDialog />
      <Toast ref={toast} />

      <Container fluid className='' style={{ marginTop: '100px', marginBottom: '0px' }}>
        <div className='email-wrapper d-flex gap-1 mx-n4 mt-n4 px-2 py-0'>
          <div
            className='email-menu-sidebar pb-3 position-fixed overflow-auto w-25 '
            style={{ minHeight: '92vh' }}
          >
            <div className='d-flex flex-column overflow-auto'>
              <CardHeader className='bg-white'>
                <button
                  type='button'
                  className='btn btn-danger w-100'
                  onClick={() => {
                    newContent();
                  }}
                >
                  <FeatherIcon icon='plus-circle' className='icon-xs me-2 icon-dual-light' />
                  New Content
                </button>
              </CardHeader>
              <Sidebar />
            </div>
          </div>

          <div
            className='w-100 bg-white border-left-1 overflow-hidden p-0 border'
            style={{ marginLeft: '17%', minHeight: '100vh' }}
          >
            <div className='border-bottom'>
              <Container fluid className='postition-fixed'>
                <div className='w-84 mx-auto py-2 border-0'>
                  <BreadCrumb title={data.room_title} icon={data.category_icon} />
                </div>
              </Container>
            </div>
            {contentid ? (
              <React.Fragment>
                {Object.keys(detailContent).length > 0 ? (
                  <>
                    <CardHeader style={{ marginTop: '' }}>
                      <div
                        style={{ width: '84%' }}
                        className='mx-auto d-flex justify-content-between align-items-center'
                      >
                        <div className='form-check form-switch d-flex align-items-center gap-2'>
                          <Input
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='flexSwitchCheckDefault'
                            color='default'
                          />
                          <Label
                            className='form-check-label fs-16 text-muted'
                            for='flexSwitchCheckDefault'
                          >
                            Preview Mode
                          </Label>
                        </div>
                        <div className='d-flex gap-2'>
                          <Button color='warning'>
                            <span className='mdi mdi-lock mr-2'></span>Lock
                          </Button>
                          <Button
                            type='button'
                            onClick={() => UpdateContent()}
                            disabled={
                              statusContent === 'loading' || Object.keys(blocks).length === 0
                            }
                          >
                            <span className='mdi mdi-content-save mr-2'></span>Save
                          </Button>
                          <UncontrolledButtonDropdown id='btnGroupDrop1' className=''>
                            <DropdownToggle
                              color='transparent'
                              className='shadow-none btn-icon text-muted px-0'
                            >
                              <FeatherIcon icon='more-vertical' />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>
                                <i className='mdi mdi-eye text-muted fs-16 align-middle me-1'></i>{' '}
                                <span className='align-middle'>View Content</span>
                              </DropdownItem>

                              <DropdownItem>
                                <i className='mdi mdi-share-variant text-muted fs-16 align-middle me-1'></i>{' '}
                                <span className='align-middle'>Share</span>
                              </DropdownItem>
                              <div className='dropdown-divider'></div>
                              <DropdownItem
                                onClick={() =>
                                  dispath(
                                    actPublishDataContent({
                                      id: contentid,
                                      status: dataContent.status === '1' ? '0' : '1',
                                      room_code: id,
                                    })
                                  )
                                }
                              >
                                <i className='mdi  mdi-publish-off text-muted fs-16 align-middle me-1'></i>{' '}
                                <span className='align-middle'>
                                  {dataContent.status === '1' ? 'Unpublish' : 'Publish'}
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                className='text-danger'
                                onClick={() =>
                                  handleDeleteContent({ id: contentid, room_code: idRoom })
                                }
                              >
                                <i className='mdi  mdi-alert-circle-outline fs-16 align-middle me-1'></i>
                                <span className='align-middle'>Delete</span>{' '}
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </div>
                      </div>
                    </CardHeader>
                    <Card className='shadow-none w-100 h-100 pt-3 border-0'>
                      <div className='editor '>
                        <div className=''>
                          <div className='m-auto form-title'>
                            <div>
                              <div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                  {dataContent.status === '0' ? (
                                    <Badge color='warning' className='fs-10'>
                                      Draft
                                    </Badge>
                                  ) : (
                                    <Badge color='success' className='fs-10'>
                                      Publish
                                    </Badge>
                                  )}
                                  <p className='mb-0 mt-0 fs-12 text-muted'>
                                    Last Update at :{' '}
                                    {moment(dataContent.updated_at).format('DD MMM YYYY H:mm')}
                                  </p>
                                </div>
                                <textarea
                                  className='editor-title mb-2 p-0 '
                                  rows={1}
                                  placeholder='Content Title'
                                  value={dataContent.title}
                                  onChange={(e) => handleMessageChange(e, textbox)}
                                  name='title'
                                  ref={textbox}
                                ></textarea>
                                <textarea
                                  className='editor-description mb-1 p-0'
                                  rows={1}
                                  placeholder={'Page description ( optional )'}
                                  onChange={(e) => handleMessageChange(e, textbox2)}
                                  ref={textbox2}
                                  name='description'
                                  value={dataContent.description}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className='px-4 mt-3'>
                            <EditorJs
                              data={detailContent.content_blocks}
                              onChange={setBlocks}
                              editorblock={'editor'}
                            />
                          </div>
                          {/* <ReactEditorJS defaultBlock={blocks} tools={EDITOR_JS_TOOLS} /> */}
                        </div>
                      </div>
                    </Card>
                  </>
                ) : (
                  <div
                    style={{ width: '84%' }}
                    className='mx-auto py-4  h-50 d-flex justify-content-center align-items-center'
                  >
                    <div className='w-25'>
                      <h4 className='text-left fw-bold'>Page not found</h4>
                      <p>Sorry, but the page you were looking for could not be found.</p>
                      <div className='gap-2 d-flex'>
                        <Button
                          color='transparent'
                          size='sm'
                          className='border shadow-none'
                          onClick={() => newContent()}
                        >
                          <FeatherIcon icon='plus-circle' className='icon-xs me-2' />
                          Create Content
                        </Button>
                        <Button color='info' size='sm' className=' shadow-none'>
                          Back to home
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <div
                style={{ width: '84%' }}
                className='mx-auto py-4  h-50 d-flex justify-content-center align-items-center'
              >
                <div className='w-25 '>
                  <h4 className='text-left fw-bold'>Welcome to {data.room_title}</h4>
                  <p>
                    This space has been set for deletion 5m ago. You have to restore it before it's
                    fully deleted from our system.
                  </p>
                  <Button
                    color='transparent'
                    className='border shadow-none'
                    onClick={() => newContent()}
                  >
                    <FeatherIcon icon='plus-circle' className='icon-xs me-2' />
                    Create Content
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailRoom;

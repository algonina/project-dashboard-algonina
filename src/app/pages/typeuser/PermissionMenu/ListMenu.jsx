import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actGetDataMenu } from '../../../modules/Schema';
import { DndProvider } from 'react-dnd';
import { MultiBackend, Tree, getBackendOptions } from '@minoru/react-dnd-treeview';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { actGetDataPermissionShema, actPostPermissionDataMenu } from '../../../modules/Permission';
import Can, { checkPermissionFunc } from '../../../components/Helper/Can';

const ListMenu = (props) => {
  const { dataMenu, statusMenu } = useSelector(({ modulMenu }) => ({
    dataMenu: modulMenu.data,
    statusMenu: modulMenu.status,
  }));
  const dispatch = useDispatch();
  const [rest, setRest] = useState([]);
  const [load, setLoad] = useState(true);
  const [selectMenu, setSelectMenu] = useState([]);

  /**
   * First time listen menu
   */
  useEffect(() => {
    if (statusMenu === 'default') {
      dispatch(actGetDataMenu());
    }
  }, [dataMenu, statusMenu]);

  const { idPermissionMenu, dataPermissionMenu, statusPermissionMenu } = useSelector(
    ({ modulPermissionMenu }) => ({
      idPermissionMenu: modulPermissionMenu.id,
      dataPermissionMenu: modulPermissionMenu.data,
      statusPermissionMenu: modulPermissionMenu.status,
    })
  );

  useEffect(() => {
    if (statusPermissionMenu === 'success') {
      setSelectMenu([]);
    }
  }, [statusPermissionMenu]);

  /**
   * Structur menu
   */
  useEffect(() => {
    /**
     * Init datas assign array
     */
    let datas = [];

    /**
     * *Restructur data
     * *When status is success and data length more than 0
     */
    if (dataMenu.length > 0 && statusMenu === 'success') {
      /**
       * Set data to rest state
       */
      let childs = [];
      datas = dataMenu
        .filter((fill) => fill.menu_parent !== '')
        .map((item, i) => {
          return {
            ...item,
            class: 'nested-1',
            text: item.menu_name,
            id: item._id,
            droppable: true,
            parent: parseInt(item.menu_parent),
          };
        });
      setRest(datas);

      setSelectMenu([]);
    }
  }, [statusMenu, dataMenu]);

  useEffect(() => {
    if (statusMenu === 'success') {
      setLoad(false);
    }
  }, [statusMenu]);

  const handleChangeCheckbox = (params) => {
    const { target } = params;
    const { checked, value } = target;
    let data = selectMenu;
    let datas = [];
    if (selectMenu.length > 0) {
      let pushorNot = data.indexOf(value);
      if (pushorNot > -1) {
        datas = data.filter((it) => it !== value);
      } else {
        datas = data;
        datas.push(value);
      }
    } else {
      datas.push(value);
    }

    setSelectMenu(datas);
  };

  const savePermissionMenu = () => {
    dispatch(actPostPermissionDataMenu({ menu: selectMenu, typeuser: idPermissionMenu }));
  };

  const checked = (value) => {
    let data = dataPermissionMenu.filter(
      (item) => parseInt(item.menu_id) === value && item.is_active === '1'
    );
    return data.length > 0 ? true : false;
  };

  const onRefresh = () => {
    dispatch(actGetDataMenu());
    return dispatch(actGetDataPermissionShema(idPermissionMenu, 'by=typeuser'));
  };

  return (
    <div>
      <div className='mb-3 d-flex justify-content-between align-items-center gap-2 btn-action-icon'>
        <h5>Manage Permission Menu</h5>
        <div className='d-flex gap-2'>
          <Can
            modul={'permission-menu|create'}
            yes={
              <Button
                color='success'
                size='sm'
                onClick={() => savePermissionMenu()}
                disabled={selectMenu.length === 0 || statusPermissionMenu === 'loading'}
              >
                <i className='ri-save-3-fill fs-14'></i>{' '}
                {statusPermissionMenu === 'loading' ? 'loading...' : 'Save'}
              </Button>
            }
          />
          <Can
            modul={'permission-menu|create'}
            yes={
              <Button
                onClick={() => onRefresh()}
                size='sm'
                className='btn-action-icon'
                disabled={statusMenu === 'loading' || statusPermissionMenu === 'loading'}
              >
                <i className='ri-refresh-line fs-14'></i> Refresh
              </Button>
            }
          />
        </div>
      </div>
      {!load ? (
        <div className=''>
          {rest.length < 1 ? <Alert color='danger'>Menu is empty</Alert> : ''}
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Tree
              classes={{
                listItem: 'list-style-none',
                root: 'tree',
              }}
              tree={rest}
              initialOpen={true}
              rootId={0}
              canDrag={false}
              dropTargetOffset={10}
              sort={false}
              render={(node, { depth, isOpen, onToggle }) => {
                return (
                  <div
                    className={`d-flex align-items-center p-2 justify-items-center py-3 border " ${
                      isOpen ? 'text-primary' : ''
                    }`}
                  >
                    <div
                      className={`title d-flex align-items-center text-capitalize m-0 fs-14 border-0  ${
                        isOpen ? 'text-primary' : ''
                      }`}
                    >
                      {node.droppable && (
                        <div className='border-0'>
                          <span onClick={onToggle} className='mr-2 fs-4'>
                            {isOpen ? (
                              <i className='bx bx-chevron-down' />
                            ) : (
                              <i className='bx bx-chevron-up' />
                            )}
                          </span>
                        </div>
                      )}
                      {node.icon !== '' && node.parent === 0 ? (
                        <i className={`mr-1 ${node.menu_icon}`} />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='mb-0 border-0' style={{ marginBottom: 0 }}>
                      <Input
                        type='checkbox'
                        className='mr-1 ml-1'
                        value={node._id}
                        name='check'
                        disabled={statusMenu === 'loading' || statusPermissionMenu === 'loading'}
                        defaultChecked={checked(node.id)}
                        onChange={(event) => handleChangeCheckbox(event)}
                        id={`${node.id}`}
                      />
                      <span className='m-0 text-dark font-weight-bold' htmlFor={`${node.id}`}>
                        {node.text}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </DndProvider>
        </div>
      ) : (
        '...'
      )}
    </div>
  );
};

export default ListMenu;

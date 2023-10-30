import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
// import { prop } from 'dom7';

class ExportCsvButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      // this.preParedata();
    }
  }

  preParedata = () => {
    const { data, columns, filename } = this.props;
    let result = [filename, ''];
    let header = [];
    if (columns.length > 0) {
      columns.map((item) => {
        let col = item.split('|');
        let header_text = col[1] ? col[1] : col[0];
        let vals = header_text.replace(/"g/, '\\"');
        return header.push(`"${vals}"`);
      });
    }
    // console.log(header.join(","));
    result.push(header.join(';'));
    if (data.length > 0) {
      data.map((val) => {
        let items = [];
        columns.map((item) => {
          let col = item.split('|');
          let header_text = col[0] ? col[0] : '-';
          const escape = val[header_text] ? ('' + val[header_text]).replace(/"g/, '\\"') : '';
          return items.push(`${escape}`);
        });

        return result.push(items.join(';'));
      });
    }
    return result.join('\n');
  };

  download = () => {
    const data = this.preParedata();
    const { filename } = this.props;
    // const { data } = this.state;
    console.log(data);
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename + '.csv'}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  render() {
    const { btnText } = this.props;
    return (
      <div>
        <Button className='ml-2 mb-2' color='info' onClick={() => this.download()}>
          <i className='ri-file-download-line align-bottom me-1'></i>
          {`${btnText}`}
        </Button>
      </div>
    );
  }
}

const ModalDownload = () => {
  return (
    <Modal isOpen={true}>
      <ModalHeader toggle={() => {}}></ModalHeader>

      <ModalBody className='py-3 px-5'>
        <div className='mt-2 text-center'>
          <lord-icon
            src='https://cdn.lordicon.com/nocovwne.json'
            trigger='loop'
            colors='primary:#0ab39c,secondary:#f06548'
            style={{ width: '100px', height: '100px' }}
          ></lord-icon>
          <div className='mt-4 pt-2 fs-15 mx-4 mx-sm-5'>
            <h4>Are you sure ?</h4>
            <p className='text-muted mx-4 mb-0'>Are you sure you want to export CSV file?</p>
          </div>
        </div>
        <div className='d-flex gap-2 justify-content-center mt-4 mb-2'>
          <button
            type='button'
            className='btn w-sm btn-light'
            data-bs-dismiss='modal'
            onClick={() => {}}
          >
            Close
          </button>
          <Button
            type='button'
            onClick={() => {}}
            className='btn w-sm btn-success '
            id='delete-record'
          >
            Download
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};
ExportCsvButton.propTypes = {
  btnText: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  filename: PropTypes.string,
};

ExportCsvButton.defaultProps = {
  btnText: 'Export CSV',
  columns: [],
  data: [],
  filename: 'filedownload',
};

export default ExportCsvButton;

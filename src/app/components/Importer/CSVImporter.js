import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { Formik, useFormik, Field } from "formik";
import Papa from "papaparse";
const CSVImporter = (props) => {
  const { maxFile, onChange, preview } = props;
  const fileMax = maxFile * 1024;
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const validate = useFormik({
    initialValues: {
      file: "",
    },
    validationSchema: Yup.object().shape({
      file: Yup.mixed()
        .required()
        .test("fileSize", "File too large", (value) => {
          return value && value.size <= fileMax;
        })
        .test("fileFormat", "Unsuppoerted Format", (value) => {
          return value && value.type === "text/csv";
        }),
    }),
    onSubmit: (values) => {
      const { file } = values;
      const renderFile = new FileReader();
      renderFile.onload = async ({ target }) => {
        let datas = [];
        const csv = Papa.parse(target.result, { header: true });
        const csvData = csv?.data ? csv.data : [];
        const header = Object.keys(csv?.data ? csv.data[0] : []);
        if (csvData.length) {
          let valid = true;
          csvData.map((item, i) => {
            valid = true;
            header.map((key) => {
              if (!item[key]) {
                valid = false;
              }
            });
            if (valid) {
              return datas.push(item);
            }
          });
        }

        setData(datas);
        setHeader(header);
        if (typeof onChange === "function") {
          return onChange({ data: datas, header: header });
        } else {
          console.log(header, "header");
          console.log(datas, "data");
        }
      };

      renderFile.readAsText(file);
    },
  });

  const { setValues, errors, values, isSubmitting } = validate;

  const handleChange = (e) => {
    setValues({
      file: e.target.files[0],
    });
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validate.handleSubmit();
        }}
      >
        <FormGroup>
          <Label>Select CSV File</Label>
          <Input
            className="form-control"
            type="file"
            name="file"
            id="formFile"
            accept=".csv"
            onChange={handleChange}
          />
          <FormText color="danger">{errors.file}</FormText>
        </FormGroup>
        <FormGroup>
          <Button type="submit">Review</Button>
        </FormGroup>
      </Form>
      {preview ? (
        <div className="table-responsive">
          <h4 className="text-center">Data Preview</h4>
          <Table
            border={"true"}
            hover={true}
            className="table-bordered"
            striped={true}
          >
            <thead>
              <tr>
                {header.map((item, i) => {
                  return (
                    <th className="text-uppercase" key={"thead-" + i}>
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={"tr-" + i}>
                    {header.map((it, a) => {
                      return (
                        <td className="text-uppercase" key={a}>
                          {item[it]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

CSVImporter.propTypes = {
  preview: PropTypes.bool,
  onChange: PropTypes.func,
  maxFile: PropTypes.number,
};

CSVImporter.defaultProps = {
  preview: true,
  onChange: "",
  maxFile: 100,
};

export default CSVImporter;

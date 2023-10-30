import React, { useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { actUpdateAllocationInvoiceRequestPayment } from "../../../modules/Invoice";
import { formatRupiah } from "../../../helpers/Currency";
import { Confirm } from "../../Confirm/Confirm";

const PostPayment = ({
  name,
  status,
  id,
  invoiceCode,
  request_code,
  request_allocation,
  callback,
  disabled,
  refrence_id,
}) => {
  const dispatch = useDispatch();

  /**
   * Initial fields and validate with react-form-input-validation
   */
  const validation = useFormik({
    initialValues: {
      invoice_code: btoa(invoiceCode),
      total: request_allocation,
    },
    validationSchema: Yup.object({
      invoice_code: Yup.string().required(),
      total: Yup.string().required(),
    }),
    onSubmit: (values) => {
      /**
       * Method used to submit form
       */

      let confirmOption = {
        title: `Post to ${name}`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(
                actUpdateAllocationInvoiceRequestPayment({
                  ...values,
                  id: btoa(id),
                  refrence_id: refrence_id,
                })
              );
              resetForm();
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      };

      Confirm(confirmOption);
    },
  });
  const { errors, values, setValues, resetForm } = validation;

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    callback(id, value);
    validation.handleChange(e);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit(e);
      }}
    >
      <Row>
        <Col lg={9}>
          <FormGroup>
            <Label className="text-muted">{request_code}</Label>
            <div className="input-group mb-0">
              <span className="input-group-text">
                {formatRupiah(isNaN(values.total) ? 0 : values.total)}
              </span>
              <Input
                name="total"
                placeholder={`${name}`}
                onChange={handleChange}
                defaultValue={values.total}
                autoComplete="off"
              />
            </div>
            <FormText>{errors.total}</FormText>
          </FormGroup>
        </Col>
        <Col lg={3} className="d-flex align-items-end justify-content-end">
          <FormGroup>
            <Button
              color="success"
              type="submit"
              disabled={disabled}
              className="ms-5"
            >
              {status !== "loading" ? "Update" : "loading..."}
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default PostPayment;

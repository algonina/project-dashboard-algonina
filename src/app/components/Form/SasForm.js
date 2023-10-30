import { Field, Form, Formik } from 'formik';
import React from 'react';

const SasForm = (props) => {
  return (
    <Formik
      initialValues={{ name: '', slug: '' }}
      onSubmit={(values, actions) => {}}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name='firstName' className='form-control' type='email' />
        </Form>
      )}
    </Formik>
  );
};

export default SasForm;

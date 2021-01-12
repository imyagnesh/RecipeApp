import { FastField, Formik } from 'formik';
import PropTypes from 'prop-types';

import React, { forwardRef } from 'react';
import { View } from 'react-native';
// import styles from './styles';

const index = forwardRef(({ fields, ...rest }, ref) => (
  <Formik innerRef={ref} {...rest}>
    {() => (
      <View>
        {fields.map(x => (
          <FastField key={x.name} {...x} />
        ))}
      </View>
    )}
  </Formik>
));

index.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default index;

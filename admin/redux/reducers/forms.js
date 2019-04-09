import { combineForms } from 'react-redux-form';

import { ROOT_FORM } from '../../constants';

const initital = {
	id: '',
	name: '',
	description: '',
  price: '',
  image: '',
	properties: [
    {
      id: '',
      name: '',
      values: [
        {
          id: '',
          price: '',
          value: ''
        }
      ]
    }
  ] 
};

export default combineForms({ editProduct: initital }, ROOT_FORM);
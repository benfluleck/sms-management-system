import { isUUID } from 'validator';

const validateUUID = (value) => (isUUID(value, 4));


export default validateUUID;

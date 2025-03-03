import { format } from 'date-fns';

const logger = {
  info: function (...args) {
    console.log(`${format(new Date(), 'HH:mm:ss')}`, ...args);
  },
  error: function (...args) {
    console.error(`${format(new Date(), 'HH:mm:ss')}`, ...args);
  },
};

export default logger;

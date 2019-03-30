import { useQuery } from 'react-apollo-hooks';


export default (query, {errorPolicy = 'throw', ...restOpts} = {}, cache) => {
  const ret = useQuery(query, restOpts, cache);
  if (errorPolicy === 'throw' && ret.error) {
    throw ret.error;
  }
  return ret;
};

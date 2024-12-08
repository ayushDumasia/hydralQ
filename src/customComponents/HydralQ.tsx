import PropTypes from 'prop-types';
const HydralQ = ({ className, ...props }) => {
  return (
    <h2 className={`font-semibold ${className}`} {...props}>
      <span className='text-extend-secondaryAzure'>Hydral</span>
      <span className='text-2xl'>Q</span>
    </h2>
  );
};

HydralQ.propTypes = {
  className: PropTypes.string,
};

export default HydralQ;

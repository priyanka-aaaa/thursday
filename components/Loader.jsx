import React from 'react';

const Loader = () => {
    return (
      <div  className="website-loading">

      <div className="load-pict">
      <img src="/images/loader.gif" alt="" loading="lazy" />
        <div className="loader"></div>
      
      </div>
      
      </div>
    );
};

export default Loader;
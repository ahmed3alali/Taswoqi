import React from 'react'
import {Helmet} from "@modern-js/runtime/head";
const MetaData = ({title}) => {
  return <Helmet>

<title>{`${title} - Taswoqi`}</title>

  </Helmet>
}

export default MetaData
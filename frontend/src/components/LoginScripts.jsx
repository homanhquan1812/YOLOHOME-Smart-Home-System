import React from 'react'
import { Helmet } from 'react-helmet'

const LoginScripts = () => {
  return (
    <Helmet>
      <script src="./vendor/global/global.min.js"></script>
      <script src="./vendor/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
      <script src="js/deznav-init.js"></script>
      <script src="./js/custom.js"></script>
      <script src="./js/demo.js"></script>
      <script src="./js/styleSwitcher.js"></script>
    </Helmet>
  )
}

export default LoginScripts
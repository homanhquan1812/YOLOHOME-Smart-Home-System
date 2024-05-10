import React from "react";
import { Helmet } from "react-helmet";
 
class Heads extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
            <meta charset="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="keywords" content=""/>
            <meta name="author" content=""/>
            <meta name="robots" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content="Yashadmin:Sales Management System Admin Bootstrap 5 Template"/>
            <meta property="og:title" content="Yashadmin:Sales Management System Admin Bootstrap 5 Template"/>
            <meta property="og:description" content="Yashadmin:Sales Management System Admin Bootstrap 5 Template"/>
            <meta property="og:image" content="https:/yashadmin.dexignzone.com/xhtml/social-image.png"/>
            <meta name="format-detection" content="telephone=no"/>
            
            <title>Yash Admin Sales Management System</title>
            
            <link rel="shortcut icon" type="image/png" href="images/favicon.png"/>
            <link href="./css/style.css" rel="stylesheet"/>
            </Helmet>
        </div>
    );
  }
};

export default Heads;
import React from "react";
import { Helmet } from "react-helmet";
 
class Heads extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="keywords" content="" />
                <meta name="author" content=""/>
                <meta name="robots" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="format-detection" content="telephone=no"/>

                <title>YoloHome</title>
                <link rel="shortcut icon" type="image/png" href="images/favicon.png"/>
                
                <link href="./vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet"/>
                <link href="./vendor/swiper/css/swiper-bundle.min.css" rel="stylesheet"/>
                <link href="./vendor/swiper/css/swiper-bundle.min.css" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.6.4/nouislider.min.css"/>
                <link href="./vendor/datatables/css/jquery.dataTables.min.css" rel="stylesheet"/>
                <link href="https://cdn.datatables.net/buttons/1.6.4/css/buttons.dataTables.min.css" rel="stylesheet"/>
                <link href="vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet"/>
                
                <link href="./vendor/tagify/dist/tagify.css" rel="stylesheet"/>
                
                <link href="./css/style.css" rel="stylesheet"/>
            </Helmet>
        </div>
    );
  }
};

export default Heads;
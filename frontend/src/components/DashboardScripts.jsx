/*
import React from 'react'
import { Helmet } from 'react-helmet'

const DashboardScripts = () => {
  return (
    <Helmet>
      <script src="./vendor/global/global.min.js"></script>
      <script src="./vendor/chart.js/Chart.bundle.min.js"></script>
      <script src="./vendor/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
      <script src="./vendor/apexchart/apexchart.js"></script>

      <script src="./js/dashboard/dashboard-1.js"></script>
      <script src="./vendor/draggable/draggable.js"></script>
      <script src="./vendor/swiper/js/swiper-bundle.min.js"></script>
      <script src="./js/dashboard/humidity.js"></script>
      <script src="./js/dashboard/illuminance.js"></script>
      <script src="./js/dashboard/overall.js"></script>

      <script src="./vendor/tagify/dist/tagify.js"></script>

      <script src="./vendor/datatables/js/jquery.dataTables.min.js"></script>
      <script src="./vendor/datatables/js/dataTables.buttons.min.js"></script>
      <script src="./vendor/datatables/js/buttons.html5.min.js"></script>
      <script src="./vendor/datatables/js/jszip.min.js"></script>
      <script src="./js/plugins-init/datatables.init.js"></script>

      <script src="vendor/bootstrap-datetimepicker/js/moment.js"></script>
      <script src="vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>

      <script src="./vendor/jqvmap/js/jquery.vmap.min.js"></script>
      <script src="./vendor/jqvmap/js/jquery.vmap.world.js"></script>
      <script src="./vendor/jqvmap/js/jquery.vmap.usa.js"></script>
      <script src="./js/custom.js"></script>
      <script src="./js/deznav-init.js"></script>
      <script src="./js/demo.js"></script>
      <script src="./js/styleSwitcher.js"></script>
    </Helmet>
  )
}

export default DashboardScripts
*/


import React, { useEffect } from 'react';

const DashboardScripts = () => {
 useEffect(() => {
  // Function to create and load a script dynamically
  const loadScript = (url) => {
   return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
   });
  };

  // List of script URLs
  const scriptUrls = [
    './vendor/global/global.min.js',
    './vendor/chart.js/Chart.bundle.min.js',
    './vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
    './vendor/apexchart/apexchart.js',
 
    './js/dashboard/dashboard-1.js',
    './vendor/draggable/draggable.js',
    './vendor/swiper/js/swiper-bundle.min.js',
    './js/dashboard/humidity.js',
    './js/dashboard/illuminance.js',
    './js/dashboard/overall.js',
    './js/dashboard/pincode.js',
    './js/dashboard/noti.js',
    
    './vendor/tagify/dist/tagify.js',
 
    './vendor/datatables/js/jquery.dataTables.min.js',
    './vendor/datatables/js/dataTables.buttons.min.js',
    './vendor/datatables/js/buttons.html5.min.js',
    './vendor/datatables/js/jszip.min.js',
    './js/plugins-init/datatables.init.js',
 
    'vendor/bootstrap-datetimepicker/js/moment.js',
    'vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
 
    './vendor/jqvmap/js/jquery.vmap.min.js',
    './vendor/jqvmap/js/jquery.vmap.world.js',
    './vendor/jqvmap/js/jquery.vmap.usa.js',
    './js/custom.js',
    './js/deznav-init.js',
    './js/demo.js',
    './js/styleSwitcher.js'
   ];

  // Remove duplicate script URLs
  const uniqueScriptUrls = [...new Set(scriptUrls)];

  // Load all scripts asynchronously
  const loadScripts = async () => {
   for (const url of uniqueScriptUrls) {
    await loadScript(url);
   }
  };

  loadScripts();
 }, []); // Empty dependency array means this effect runs only once after component mount

 // This component doesn't render anything, so return null
 return null;
};

export default DashboardScripts;
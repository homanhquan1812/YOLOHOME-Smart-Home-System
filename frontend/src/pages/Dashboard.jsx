import { React, useState, useEffect } from 'react';
import Scripts from '../components/DashboardScripts'
import Heads from '../components/DashboardHeads'

const Dashboard = () => {
  const [sensors, setSensors] = useState([]);
  const totalscore = 0;
  const [load, setLoad] = useState(totalscore);
  const [isRunning, setIsRunning] = useState(false);
  const [scoreAdded, setScoreAdded] = useState(false); // New state to track if score has been added

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3000/dashboard');
        const response = await fetch('https://yolohome-smart-home-system-api.onrender.com/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSensors(data.sensors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  // Temperature Bug-Fixes
  useEffect(() => {
    // Update temperature element when sensors change
    setTemperature();
  }, [sensors]);

  const setTemperature = () => {
    const range = document.querySelector("input[type='range']");
    const temperature = document.getElementById("temperature");
    const config = { minTemp: 0, maxTemp: 50 }; // Example config, adjust as needed
    const units = { unit: "°C" }; // Example units, adjust as needed

    if (range && temperature) {
      temperature.style.height = (range.value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
      temperature.dataset.value = range.value + units.unit;
    }
  };

  const handleLedUpdate = async () => {
    try {
      const response = await fetch('https://yolohome-smart-home-system-api.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'updateLed' }) // Send action to update LED
      });
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    if (!isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => {
        setLoad(prevLoad => {
          if (prevLoad === 100) {
            setIsRunning(false);
            return prevLoad;
          }
          return prevLoad + 1;
        });
      }, 100);
  
      return () => clearInterval(interval);
    }
  }, [isRunning]);
  
  useEffect(() => {
    // Check if score has already been added
    if (!scoreAdded) {
      const interval = setInterval(() => {
        sensors.forEach((sensor) => {
          if (
            sensor.sensor_name === "temperatureSensor" &&
            sensor.temperature >= 21 &&
            sensor.temperature <= 28
          ) {
            setLoad((prevLoad) => prevLoad + 33);
            setScoreAdded(true); // Set scoreAdded to true to indicate that score has been added
          } else if (
            sensor.sensor_name === "humiSensor" &&
            sensor.humi >= 40 &&
            sensor.humi <= 80
          ) {
            setLoad((prevLoad) => prevLoad + 33);
            setScoreAdded(true); // Set scoreAdded to true to indicate that score has been added
          } else if (
            sensor.sensor_name === "luxSensor" &&
            sensor.lux >= 60 &&
            sensor.lux <= 100
          ) {
            setLoad((prevLoad) => prevLoad + 34);
            setScoreAdded(true); // Set scoreAdded to true to indicate that score has been added
          }
        });
      }, 100);
      // Adjust the interval time as needed
      return () => clearInterval(interval);
    }
  }, [sensors, scoreAdded]);

  const getOverallScoreColor = () => {
    if (load == 100) {
      return 'green';
    } else if (load < 100 && load > 50) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <div>
        <Heads />
  
        <div>
  {/********************
  Preloader start
    *********************/}
  <div id="preloader">
    <div>
      <img src="images/pre.gif" alt="" />
    </div>
  </div>
  {/********************
  Preloader end
    *********************/}
  {/***********************************
  Main wrapper start
    ************************************/}
  <div id="main-wrapper">
    {/***********************************
      Nav header start
  ************************************/}
    <div className="nav-header">
      <a href="index.html" className="brand-logo">
        <img src="./images/logo/1.png" alt="" width={45} height={45} viewbox="0 0 32 30" />
        <h4 className="brand-title" style={{color: 'white'}}>YOLO</h4>
      </a>
      <div className="nav-control">
        <div className="hamburger">
          <span className="line">
            <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7468 5.58925C11.0722 5.26381 11.0722 4.73617 10.7468 4.41073C10.4213 4.0853 9.89369 4.0853 9.56826 4.41073L4.56826 9.41073C4.25277 9.72622 4.24174 10.2342 4.54322 10.5631L9.12655 15.5631C9.43754 15.9024 9.96468 15.9253 10.3039 15.6143C10.6432 15.3033 10.6661 14.7762 10.3551 14.4369L6.31096 10.0251L10.7468 5.58925Z" fill="#452B90" />
              <path opacity="0.3" d="M16.5801 5.58924C16.9056 5.26381 16.9056 4.73617 16.5801 4.41073C16.2547 4.0853 15.727 4.0853 15.4016 4.41073L10.4016 9.41073C10.0861 9.72622 10.0751 10.2342 10.3766 10.5631L14.9599 15.5631C15.2709 15.9024 15.798 15.9253 16.1373 15.6143C16.4766 15.3033 16.4995 14.7762 16.1885 14.4369L12.1443 10.0251L16.5801 5.58924Z" fill="#452B90" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    {/***********************************
      Nav header end
  ************************************/}
    {/***********************************
      Header start
  ************************************/}
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div className="dashboard_bar">
                Dashboard
              </div>
            </div>
            <div className="header-right d-flex align-items-center">
              <div className="input-group search-area">
                <input type="text" className="form-control" placeholder="Search here..." />
                <span className="input-group-text"><a href="javascript:void(0)">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_1_450)">
                        <path opacity="0.3" d="M14.2929 16.7071C13.9024 16.3166 13.9024 15.6834 14.2929 15.2929C14.6834 14.9024 15.3166 14.9024 15.7071 15.2929L19.7071 19.2929C20.0976 19.6834 20.0976 20.3166 19.7071 20.7071C19.3166 21.0976 18.6834 21.0976 18.2929 20.7071L14.2929 16.7071Z" fill="#452B90" />
                        <path d="M11 16C13.7614 16 16 13.7614 16 11C16 8.23859 13.7614 6.00002 11 6.00002C8.23858 6.00002 6 8.23859 6 11C6 13.7614 8.23858 16 11 16ZM11 18C7.13401 18 4 14.866 4 11C4 7.13402 7.13401 4.00002 11 4.00002C14.866 4.00002 18 7.13402 18 11C18 14.866 14.866 18 11 18Z" fill="#452B90" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_450">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a></span>
              </div>
              <ul className="navbar-nav">
                <li className="nav-item dropdown notification_dropdown">
                  <a className="nav-link bell dz-theme-mode" href="javascript:void(0);">
                    <svg id="icon-light" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <rect x={0} y={0} width={24} height={24} />
                        <path d="M12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 Z" fill="#000000" fillRule="nonzero" />
                        <path d="M19.5,10.5 L21,10.5 C21.8284271,10.5 22.5,11.1715729 22.5,12 C22.5,12.8284271 21.8284271,13.5 21,13.5 L19.5,13.5 C18.6715729,13.5 18,12.8284271 18,12 C18,11.1715729 18.6715729,10.5 19.5,10.5 Z M16.0606602,5.87132034 L17.1213203,4.81066017 C17.7071068,4.22487373 18.6568542,4.22487373 19.2426407,4.81066017 C19.8284271,5.39644661 19.8284271,6.34619408 19.2426407,6.93198052 L18.1819805,7.99264069 C17.5961941,8.57842712 16.6464466,8.57842712 16.0606602,7.99264069 C15.4748737,7.40685425 15.4748737,6.45710678 16.0606602,5.87132034 Z M16.0606602,18.1819805 C15.4748737,17.5961941 15.4748737,16.6464466 16.0606602,16.0606602 C16.6464466,15.4748737 17.5961941,15.4748737 18.1819805,16.0606602 L19.2426407,17.1213203 C19.8284271,17.7071068 19.8284271,18.6568542 19.2426407,19.2426407 C18.6568542,19.8284271 17.7071068,19.8284271 17.1213203,19.2426407 L16.0606602,18.1819805 Z M3,10.5 L4.5,10.5 C5.32842712,10.5 6,11.1715729 6,12 C6,12.8284271 5.32842712,13.5 4.5,13.5 L3,13.5 C2.17157288,13.5 1.5,12.8284271 1.5,12 C1.5,11.1715729 2.17157288,10.5 3,10.5 Z M12,1.5 C12.8284271,1.5 13.5,2.17157288 13.5,3 L13.5,4.5 C13.5,5.32842712 12.8284271,6 12,6 C11.1715729,6 10.5,5.32842712 10.5,4.5 L10.5,3 C10.5,2.17157288 11.1715729,1.5 12,1.5 Z M12,18 C12.8284271,18 13.5,18.6715729 13.5,19.5 L13.5,21 C13.5,21.8284271 12.8284271,22.5 12,22.5 C11.1715729,22.5 10.5,21.8284271 10.5,21 L10.5,19.5 C10.5,18.6715729 11.1715729,18 12,18 Z M4.81066017,4.81066017 C5.39644661,4.22487373 6.34619408,4.22487373 6.93198052,4.81066017 L7.99264069,5.87132034 C8.57842712,6.45710678 8.57842712,7.40685425 7.99264069,7.99264069 C7.40685425,8.57842712 6.45710678,8.57842712 5.87132034,7.99264069 L4.81066017,6.93198052 C4.22487373,6.34619408 4.22487373,5.39644661 4.81066017,4.81066017 Z M4.81066017,19.2426407 C4.22487373,18.6568542 4.22487373,17.7071068 4.81066017,17.1213203 L5.87132034,16.0606602 C6.45710678,15.4748737 7.40685425,15.4748737 7.99264069,16.0606602 C8.57842712,16.6464466 8.57842712,17.5961941 7.99264069,18.1819805 L6.93198052,19.2426407 C6.34619408,19.8284271 5.39644661,19.8284271 4.81066017,19.2426407 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                      </g>
                    </svg>
                    <svg id="icon-dark" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <rect x={0} y={0} width={24} height={24} />
                        <path d="M12.0700837,4.0003006 C11.3895108,5.17692613 11,6.54297551 11,8 C11,12.3948932 14.5439081,15.9620623 18.9299163,15.9996994 C17.5467214,18.3910707 14.9612535,20 12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C12.0233848,4 12.0467462,4.00010034 12.0700837,4.0003006 Z" fill="#000000" />
                      </g>
                    </svg>
                  </a>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  <a className="nav-link" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                    <svg width={25} height={24} viewBox="0 0 25 24" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.5 12H19C19.8284 12 20.5 12.6716 20.5 13.5C20.5 14.3284 19.8284 15 19 15H6C5.17157 15 4.5 14.3284 4.5 13.5C4.5 12.6716 5.17157 12 6 12H7.5L8.05827 6.97553C8.30975 4.71226 10.2228 3 12.5 3C14.7772 3 16.6903 4.71226 16.9417 6.97553L17.5 12Z" fill="#222B40" />
                      <path opacity="0.3" d="M14.5 18C14.5 16.8954 13.6046 16 12.5 16C11.3954 16 10.5 16.8954 10.5 18C10.5 19.1046 11.3954 20 12.5 20C13.6046 20 14.5 19.1046 14.5 18Z" fill="#222B40" />
                    </svg>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <div id="DZ_W_Notification1" className="widget-media dz-scroll p-2" style={{height: '380px'}}>
                      <ul className="timeline">
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img alt="image" width={50} src="images/avatar/1.jpg" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Dr sultads Send you Photo</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-info">
                              KG
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Resport created successfully</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-success">
                              <i className="fa fa-home" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Reminder : Treatment Time!</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img alt="image" width={50} src="images/avatar/1.jpg" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Dr sultads Send you Photo</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-danger">
                              KG
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Resport created successfully</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-primary">
                              <i className="fa fa-home" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Reminder : Treatment Time!</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img alt="image" width={50} src="images/avatar/1.jpg" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Dr sultads Send you Photo</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-info">
                              KG
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Resport created successfully</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-success">
                              <i className="fa fa-home" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Reminder : Treatment Time!</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2">
                              <img alt="image" width={50} src="images/avatar/1.jpg" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Dr sultads Send you Photo</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-danger">
                              KG
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Resport created successfully</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media me-2 media-primary">
                              <i className="fa fa-home" />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">Reminder : Treatment Time!</h6>
                              <small className="d-block">29 July 2020 - 02:26 PM</small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <a className="all-notification" href="javascript:void(0);">See all notifications <i className="ti-arrow-end" /></a>
                  </div>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  {/* <a class="nav-link bell-link" href="javascript:void(0);">
									<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
										<g clip-path="url(#clip0_1_463)">
										<path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M6.5 2H18.5C19.0523 2 19.5 2.44772 19.5 3V13C19.5 13.5523 19.0523 14 18.5 14H6.5C5.94772 14 5.5 13.5523 5.5 13V3C5.5 2.44772 5.94772 2 6.5 2ZM14.3 4C13.6562 4 12.9033 4.72985 12.5 5.2C12.0967 4.72985 11.3438 4 10.7 4C9.5604 4 8.9 4.88887 8.9 6.02016C8.9 7.27339 10.1 8.6 12.5 10C14.9 8.6 16.1 7.3 16.1 6.1C16.1 4.96871 15.4396 4 14.3 4Z" fill="#222B40"/>
										<path fill-rule="evenodd" clip-rule="evenodd" d="M4.29275 6.57254L12.5 12.5L20.7073 6.57254C20.9311 6.41086 21.2437 6.46127 21.4053 6.68514C21.4669 6.77034 21.5 6.87278 21.5 6.97788V17C21.5 18.1046 20.6046 19 19.5 19H5.5C4.39543 19 3.5 18.1046 3.5 17V6.97788C3.5 6.70174 3.72386 6.47788 4 6.47788C4.10511 6.47788 4.20754 6.511 4.29275 6.57254Z" fill="#222B40"/>
										</g>
										<defs>
										<clipPath id="clip0_1_463">
										<rect width="24" height="24" fill="white" transform="translate(0.5)"/>
										</clipPath>
										</defs>
									</svg>
									</a> */}
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  {/* <a class="nav-link " href="javascript:void(0);" data-bs-toggle="dropdown">
										<svg width="25" height="24" viewBox="0 0 25 24" fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd"
												d="M3.5 16.87V9.257H21.5V16.931C21.5 20.07 19.5241 22 16.3628 22H8.62733C5.49561 22 3.5 20.03 3.5 16.87ZM8.45938 14.41C8.00494 14.431 7.62953 14.07 7.60977 13.611C7.60977 13.151 7.96542 12.771 8.41987 12.75C8.86443 12.75 9.22997 13.101 9.23985 13.55C9.2596 14.011 8.90395 14.391 8.45938 14.41ZM12.5198 14.41C12.0653 14.431 11.6899 14.07 11.6701 13.611C11.6701 13.151 12.0258 12.771 12.4802 12.75C12.9248 12.75 13.2903 13.101 13.3002 13.55C13.32 14.011 12.9643 14.391 12.5198 14.41ZM16.5505 18.09C16.096 18.08 15.7305 17.7 15.7305 17.24C15.7206 16.78 16.0862 16.401 16.5406 16.391H16.5505C17.0148 16.391 17.3902 16.771 17.3902 17.24C17.3902 17.71 17.0148 18.09 16.5505 18.09ZM11.6701 17.24C11.6899 17.7 12.0653 18.061 12.5198 18.04C12.9643 18.021 13.32 17.641 13.3002 17.181C13.2903 16.731 12.9248 16.38 12.4802 16.38C12.0258 16.401 11.6701 16.78 11.6701 17.24ZM7.59989 17.24C7.61965 17.7 7.99506 18.061 8.44951 18.04C8.89407 18.021 9.24973 17.641 9.22997 17.181C9.22009 16.731 8.85456 16.38 8.40999 16.38C7.95554 16.401 7.59989 16.78 7.59989 17.24ZM15.7404 13.601C15.7404 13.141 16.096 12.771 16.5505 12.761C16.9951 12.761 17.3507 13.12 17.3705 13.561C17.3804 14.021 17.0247 14.401 16.5801 14.41C16.1257 14.42 15.7503 14.07 15.7404 13.611V13.601Z"
												fill="#222B40" />
											<path opacity="0.4"
												d="M3.50336 9.2569C3.5162 8.6699 3.5656 7.5049 3.65846 7.1299C4.13267 5.0209 5.74298 3.6809 8.04485 3.4899H16.9559C19.238 3.6909 20.8681 5.0399 21.3423 7.1299C21.4342 7.4949 21.4836 8.6689 21.4964 9.2569H3.50336Z"
												fill="#222B40" />
											<path
												d="M8.80489 6.59C9.23958 6.59 9.56559 6.261 9.56559 5.82V2.771C9.56559 2.33 9.23958 2 8.80489 2C8.3702 2 8.04419 2.33 8.04419 2.771V5.82C8.04419 6.261 8.3702 6.59 8.80489 6.59Z"
												fill="#222B40" />
											<path
												d="M16.195 6.59C16.6198 6.59 16.9557 6.261 16.9557 5.82V2.771C16.9557 2.33 16.6198 2 16.195 2C15.7603 2 15.4343 2.33 15.4343 2.771V5.82C15.4343 6.261 15.7603 6.59 16.195 6.59Z"
												fill="#222B40" />
										</svg>
									</a>
									<div class="dropdown-menu dropdown-menu-end">
										<div id="DZ_W_TimeLine02"
											class="widget-timeline dz-scroll style-1 p-3 height370">
											<ul class="timeline">
												<li>
													<div class="timeline-badge primary"></div>
													<a class="timeline-panel text-muted" href="javascript:void(0);">
														<span>10 minutes ago</span>
														<h6 class="mb-0">Youtube, a video-sharing website, goes live
															<strong class="text-primary">$500</strong>.
														</h6>
													</a>
												</li>
												<li>
													<div class="timeline-badge info">
													</div>
													<a class="timeline-panel text-muted" href="javascript:void(0);">
														<span>20 minutes ago</span>
														<h6 class="mb-0">New order placed <strong
																class="text-info">#XF-2356.</strong></h6>
														<p class="mb-0">Quisque a consequat ante Sit amet magna at
															volutapt...</p>
													</a>
												</li>
												<li>
													<div class="timeline-badge danger">
													</div>
													<a class="timeline-panel text-muted" href="javascript:void(0);">
														<span>30 minutes ago</span>
														<h6 class="mb-0">john just buy your product <strong
																class="text-warning">Sell $250</strong></h6>
													</a>
												</li>
												<li>
													<div class="timeline-badge success">
													</div>
													<a class="timeline-panel text-muted" href="javascript:void(0);">
														<span>15 minutes ago</span>
														<h6 class="mb-0">StumbleUpon is acquired by eBay. </h6>
													</a>
												</li>
												<li>
													<div class="timeline-badge warning">
													</div>
													<a class="timeline-panel text-muted" href="javascript:void(0);">
														<span>20 minutes ago</span>
														<h6 class="mb-0">Mashable, a news website and blog, goes live.
														</h6>
													</a>
												</li>
												<li>
													<div class="timeline-badge dark">
													</div>
													<a class="timeline-panel text-muted" href="javascript:void(0);">
														<span>20 minutes ago</span>
														<h6 class="mb-0">Mashable, a news website and blog, goes live.
														</h6>
													</a>
												</li>
											</ul>
										</div>
									</div> */}
                </li>
                <li className="nav-item ps-3">
                  <div className="dropdown header-profile2">
                    <a className="nav-link" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="header-info2 d-flex align-items-center">
                        <div className="header-media">
                          <img src="images/user.jpg" alt="" />
                        </div>
                      </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end" style={{}}>
                      <div className="card border-0 mb-0">
                        <div className="card-header py-2">
                          <div className="products">
                            <img src="images/user.jpg" className="avatar avatar-md" alt="" />
                            <div>
                              <h6>Panda Tran</h6>
                              <span>Owner</span>
                            </div>
                          </div>
                        </div>
                        <div className="card-body px-0 py-2">
                          <a href="app-profile-2.html" className="dropdown-item ai-icon ">
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M11.9848 15.3462C8.11714 15.3462 4.81429 15.931 4.81429 18.2729C4.81429 20.6148 8.09619 21.2205 11.9848 21.2205C15.8524 21.2205 19.1543 20.6348 19.1543 18.2938C19.1543 15.9529 15.8733 15.3462 11.9848 15.3462Z" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M11.9848 12.0059C14.5229 12.0059 16.58 9.94779 16.58 7.40969C16.58 4.8716 14.5229 2.81445 11.9848 2.81445C9.44667 2.81445 7.38857 4.8716 7.38857 7.40969C7.38 9.93922 9.42381 11.9973 11.9524 12.0059H11.9848Z" stroke="var(--primary)" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="ms-2">Profile </span>
                          </a>
                          {/* <a href="javascript:void(0);" class="dropdown-item ai-icon ">
														<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
														<path d="M17.9026 8.85114L13.4593 12.4642C12.6198 13.1302 11.4387 13.1302 10.5992 12.4642L6.11844 8.85114" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
														<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
														</svg>

														<span class="ms-2">Message </span>
													</a> */}
                          {/* <a href="email-inbox.html" class="dropdown-item ai-icon ">
														<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
															<path d="M14.3888 20.8572C13.0247 22.372 10.8967 22.3899 9.51947 20.8572" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
															</svg>

														<span class="ms-2">Notification </span>
													</a> */}
                        </div>
                        <div className="card-footer px-0 py-2">
                          <a href="javascript:void(0);" className="dropdown-item ai-icon ">
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M20.8066 7.62355L20.1842 6.54346C19.6576 5.62954 18.4907 5.31426 17.5755 5.83866V5.83866C17.1399 6.09528 16.6201 6.16809 16.1307 6.04103C15.6413 5.91396 15.2226 5.59746 14.9668 5.16131C14.8023 4.88409 14.7139 4.56833 14.7105 4.24598V4.24598C14.7254 3.72916 14.5304 3.22834 14.17 2.85761C13.8096 2.48688 13.3145 2.2778 12.7975 2.27802H11.5435C11.0369 2.27801 10.5513 2.47985 10.194 2.83888C9.83666 3.19791 9.63714 3.68453 9.63958 4.19106V4.19106C9.62457 5.23686 8.77245 6.07675 7.72654 6.07664C7.40418 6.07329 7.08843 5.98488 6.8112 5.82035V5.82035C5.89603 5.29595 4.72908 5.61123 4.20251 6.52516L3.53432 7.62355C3.00838 8.53633 3.31937 9.70255 4.22997 10.2322V10.2322C4.82187 10.574 5.1865 11.2055 5.1865 11.889C5.1865 12.5725 4.82187 13.204 4.22997 13.5457V13.5457C3.32053 14.0719 3.0092 15.2353 3.53432 16.1453V16.1453L4.16589 17.2345C4.41262 17.6797 4.82657 18.0082 5.31616 18.1474C5.80575 18.2865 6.33061 18.2248 6.77459 17.976V17.976C7.21105 17.7213 7.73116 17.6515 8.21931 17.7821C8.70746 17.9128 9.12321 18.233 9.37413 18.6716C9.53867 18.9488 9.62708 19.2646 9.63043 19.5869V19.5869C9.63043 20.6435 10.4869 21.5 11.5435 21.5H12.7975C13.8505 21.5 14.7055 20.6491 14.7105 19.5961V19.5961C14.7081 19.088 14.9088 18.6 15.2681 18.2407C15.6274 17.8814 16.1154 17.6806 16.6236 17.6831C16.9451 17.6917 17.2596 17.7797 17.5389 17.9393V17.9393C18.4517 18.4653 19.6179 18.1543 20.1476 17.2437V17.2437L20.8066 16.1453C21.0617 15.7074 21.1317 15.1859 21.0012 14.6963C20.8706 14.2067 20.5502 13.7893 20.111 13.5366V13.5366C19.6717 13.2839 19.3514 12.8665 19.2208 12.3769C19.0902 11.8872 19.1602 11.3658 19.4153 10.9279C19.5812 10.6383 19.8213 10.3981 20.111 10.2322V10.2322C21.0161 9.70283 21.3264 8.54343 20.8066 7.63271V7.63271V7.62355Z" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12.175" cy="11.889" r="2.63616" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="ms-2">Settings </span>
                          </a>
                          <a href="page-login.html" className="dropdown-item ai-icon">
                            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                              <polyline points="16 17 21 12 16 7" />
                              <line x1={21} y1={12} x2={9} y2={12} />
                            </svg>
                            <span className="ms-2">Logout </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
    {/***********************************
      Header end ti-comment-alt
  ************************************/}
    {/***********************************
      Sidebar start
  ************************************/}
    <div className="deznav">
      <div className="deznav-scroll">
        <ul className="metismenu" id="menu">
          <li className="menu-title">YOUR HOME</li>
          <li><a href="javascript:void(0);" aria-expanded="false">
              <div className="menu-icon">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.756 22 16.0829 22H18.0438C18.9596 22.0024 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z" fill="#90959F" />
                </svg>
              </div>
            </a><a className="nav-text" href="./index.html">Dashboard</a>
            {/* <ul aria-expanded="false">
							<li><a href="index.html">Temperature</a></li>
							<li><a href="#">Humidity</a></li>
							<li><a href="#">Light</a></li>
						</ul> */}
          </li>
          <li className="menu-title">OUR FEATURES</li>
          <li>
            <a className="has-arrow " href="javascript:void(0);" aria-expanded="false">
              <div className="menu-icon">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.5">
                    <path d="M9.34933 14.8577C5.38553 14.8577 2 15.47 2 17.9174C2 20.3666 5.364 21 9.34933 21C13.3131 21 16.6987 20.3877 16.6987 17.9404C16.6987 15.4911 13.3347 14.8577 9.34933 14.8577Z" fill="white" />
                    <path opacity="0.4" d="M9.34935 12.5248C12.049 12.5248 14.2124 10.4062 14.2124 7.76241C14.2124 5.11865 12.049 3 9.34935 3C6.65072 3 4.48633 5.11865 4.48633 7.76241C4.48633 10.4062 6.65072 12.5248 9.34935 12.5248Z" fill="white" />
                    <path opacity="0.4" d="M16.1734 7.84876C16.1734 9.19508 15.7605 10.4513 15.0364 11.4948C14.9611 11.6022 15.0276 11.7468 15.1587 11.7698C15.3407 11.7996 15.5276 11.8178 15.7184 11.8216C17.6167 11.8705 19.3202 10.6736 19.7908 8.87119C20.4885 6.19677 18.4415 3.79544 15.8339 3.79544C15.5511 3.79544 15.2801 3.82419 15.0159 3.87689C14.9797 3.88456 14.9405 3.9018 14.921 3.93247C14.8955 3.97176 14.9141 4.02254 14.9395 4.05608C15.7233 5.13217 16.1734 6.44208 16.1734 7.84876Z" fill="white" />
                    <path d="M21.7791 15.1693C21.4318 14.444 20.5932 13.9466 19.3173 13.7023C18.7155 13.5586 17.0854 13.3545 15.5697 13.3832C15.5472 13.3861 15.5345 13.4014 15.5325 13.411C15.5296 13.4263 15.5365 13.4493 15.5658 13.4656C16.2664 13.8048 18.9738 15.2805 18.6333 18.3928C18.6187 18.5289 18.7292 18.6439 18.8672 18.6247C19.5335 18.5318 21.2478 18.1705 21.7791 17.0475C22.0737 16.4534 22.0737 15.7634 21.7791 15.1693Z" fill="white" />
                  </g>
                </svg>
              </div>
            </a><a className="nav-text" href="smartdoor">Smartdoor
            </a>
            {/* <ul aria-expanded="false">
							<li><a href="./chat.html">Alert<span class="badge badge-danger badge-xs ms-1">NEW</span></a>
							</li>
							<li><a href="./app-calender.html">Manual</a></li>
							<li><a class="has-arrow" href="javascript:void(0);" aria-expanded="false">Password</a>
							</li>
						</ul> */}
          </li>
        </ul>
      </div>
    </div>
    {/***********************************
      Sidebar end
  ************************************/}
    {/***********************************
      Content body start
  ************************************/}
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6  col-lg-6 overall">
            <div className="card overall_body">
              <div id="counter">
                <h1 id="loader">{load}%</h1>
              </div>
              <p style={{fontSize: '20px'}}>Overall Score: <span style={{color: getOverallScoreColor()}}>{load == 100 ? 'Good' : load >= 50 ? 'Normal' : 'Bad'}</span>.</p>
              <p style={{marginBottom: '-10px', fontSize: '20px', color: 'orange'}}>Ideal levels for these 3 parameters:</p>
                <ul>
                  <li style={{fontSize: '15px'}}>Temperature: <span style={{color: 'red'}}>21 - 28°C</span></li>
                  <li style={{fontSize: '15px'}}>Humidity: <span style={{color: 'red'}}>40 - 80%</span></li>
                  <li style={{fontSize: '15px'}}>Brightness: <span style={{color: 'red'}}>60 - 100%</span></li>
                </ul>
            </div>
          </div>
          <div className="col-xl-6  col-lg-6">
            <div className="row">
              <div className="col-xl-12">
                <div className="card my-calendar">
                  <div className="card-body schedules-cal p-2">
                    <input type="text" className="form-control d-none" id="datetimepicker1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-xxl-12">
            <div className="row">
              <div className="col-xl-12">
                <div className="row">
                  <div className="col-xl-3 col-sm-6 thermometer">
                  {sensors.map((sensor, index) => (
                      sensor.sensor_name === "temperatureSensor" && (
                        <div className="card" key={index}>
                          <div className="card-body">
                            <div id="wrapper">
                              <div id="termometer">
                                <div id="temperature" style={{ height: '0' }} data-value={`${sensor.temperature}°C`}></div>
                                <div id="graduations"></div>
                              </div>
                              <div id="playground">
                                <div id="range" style={{ display: 'none' }}>
                                  <input id="minTemp" type="text" value="0" />
                                  <input type="range" min="0" max="50" value={sensor.temperature} />
                                  <input id="maxTemp" type="text" value="50" />
                                </div>
                                <p id="unit">Celcius C°</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="col-xl-3 col-sm-6 humidity">
                  {sensors.map((sensor, index) => (
                      sensor.sensor_name === "humiSensor" && (
                        <div className="card" key={index}>
                          <div className="card-body">
                            <div className="container-humidity">
                              <div className="circle-humidity"></div>
                              <div className="center-humidity"></div>
                              <div className="humidity-text">
                                <p className="component">Humidity: {sensor.humi}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="col-xl-3 col-sm-6 humidity">
                  {sensors.map((sensor, index) => (
                      sensor.sensor_name === "luxSensor" && (
                        <div className="card" key={index}>
                          <div className="card-body">
                            <div className="container-humidity">
                              <div className="circle-humidity" data-value={sensor.lux}></div>
                              <div className="center-humidity"></div>
                              <div className="humidity-text">
                                <p className="component">Lux: {sensor.lux}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                  
                  <div className="col-xl-3 col-sm-6 illuminance">
                  {sensors.map((sensor, index) => (
                      sensor.sensor_name === "lightSensor" && (
                        <div className="card" key={index}>
                          <div className="card-body">
                          <h2>LED</h2>
                            <input 
                              type="checkbox" 
                              id="luxValue"
                              onClick={handleLedUpdate}
                              checked={sensors.find(sensor => sensor.sensor_name === "lightSensor")?.light}
                              />
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/***********************************
      Content body end
  ************************************/}
    {/***********************************
      Footer start
  ************************************/}
    <div className="footer">
      <div className="copyright">
        <p>Copyright © Developed by Panda 2024</p>
      </div>
    </div>
    {/***********************************
      Footer end
  ************************************/}
    {/***********************************
     Support ticket button start
  ************************************/}
    {/***********************************
     Support ticket button end
  ************************************/}
  </div>
</div>


        <Scripts />
    </div>
  )
}

export default Dashboard
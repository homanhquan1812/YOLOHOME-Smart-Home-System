# YOLOHOME - Smart Home System
<div align="center">
  <img src="https://github.com/homanhquan1812/YOLOHOME-Smart-Home-System/assets/130955957/6d5f33c1-7f16-4aa6-a70e-da2a945d4ab1" alt="YOLOHOME Logo" width="600" style="">
</div>

YOLOHOME: Elevate your home with cutting-edge smart technology for convenience, comfort, and security. Control everything remotely via an intuitive app or voice commands. Customize settings and automate tasks for an effortless living experience. Welcome to the future of home living.

# Website address:
> https://yolohome-smart-home-system.onrender.com/

# Technologies used to build this website:

<div align="center">
  <img src="https://www.boardinfinity.com/blog/content/images/2023/01/Mern.png" alt="MERN Logo" width="600" style="">
</div>

1. Frontend: <b>ReactJS</b>.
2. Backend: <b>NodeJS and ExpressJS</b>
3. NoSQL Database: <b>MongoDB</b>.
4. Cloud Database: <b>MongoDB Atlas</b>.
5. IoT Database: <b>Adafruit</b>.
6. Hosting: <b>Render</b> (free).
7. IoT Devices:
<div align="center">
  <img src="https://github.com/homanhquan1812/YOLOHOME-Smart-Home-System/assets/130955957/de418a50-d17d-4afd-baa4-0a63c6293464" alt="IoT Devices" width="600" style="">
</div>

> Basically, hosting a website that people can access can't depend on an offline database. That's why our team uses MongoDB Atlas to let it connect to Render, so that the website can work perfectly.

# Known bugs
1. Page loading may take forever. If you face that issue, just reload the website.
2. <b>Overall Board</b> can't update new data without reloading the website and it doesn't show percentage in Dark mode.
3. Some features (<b>Change info, Settings, etc</b>) haven't been implemented.

# Features that need to be added
1. Middleware.

# Development Status:
> Finished.

# How to use
1. Download and install <b>Node</b> and <b>MongoDB</b>.
2. Extract <b>JSON Data.rar</b> and insert all JSON files into your MongoDB database like this:
   
   ![image](https://github.com/homanhquan1812/YOLOHOME-Smart-Home-System/assets/130955957/f3d0408a-f8b1-4fc2-bbb1-cfa813ea45c9)

You can replace current MongoDB connection string with yours. Open <b>backend/config/db.js</b> to do that.

3. Open Terminal for <b>backend</b> folder first, run:
```
npm start
```
then open Terminal for <b>frontend</b> folder, run:
```
npm run dev
```

4. Use this account to log in to the website, or create one yourself:
   - homanhquan - homanhquan1812
5. Watch numbers from those Adafruit feeds:
* Temperature:
```
https://io.adafruit.com/TyTran/feeds/microbit-temperature
```
* Humidity:
```
https://io.adafruit.com/TyTran/feeds/microbit-humi
```
* Light:
```
https://io.adafruit.com/TyTran/feeds/microbit-lux
```
* LED:
```
https://io.adafruit.com/TyTran/feeds/microbit-rgb
```
* Password:
```
https://io.adafruit.com/TyTran/feeds/microbit-pwd
```
* Dashboard:
```
https://io.adafruit.com/TyTran/dashboards/microbit-dashboard
```
If you notice that some features disappear or work abnormally, contact [Trần Đại Tỷ](https://www.facebook.com/V3CTORTR4Z) to get a new ID to connect to Adafruit Database.
Open <b>backend/src/app/controllers/DashboardController.js</b>, paste the ID into <b>clientId</b>.

You can contact him to have access to those feeds for adding new data in each feed.
8. To terminate batch job, use <b>Ctrl + C</b>.

# Screenshots

# Credits
1. <b>Frontend Developers:</b>
- Trần Xuân Trúc (1953061)
- Lê Đình Gia	Huy (2011260)
3. <b>Backend Developer:</b> Hồ Mạnh Quân (1952941) => <b>Leader</b>
4. <b>Hardware Developer</b>: Trần Đại Tỷ (1953090)
5. <b>MISC Developer:</b> Nguyễn Anh Tuấn (1953070)

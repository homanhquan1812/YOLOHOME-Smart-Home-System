let notifications = [
	{
		user: "Abdul",
		userImg:
			"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Blue02&graphicType=Deer&eyeType=Squint&eyebrowType=RaisedExcited&mouthType=Twinkle&skinColor=Brown",
		type: "postLiked",
		color: "#e8e6e1"
	},
	{
		user: "Hannes",
		userImg:
			"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray01&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Tanned",
		type: "invite",
		color: "#b6e0fe"
	},
	{
		user: "Sophie",
		userImg:
			"https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Round&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=PastelGreen&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Default&skinColor=Light",
		type: "comment",
		color: "#f8cdcd"
	},
	{
		user: "Mari",
		userImg:
			"https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBigHair&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=Light",
		type: "postLiked",
		color: "#fbefc7"
	},
	{
		user: "Devin",
		userImg:
			"https://avataaars.io/?avatarStyle=Transparent&topType=NoHair&accessoriesType=Sunglasses&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Close&eyebrowType=FlatNatural&mouthType=Smile&skinColor=DarkBrown",
		type: "live",
		color: "#c6f7e2"
	}
];

let notificationsVisible = false;

function toggleNotifications() {
	notificationsVisible = !notificationsVisible;
	updateNotificationDisplay();
	animateNotifications(notificationsVisible);
	notificationsVisible ? startNotifications() : endNotifications();
}

function updateNotificationDisplay() {
	const heading = document.getElementById("heading");
	const bell = document.getElementById("bell");
	heading.classList.toggle("opacity_0", !notificationsVisible);
	bell.style.width = notificationsVisible ? "320px" : "48px";
}

function startNotifications() {
	const allNotificationsElement = document.getElementById("allNotifications");
	allNotificationsElement.classList.add("visible");
	allNotificationsElement.classList.remove("d-none");
	startAnimation();
}

function endNotifications() {
	const allNotificationsElement = document.getElementById("allNotifications");
	setTimeout(() => {
		allNotificationsElement.classList.remove("visible");
		allNotificationsElement.classList.add("d-none");
	}, notifications.length * 100);
	stopAnimation();
}

function renderNotifications() {
	if (notifications.length === 0) {
		clearNotificationsDisplay();
		displayNoNotificationsMessage();
	} else {
		displayNotifications();
	}
}

function clearNotificationsDisplay() {
	const allNotificationsElement = document.getElementById("allNotifications");
	allNotificationsElement.innerHTML = "";
	document.getElementById("count").style.display = "none";
}

function displayNoNotificationsMessage() {
	const allNotificationsElement = document.getElementById("allNotifications");
	allNotificationsElement.innerHTML = `<div id="noNotifications">no new notifications</div>`;
}

function displayNotifications() {
	const allNotificationsElement = document.getElementById("allNotifications");
	allNotificationsElement.innerHTML = "";
	notifications.forEach((notification, index) => {
		allNotificationsElement.innerHTML += createNotificationHTML(
			notification,
			index
		);
	});
	allNotificationsElement.innerHTML += createDeleteAllHTML();
}

function createNotificationHTML(notification, index) {
	const messageType = getMessageBasedOnType(
		notification.type,
		notification.user
	);
	return `
        <div id="singleNotification${index}" class="singleNotification">
            <img src="${notification.userImg}" alt="${notification.user}'s profile picture" style="background-color: ${notification.color};">
            <span>${messageType}</span>
            <span class="material-symbols-outlined" onclick="deleteNotification(${index})">done</span>
        </div>
    `;
}

function createDeleteAllHTML() {
	return `
        <div id="deleteAll" onclick="deleteAll()">
            <span>delete all notifications</span>
            <span class="material-symbols-outlined">delete</span>
        </div>
    `;
}

function animateNotifications(show) {
	const totalNotifications = notifications.length;
	const animationName = show ? "slideIn" : "slideOut";
	if (totalNotifications === 0) {
		const noNotifications = document.getElementById(`noNotifications`);
		noNotifications.style.animation = `${animationName} 0.5s ease forwards 100ms`;
	} else {
	}
	for (let index = 0; index < totalNotifications; index++) {
		const notificationElement = document.getElementById(
			`singleNotification${index}`
		);
		if (notificationElement) {
			const delay = show
				? (index + 1) * 100
				: (totalNotifications - index - 1) * 100;
			notificationElement.style.animation = `${animationName} 0.5s ease forwards ${delay}ms`;
			const deleteDelay = show ? totalNotifications * 100 : 100;
			document.getElementById(
				"deleteAll"
			).style.animation = `${animationName} 0.5s ease forwards ${deleteDelay}ms`;
		}
	}
}

function deleteNotification(index) {
	notifications.splice(index, 1);
	renderNotifications();
	updateNotificationCount();
	animateNotifications("slideIn");
}

function deleteAll() {
	notifications = [];
	renderNotifications();
	updateNotificationCount();
	animateNotifications("slideIn");
}

function getMessageBasedOnType(type, user) {
	let message;
	if (type === "postLiked") {
		message = `${user} Oh Fuck someone in your house`;
	} else if (type === "comment") {
		message = `${user} warning`;
	} else if (type === "imageLiked") {
		message = `${user} liked your image`;
	} else if (type === "commentLiked") {
		message = `${user} liked your comment`;
	} else if (type === "live") {
		message = `${user} is live now`;
	} else if (type === "invite") {
		message = `${user} has invited you`;
	} else if (type === "acceptedInvite") {
		message = `${user} accepted your invite`;
	} else {
		message = `${user} did something`;
	}
	return message;
}

function updateNotificationCount() {
	const notificationCountElement = document.getElementById("count");
	notificationCountElement.textContent = notifications.length;
}

function generateRandomAnimation() {
	const xStart = 280;
	const yStart = 16;
	const xEnd = Math.random() * (window.innerWidth - xStart);
	const yEnd = Math.random() * (window.innerHeight - yStart);
	const rotationStart = Math.random() * 360;
	const rotationEnd = Math.random() * 360;
	const animationName = `randomMoveRotate${Math.floor(Math.random() * 100)}`;
	const styleSheet = document.styleSheets[0];
	const keyframes = `
        @keyframes ${animationName} {
            from {
                transform: translate(${xStart}px, ${yStart}px) rotate(${rotationStart}deg);
            }
            to {
                transform: translate(${xEnd}px, ${yEnd}px) rotate(${rotationEnd}deg);
            }
        }`;
	styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
	return animationName;
}

function startAnimation() {
	const bellIcons = document.querySelectorAll(".bell-icon");
	bellIcons.forEach((icon) => {
		const animationName = generateRandomAnimation();
		icon.style.animation = `${animationName} 60s linear infinite alternate`;
		icon.style.display = "inline-block"; // Or 'block', depending on your layout
	});
	setTimeout(() => {
		bellIcons.forEach((icon) => {
			icon.style.animation += `, fadeIn 1s ease forwards`;
		});
	}, 420);
}

function stopAnimation() {
	document.querySelectorAll(".bell-icon").forEach((icon) => {
		icon.style.animation = "";
		icon.style.opacity = "0";
	});
}

renderNotifications();
updateNotificationCount();

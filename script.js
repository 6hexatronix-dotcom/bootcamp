document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const screens = document.querySelectorAll(".screen");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const viewMediaBtn = document.getElementById("view-media-btn");
  const backToStartBtn = document.getElementById("back-to-start");
  const options = document.querySelectorAll(".option");
  const lastAccessDate = document.getElementById("last-access-date");
  const wellnessScore = document.getElementById("wellness-score");
  const levelDisplay = document.getElementById("level-display");
  const levelDescription = document.getElementById("level-description");
  const mediaGrid = document.getElementById("media-grid");
  const mediaPlayer = document.getElementById("media-player");

  // Application state
  let currentScreen = 0;
  let depressionLevel = 5;
  let lastAccess = localStorage.getItem("lastAccess");

  //   Set last access date
  if (lastAccess) {
    lastAccessDate.textContent = `Last access: ${new Date(
      parseInt(lastAccess)
    ).toLocaleDateString()}`;
  }

  //   Check if accessed this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  if (lastAccess && parseInt(lastAccess) > oneWeekAgo.getTime()) {
    startBtn.disabled = true;
    startBtn.textContent =
      "Available in " +
      Math.ceil(
        (parseInt(lastAccess) - oneWeekAgo.getTime()) / (1000 * 60 * 60 * 24)
      ) +
      " days";
  }

  // Questions for assessment
  const questions = [
    "How would you describe your overall mood this past week?",
    "How have you been sleeping recently?",
    "How would you describe your appetite and eating habits?",
    "How connected do you feel to your mission and crew?",
    "How hopeful do you feel about the future?",
  ];

  // Media library by depression level (1-10)
  const mediaLibrary = {
    1: [
      {
        type: "video",
        title: "Mission Highlights",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
      {
        type: "music",
        title: "Upbeat Work Music",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "image",
        title: "Crew Celebration",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
    ],
    2: [
      {
        type: "image",
        title: "Earth from Space",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
      {
        type: "music",
        title: "Relaxing Instrumentals",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "video",
        title: "Science Discovery",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
    ],
    3: [
      {
        type: "music",
        title: "Favorite Album",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.pngg",
      },
      {
        type: "image",
        title: "Family Photo",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
      {
        type: "video",
        title: "Message from Home",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
    ],
    4: [
      {
        type: "video",
        title: "Pet Videos",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
      {
        type: "music",
        title: "Comfort Songs",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "image",
        title: "Favorite Place",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
    ],
    5: [
      {
        type: "image",
        title: "Achievement Memorial",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
      {
        type: "music",
        title: "Calming Nature Sounds",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "video",
        title: "Inspiring Talk",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
    ],
    6: [
      {
        type: "music",
        title: "Meditation Guide",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "image",
        title: "Positive Message",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
      {
        type: "video",
        title: "Funny Moments",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
    ],
    7: [
      {
        type: "video",
        title: "Therapist Message",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
      {
        type: "music",
        title: "Guided Relaxation",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "image",
        title: "Hope Image",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
    ],
    8: [
      {
        type: "image",
        title: "Crew Support",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
      {
        type: "music",
        title: "Calming旋律",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "video",
        title: "Emergency Protocol",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
    ],
    9: [
      {
        type: "video",
        title: "Urgent Support Message",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
      {
        type: "music",
        title: "Stress Relief",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "image",
        title: "Crisis Management",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
    ],
    10: [
      {
        type: "video",
        title: "EMERGENCY PROTOCOL",
        src: "materials/video.mp4",
        thumb: "materials/thumbV.jpg",
      },
      {
        type: "music",
        title: "IMMEDIATE SUPPORT",
        src: "materials/music.m4a",
        thumb: "materials/thumbM.png",
      },
      {
        type: "image",
        title: "CRISIS INTERVENTION",
        src: "materials/photo.jpg",
        thumb: "materials/photo.jpg",
      },
    ],
  };

  // Level descriptions
  const levelDescriptions = {
    1: "You're feeling exceptional! Your positive mood contributes greatly to mission success.",
    2: "You're in good spirits overall. Keep up the positive mindset.",
    3: "You're generally stable with normal fluctuations in mood.",
    4: "You're experiencing mild concerns but managing well.",
    5: "You're experiencing some emotional challenges but maintaining overall functionality.",
    6: "You're facing moderate emotional difficulties that may benefit from support.",
    7: "You're experiencing significant emotional challenges. Support is recommended.",
    8: "You're facing substantial emotional difficulties. Active support is important.",
    9: "You're experiencing severe emotional distress. Immediate support is needed.",
    10: "You're in a critical state of emotional distress. Emergency protocols are activated.",
  };

  // Level display texts
  const levelTexts = {
    1: "Excellent",
    2: "Very Good",
    3: "Good",
    4: "Mild Concern",
    5: "Moderate",
    6: "Moderate+",
    7: "Significant",
    8: "Substantial",
    9: "Severe",
    10: "Critical",
  };

  // Level colors
  const levelColors = {
    1: "var(--color-mild)",
    2: "#8BC34A",
    3: "#CDDC39",
    4: "#FFEB3B",
    5: "#FFC107",
    6: "#FF9800",
    7: "#FF5722",
    8: "#f4511e",
    9: "#e64a19",
    10: "var(--color-severe)",
  };

  // Event Listeners
  startBtn.addEventListener("click", function () {
    if (!lastAccess || parseInt(lastAccess) <= oneWeekAgo.getTime()) {
      localStorage.setItem("lastAccess", Date.now().toString());
      showScreen(1);
      loadQuestion(0);
    }
  });

  nextBtn.addEventListener("click", function () {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
    } else {
      calculateResult();
      showScreen(2);
    }
  });

  viewMediaBtn.addEventListener("click", function () {
    showScreen(3);
    loadMediaForLevel(depressionLevel);
  });

  backToStartBtn.addEventListener("click", function () {
    showScreen(0);
  });

  options.forEach((option) => {
    option.addEventListener("click", function () {
      options.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      nextBtn.disabled = false;

      // Update depression level based on selection
      const value = parseInt(this.getAttribute("data-value"));
      depressionLevel = Math.max(
        1,
        Math.min(10, depressionLevel + (value - 5))
      );
    });
  });

  // Functions
  function showScreen(screenIndex) {
    screens.forEach((screen, index) => {
      screen.classList.toggle("active", index === screenIndex);
    });
    currentScreen = screenIndex;
  }

  let currentQuestion = 0;
  function loadQuestion(index) {
    document.getElementById("current-question").textContent = questions[index];
    options.forEach((opt) => opt.classList.remove("selected"));
    nextBtn.disabled = true;
  }

  function calculateResult() {
    // Ensure depression level is within bounds
    depressionLevel = Math.max(1, Math.min(10, depressionLevel));

    wellnessScore.textContent = depressionLevel;
    levelDisplay.textContent = levelTexts[depressionLevel];
    levelDescription.textContent = levelDescriptions[depressionLevel];
    levelDisplay.style.backgroundColor = levelColors[depressionLevel];

    // Highlight the appropriate level indicator
    document.querySelectorAll(".level").forEach((level) => {
      level.classList.toggle(
        "active",
        parseInt(level.getAttribute("data-level")) === depressionLevel
      );
    });
  }

  function loadMediaForLevel(level) {
    // Clear previous media
    mediaGrid.innerHTML = "";

    // Get media for this level
    const mediaItems = mediaLibrary[level] || mediaLibrary[5];

    // Create media cards
    mediaItems.forEach((media) => {
      const card = document.createElement("div");
      card.className = "media-card";
      card.innerHTML = `
                        <img src="${media.thumb}" alt="${
        media.title
      }" class="media-thumbnail">
                        <div class="media-info">
                            <div class="media-title">${media.title}</div>
                            <div class="media-type">${media.type.toUpperCase()}</div>
                        </div>
                    `;

      card.addEventListener("click", () => playMedia(media));
      mediaGrid.appendChild(card);
    });
  }

  function playMedia(media) {
    let playerHTML = "";

    switch (media.type) {
      case "video":
        playerHTML = `
                            <video controls>
                                <source src="${media.src}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="player-controls">
                                <button class="btn2" onclick="this.parentElement.parentElement.querySelector('video').play()">Play</button>
                                <button class="btn2" onclick="this.parentElement.parentElement.querySelector('video').pause()">Pause</button>
                            </div>
                        `;
        break;
      case "music":
        playerHTML = `
                            <audio controls>
                                <source src="${media.src}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                            <div class="player-controls">
                                <button class="btn2" onclick="this.parentElement.parentElement.querySelector('audio').play()">Play</button>
                                <button class="btn2" onclick="this.parentElement.parentElement.querySelector('audio').pause()">Pause</button>
                            </div>
                        `;
        break;
      case "image":
        playerHTML = `<img src="${media.src}" alt="${media.title}">`;
        break;
    }

    mediaPlayer.innerHTML = playerHTML;
  }

  // Initialize
  loadQuestion(0);
});

localStorage.clear();

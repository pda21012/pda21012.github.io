let currentChannel = 0;

const channels = [
  {
    text: "📺 Welcome to Memory TV!\nClick next to start flipping.",
    image: null,
    sound: null,
    choices: []
  },
  {
    text: "🌍 Nature Documentary\nDo you like forests or oceans?",
    image: "https://cdn.aframe.io/examples/ui/forest.jpg",
    sound: "https://cdn.freesound.org/previews/341/341695_5260879-lq.mp3",
    choices: [
      { label: "🌲 Forests", next: 2 },
      { label: "🌊 Oceans", next: 3 }
    ]
  },
  {
    text: "🌲 You chose forests.\nPeaceful trees surround you.",
    image: "https://cdn.aframe.io/examples/ui/trees.jpg",
    sound: "https://cdn.freesound.org/previews/203/203793_2859975-lq.mp3",
    choices: []
  },
  {
    text: "🌊 You chose oceans.\nWaves crash gently on a reef.",
    image: "https://cdn.aframe.io/examples/ui/ocean.jpg",
    sound: "https://cdn.freesound.org/previews/198/198841_2859975-lq.mp3",
    choices: []
  },
  {
    text: "🎮 Interactive game channel.\nChoose your path:",
    image: null,
    sound: null,
    choices: [
      { label: "🕹️ Left Path", next: 5 },
      { label: "🕹️ Right Path", next: 6 }
    ]
  },
  {
    text: "🏞️ You went left and found a hidden village.",
    image: "https://cdn.aframe.io/examples/ui/village.jpg",
    sound: "https://cdn.freesound.org/previews/348/348789_3248244-lq.mp3",
    choices: []
  },
  {
    text: "🧟‍♂️ You went right and encountered zombies!",
    image: "https://cdn.aframe.io/examples/ui/zombies.jpg",
    sound: "https://cdn.freesound.org/previews/231/231203_4019025-lq.mp3",
    choices: []
  }
];

function showChannel(index) {
  const screenText = document.querySelector('#tvScreenText');
  const screenImage = document.querySelector('#tvScreenImage');
  const choicesDiv = document.querySelector('#choices');
  const audio = document.querySelector('#tvSound');
  const staticPlane = document.querySelector('#tvStatic');

  const channel = channels[index];
  if (!channel) return;

  // Show static transition first
  staticPlane.setAttribute('visible', 'true');

  setTimeout(() => {
    staticPlane.setAttribute('visible', 'false');

    // Show image or text
    if (channel.image) {
      screenText.setAttribute('visible', 'false');
      screenImage.setAttribute('visible', 'true');
      screenImage.setAttribute('src', channel.image);
    } else {
      screenImage.setAttribute('visible', 'false');
      screenText.setAttribute('visible', 'true');
      screenText.setAttribute('text', 'value', channel.text);
    }

    // Play sound if present
    if (channel.sound) {
      audio.src = channel.sound;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    // Show choices
    choicesDiv.innerHTML = '';
    if (channel.choices && channel.choices.length) {
      channel.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = choice.label;
        btn.onclick = () => {
          currentChannel = choice.next;
          showChannel(currentChannel);
        };
        choicesDiv.appendChild(btn);
      });
    }
  }, 1000); // 1 second static
}

function changeChannel(delta) {
  currentChannel += delta;
  if (currentChannel < 0) currentChannel = 0;
  if (currentChannel >= channels.length) currentChannel = channels.length - 1;
  showChannel(currentChannel);
}

window.onload = () => {
  showChannel(currentChannel);
  window.changeChannel = changeChannel; // for buttons in HTML
};

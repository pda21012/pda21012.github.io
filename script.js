let currentChannel = 0;
let audio = new Audio();

const channels = [
  {
    text: "📺 Welcome to Memory TV!\\nClick next to start flipping.",
    image: null,
    sound: null,
    choices: []
  },
  {
    text: "🌍 A nature documentary is playing.\\nDo you like forests or oceans?",
    image: 'images/forest.jpg',
    sound: 'sounds/forest.mp3',
    choices: [
      { label: "🌲 Forests", next: 2 },
      { label: "🌊 Oceans", next: 3 }
    ]
  },
  {
    text: "🌲 You chose forests.\\nPeaceful trees surround you.",
    image: 'images/forest.jpg',
    sound: 'sounds/forest.mp3',
    choices: []
  },
  {
    text: "🌊 You chose oceans.\\nWaves crash gently on a reef.",
    image: 'images/ocean.jpg',
    sound: 'sounds/ocean.mp3',
    choices: []
  },
  {
    text: "🏞️ You went left and found a hidden village.",
    image: 'images/village.jpg',
    sound: 'sounds/village.mp3',
    choices: []
  },
  {
    text: "🧟‍♂️ You went right and encountered zombies!",
    image: 'images/zombie.jpg',
    sound: 'sounds/zombie-growl.mp3',
    choices: []
  }
];

function playStaticEffect(callback) {
  const screen = document.querySelector('#tvScreen');
  // Create a flickering white noise effect on the screen (simple simulation)
  let flickerCount = 0;
  const flickerMax = 10;
  const flickerInterval = setInterval(() => {
    const color = flickerCount % 2 === 0 ? '#ccc' : '#222';
    screen.setAttribute('material', 'color', color);
    flickerCount++;
    if (flickerCount > flickerMax) {
      clearInterval(flickerInterval);
      screen.setAttribute('material', 'color', '#000');
      if (callback) callback();
    }
  }, 50);
}

function showChannel(index) {
  const screen = document.querySelector('#tvScreen');
  const choicesDiv = document.querySelector('#choices');
  const channel = channels[index];

  if (!channel) return;

  // Play static transition, then update channel
  playStaticEffect(() => {
    // Update text
    screen.setAttribute('text', 'value', channel.text);

    // Update image on TV screen
    if (channel.image) {
      screen.setAttribute('material', 'src', channel.image);
    } else {
      screen.setAttribute('material', 'src', '');
    }

    // Play channel sound
    if (channel.sound) {
      audio.pause();
      audio = new Audio(channel.sound);
      audio.play();
    } else {
      audio.pause();
    }

    // Clear previous choices
    choicesDiv.innerHTML = '';

    // Add new choice buttons
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
  });
}

function changeChannel(delta) {
  currentChannel += delta;
  if (currentChannel < 0) currentChannel = 0;
  if (currentChannel >= channels.length) currentChannel = channels.length - 1;
  showChannel(currentChannel);
}

function loadChannels() {
  showChannel(currentChannel);
}

window.onload = () => {
  loadChannels();
  window.changeChannel = changeChannel;
};

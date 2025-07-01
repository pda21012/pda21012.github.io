let currentChannel = 0;

const channels = [
  {
    text: "📺 Welcome to Memory TV!\nClick next to start flipping.",
    choices: []
  },
  {
    text: "🌍 A nature documentary is playing.\nDo you like forests or oceans?",
    choices: [
      { label: "🌲 Forests", next: 2 },
      { label: "🌊 Oceans", next: 3 }
    ]
  },
  {
    text: "🌲 You chose forests.\nPeaceful trees surround you.",
    choices: []
  },
  {
    text: "🌊 You chose oceans.\nWaves crash gently on a reef.",
    choices: []
  },
  {
    text: "🎮 This is an interactive game channel.\nChoose your path:",
    choices: [
      { label: "🕹️ Left Path", next: 5 },
      { label: "🕹️ Right Path", next: 6 }
    ]
  },
  {
    text: "🏞️ You went left and found a hidden village.",
    choices: []
  },
  {
    text: "🧟‍♂️ You went right and encountered zombies!",
    choices: []
  }
];
function showChannel(index) {
  const screen = document.querySelector('#tvScreen');
  const choicesDiv = document.querySelector('#choices');
  const channel = channels[index];

  if (!channel) return;

  screen.setAttribute('text', 'value', channel.text);
  choicesDiv.innerHTML = ''; // Clear previous buttons

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
  window.changeChannel = changeChannel; // Needed for onclick buttons in HTML
};

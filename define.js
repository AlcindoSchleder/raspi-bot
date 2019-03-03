exports.bot_defs = {};

// define log type level
exports.bot_defs.log = {
	level: 'verbose' // valid levels are 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
};

// define voice and name of robot of IBM Speech To Text
exports.bot_defs.robot = {
	gender: 'male', // see TJBot.prototype.genders
	name: 'Bill'
};

// define voice ID and audio output format Aws Polly Speech to Text params
exports.bot_defs.aws_params = {
	OutputFormat: 'pcm', 
	VoiceId: 'Ricardo'
};

// define microphone hardware
exports.bot_defs.listen = {
	microphoneDeviceId: "plughw:1,0", // plugged-in USB card 1, device 0; see arecord -l for a list of recording devices
	inactivityTimeout: 6, // -1 to never timeout or break the connection. Set this to a value in seconds e.g 120 to end connection after 120 seconds of silence
	language: 'pt-BR' // see TJBot.prototype.languages.listen
};

// define speakers hardware config to audio play
exports.bot_defs.speak = {
	language: 'pt-BR', // see TJBot.prototype.languages.speak
	voice: undefined, // use a specific voice; if undefined, a voice is chosen based on robot.gender and speak.language
	speakerDeviceId: "plughw:1,0" // plugged-in USB card 1, device 0; see aplay -l for a list of playback devices
};

// define speakers hardware config to pcm speaker
exports.bot_defs.pcm_speak = {
	channels: 1,
	bitDepth: 16,
	sampleRate: 16000,
	device: 'plughw:1,0'
}

// define camera
exports.bot_defs.see = {
	confidenceThreshold: {
		object: 0.5,   // only list image tags with confidence > 0.5
		text: 0.1     // only list text tags with confidence > 0.5
	},
	camera: {
		height: 720,
		width: 960,
		verticalFlip: false, // flips the image vertically, may need to set to 'true' if the camera is installed upside-down
		horizontalFlip: false // flips the image horizontally, should not need to be overridden
	}
}


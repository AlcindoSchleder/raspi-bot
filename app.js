const TJBot = require('tjbot'); // tjbot lib
const events = require('events'); // event emmiter
const config = require('./config'); // IBM watson and hardware configuration
const AWS = require('aws-sdk'); // Aws Polly text to speech Ricardo
const Speaker = require('speaker'); // PCM speaker
const Stream = require('stream'); // Stream audio

const def = require('./define'); // define

const hardware = ['microphone'];

const Gpio = require('onoff').Gpio;
const pir = new Gpio(17, 'in', 'both');

let botConfig = {
	robot : def.bot_defs.robot,
	listen: def.bot_defs.listen,
	speak : def.bot_defs.speak
};


// obtain our credentials from config.js
let credentials = config.credentials;
let WKS = config.wks.gramado.workspaceID;

let tj = new TJBot(hardware, botConfig, credentials); // instance of tjbot
let Polly = new AWS.Polly(config.credentials.aws_polly); // instance of AWS Polly Speech To Text

let event = new events.EventEmitter(); // instance of Event Emmiter

// return a PCM Speacker instance
let getPlayer = function() {
    return new Speaker(def.bot_defs.pcm_speak);
}

let awsParams = def.bot_defs.aws_params;

let botStatus = config.STT.stop;

// call Aws Polly Speech To Text and genrate a promisse
let aws_tts = function(text) {
	return new Promise(function(resolve, reject) {
	//	awsParams.Text = '<speak><prosody rate="medium" volume="+10dB" pitch="+25%"><amazon:effect phonation="soft">' + text + '</amazon:effect></prosody></speak>';
		awsParams.Text = '<speak><prosody rate="medium" volume="+5dB" pitch="+25%">' + text + '</prosody></speak>';
		awsParams.TextType = 'ssml';
		Polly.synthesizeSpeech(awsParams, function(err, res) {
			if (err) {
				console.log('err', err);
			} else if (res && res.AudioStream instanceof Buffer) {
				var bufferStream = new Stream.PassThrough();
				bufferStream.end(res.AudioStream);
				bufferStream.pipe(getPlayer().on('close', function () {
					resolve({status: 200, message: 'ok'});
				}));
			}
		})
		.on('error', function (err) {
			reject('error on play stream: ' + err.message);
		});
	});
}

// Call IBM Watson Conversation to bot
let doConversation = function (msg) {
	tj.converse(WKS, msg, function(response) {
		// speak the result
		botStatus = config.STT.talk;
		console.log('Bot (' + botStatus + '):' + response.description);
		//
		// AWS Polly Speech to Text
		//
		aws_tts(response.description).then(function (data) {
			console.log('event from streaming ' + data.message);
			if (data.status == 200) {
				setTimeout(function () {
					event.emit('start_cap');
				}, 2000);
			};
		});
		//
		// watson speech to text
		//
		//tj.speak(response.description).then(function () {
		//	event.emit('start_cap');
		//});
	});
};

// Start microfone listen
let doListen = function () {
	console.log('instanciando microfone....');
	botStatus = config.STT.listen;
	tj.listen(function(msg) {
		// send to the conversation service
		if (msg) {
			event.emit('stop_cap');
			botStatus = config.STT.pause;
			console.log('User: ' + msg);
			doConversation(msg);
		} else {
			event.emit('stop_cap');
		};
	});
	
}

let listenTimeout = function () {
	if (botStatus == config.STT.listen) {
		console.log('timeout! stop microphone listen...');
		event.emit('stop_cap');
	} else {
		console.log('.' + botStatus);
	}
}


let getDetectMotion = function () {
	console.log("Monitoring....");
	pir.watch(function(err, value) {
		if (err) Exit();
		if ((value == 1) && (botStatus == config.STT.stop)) {
			console.log("Motion Detected: %d", value);
			doConversation('Oi.');
		};
	});
};

let Exit = function () {
	console.log('exiting....');
	pir.unexport();
	process.exit();
};

// events emmiter
event.on('pause_cap', function () {
	botStatus = config.STT.pause;
	tj.pauseListening();
});

event.on('resume_cap', function () {
	botStatus = config.STT.resume;
	tj.resumeListening();
});

event.on('stop_cap', function () {
	console.log('stoping microphone...');
	botStatus = config.STT.stop;
	tj.stopListening();
});

event.on('start_cap', function () {
	var botStatus = config.STT.listen;
	setTimeout(listenTimeout, 5000);
	doListen();
});

getDetectMotion();

process.on('SIGINT', Exit);

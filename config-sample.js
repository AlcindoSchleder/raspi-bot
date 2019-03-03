/*
User-specific configuration
    ** IMPORTANT NOTE ********************
    * Please ensure you do not interchange your username and password.
    * Hint: Your username is the lengthy value ~ 36 digits including a hyphen
    * Hint: Your password is the smaller value ~ 12 characters
*/ 

// Create the credentials object for export
exports.credentials = {};
exports.STT = {stop: 0, pause: 1, resume: 2, listen: 3, talk: 4};

//Watson Speech to Text
exports.credentials.speech_to_text = {
	username: 'stt_username',
	password: 'stt_password'
};

// Watson Assistant
exports.credentials.conversation = {
	username: 'conversation_username',
	password: 'conversation_password'
};

// Watson Assistant WorkSpaces
exports.wks = {};
// i-City build chatbot about Vocatio Telecom, i-City plataform, Gramado, Gramado Tourists
exports.wks.icity = {
	workspaceID: 'workspace_id'
};
exports.wks.terra_magica = {
	workspaceID: 'workspace_id'
};
exports.wks.gramado = {
	workspaceID: 'workspace_id'
};

// AWS Polly Speech to Text credentials 
exports.credentials.aws_polly = {
    region: 'aws_region',
    accessKeyId: 'aws_access_id_key',
    secretAccessKey: 'aws_password_key'
};


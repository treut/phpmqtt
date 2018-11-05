	/*
	* treut, 2018
	* http://treut.ru
	* d@treut.ru
	*/
	var mqtt;
	var reconnectTimeout=2000;
	var host="10.10.10.30"; //ip address device
	var port=9001;

	function onConnect(){
		console.log('connected!');
		mqtt.subscribe("test/rfid"); //subscribe to topic
	}

	function MQTTconnect(){
		console.log("connecting to "+host+" "+port);
		mqtt=new Paho.MQTT.Client(host, port, "clientjs"); //name of client
		var options={
			timeout:3,
			onSuccess: onConnect,
			onFailure: onFailure
		};
		mqtt.onMessageArrived=onMessageArrived;

		mqtt.connect(options);
	}

	function onFailure(message){
		console.log("connection attempt to host "+host+" Failed");
		setTimeout(MQTTconnect, reconnectTimeout);
	}

	function onMessageArrived(msg){
		console.log(msg.payloadString);
	}

	MQTTconnect();
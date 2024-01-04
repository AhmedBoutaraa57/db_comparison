## Generate data in predefined interval to a given mqtt endpoint

 1. Clone a `mqtt-simulator` from https://github.com/DamascenoRafael/mqtt-simulator
 2. install all the dependency from the requirement file
	 `pip3 install -r requirements.txt`
 3. inside `config` folder update `setting.json` 
    ``` 
        {
        "BROKER_URL": "0.0.0.0",
        "BROKER_PORT": 1884,
        "TOPICS": [
            {
                "TYPE":"list",
                "PREFIX": "temperature",
                "LIST": ["roof", "basement"],
                "TIME_INTERVAL": 0.5,
                "DATA": [
                    {
                        "NAME": "temperature",
                        "TYPE": "float",
                        "MIN_VALUE": 20,
                        "MAX_VALUE": 55,
                        "MAX_STEP": 3,
                        "RETAIN_PROBABILITY": 0.5,
                        "INCREASE_PROBABILITY": 0.6
                    },
                    {
                        "NAME": "ts",
                        "TYPE": "int",
                        "MIN_VALUE": 1703875253910,
                        "MAX_VALUE": 1745075523910,
                        "MAX_STEP": 3,
                        "RETAIN_PROBABILITY": 0,
                        "INCREASE_PROBABILITY": 1
                    },
                    {
                        "NAME": "device_id",
                        "TYPE": "int",
                        "MIN_VALUE": 1,
                        "MAX_VALUE": 1000000000,
                        "MAX_STEP": 1,
                        "RETAIN_PROBABILITY": 0,
                        "INCREASE_PROBABILITY": 1
                    },
                ]
            }
        ]
    }
    ```
 4. run `main.py` to publish to `/temperature/roof or temperature/basement` every `0.5sec`
 5. subscribe to `mosquitto_sub -h 0.0.0.0 -p 1884 -t 'temperature/*'`
    on mosquitto or ` nats sub "temperature.*"` on nats to receive the incoming messages from `mqtt-simulator`
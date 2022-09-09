/**
 * @ Author: Maxime Aymonin
 * @ Create Time: 2022-07-02 12:06:15
 * @ Modified by: Maxime Aymonin
 * @ Modified time: 2022-09-09 14:15:11
 * @ Description: Configuration part of the web interface to an EcoTrap
 */

/** Number input decrement */
function dec(text)
{
    readRangesValues();
    switch(text)
    {
        case 'min-temp':
            if(minTemp>0)
                minTemp-=0.5;
            else
                minTemp=0;
            document.getElementById("temp-min-input").value = minTemp.toFixed(1);
            break;
        
        case 'max-temp':
            if(maxTemp>0)
                maxTemp-=0.5;
            else
                maxTemp=0;
            document.getElementById("temp-max-input").value = maxTemp.toFixed(1);
            break;

        case 'min-hum':
            if(minHum>0)
                minHum-=1;
            else
                minHum=0;
            document.getElementById("hum-min-input").value = minHum.toFixed(0);
            break;

        case 'max-hum':
            if(maxHum>0)
                maxHum-=1;
            else
                maxHum=0;
            document.getElementById("hum-max-input").value = maxHum.toFixed(0);
            break;

        case 'network-id':
            if(networkId>0)
                networkId-=1;
            else
                networkId=0;
            document.getElementById("network-input").value = networkId.toFixed(0);
            break;

        case 'machine-id':
            if(machineId>0)
                machineId-=1;
            else
                machineId=0;
            document.getElementById("machine-input").value = machineId.toFixed(0);
            break;

        case 'childs-counter':
            if(childsCounter>0)
                childsCounter-=1;
            else
                childsCounter=0;
            document.getElementById("childs-input").value = childsCounter.toFixed(0);
            break;

        case 'measurements':
            if(measurementsPeriod>1)
                measurementsPeriod-=1;
            else
                measurementsPeriod=1;
            document.getElementById("measurements-input").value = measurementsPeriod.toFixed(0);
            break;

        case 'freq':
            if(CO2freq>1)
                CO2freq-=1;
            else
                CO2freq=1;
            document.getElementById("freq-input").value = CO2freq.toFixed(0);
            break;

        case 'level':
            if(CO2level>25)
                CO2level-=5;
            else
                CO2level=25;
            document.getElementById("level-input").value = CO2level.toFixed(0);
            break;
    }
}

/** Number input increment */
function inc(text)
{
    readRangesValues();
    switch(text)
    {
        case 'min-temp':
            if(minTemp<60)
                minTemp+=0.5;
            else
                minTemp=60;
            document.getElementById("temp-min-input").value = minTemp.toFixed(1);
            break;

        case 'max-temp':
            if(maxTemp<60)
                maxTemp+=0.5;
            else
                maxTemp=60;
            document.getElementById("temp-max-input").value = maxTemp.toFixed(1);
            break;

        case 'min-hum':
            if(minHum<100)
                minHum+=1;
            else
                minHum=100;
            document.getElementById("hum-min-input").value = minHum.toFixed(0);
            break;

        case 'max-hum':
            if(maxHum<100)
                maxHum+=1;
            else
                maxHum=100;
            document.getElementById("hum-max-input").value = maxHum.toFixed(0);
            break;

        case 'network-id':
            if(networkId<255)
                networkId+=1;
            else
                networkId=255;
            document.getElementById("network-input").value = networkId.toFixed(0);
            break;

        case 'machine-id':
            if(machineId<255)
                machineId+=1;
            else
                machineId=255;
            document.getElementById("machine-input").value = machineId.toFixed(0);
            break;

        case 'childs-counter':
            if(childsCounter<255)
                childsCounter+=1;
            else
                childsCounter=255;
            document.getElementById("childs-input").value = childsCounter.toFixed(0);
            break;

        case 'measurements':
            if(measurementsPeriod<360)
                measurementsPeriod+=1;
            else
                measurementsPeriod=360;
            document.getElementById("measurements-input").value = measurementsPeriod.toFixed(0);
            break;

        case 'freq':
            if(CO2freq<6)
                CO2freq+=1;
            else
                CO2freq=6;
            document.getElementById("freq-input").value = CO2freq.toFixed(0);
            break;

        case 'level':
            if(CO2level<1271)
                CO2level+=5;
            else
                CO2level=1275;
            document.getElementById("level-input").value = CO2level.toFixed(0);
            break;

        case 'randomCoeff':
            if(randomCoeffValue <10)
                randomCoeffValue+=1;
            else
                randomCoeffValue=10;
            document.getElementById("randomCoeff").value = randomCoeffValue.toFixed(1);
            break;
    }
}

/** Read all the values in the config ranges */
function readRangesValues()
{
    minTemp=parseFloat(document.getElementById("temp-min-input").value);
    maxTemp=parseFloat(document.getElementById("temp-max-input").value);
    minHum=parseFloat(document.getElementById("hum-min-input").value);
    maxHum=parseFloat(document.getElementById("hum-max-input").value);
    networkId=parseFloat(document.getElementById("network-input").value);
    machineId=parseFloat(document.getElementById("machine-input").value);
    childsCounter=parseFloat(document.getElementById("childs-input").value);
    measurementsPeriod=parseFloat(document.getElementById("measurements-input").value);
    CO2freq=parseFloat(document.getElementById("freq-input").value);
    CO2level=parseFloat(document.getElementById("level-input").value);
}

/** Transmit configuration values by BLE */
async function saveConfig()
{
  console.log(">> Saving config")

  let sensorsWord = new Uint8Array(20);
  sensorsWord = await readSensors();
  let generalWord = new Uint8Array(6);

  readRangesValues();

  //Temp max
  sensorsWord[16] = maxTemp*10/255;
  sensorsWord[15] = maxTemp*10%255;

  //Temp min
  sensorsWord[18] = minTemp*10/255;
  sensorsWord[17] = minTemp*10%255;

  //Humidity max
  sensorsWord[13] = maxHum;

  //Humidity min
  sensorsWord[14] = minHum;

  //Measurements period
  sensorsWord[19] = measurementsPeriod;

  console.log(sensorsWord)

  //CO2 freq
  generalWord[0] = CO2freq;

  //Netword ID
  generalWord[2] = networkId;

  //Machine ID
  generalWord[3] = machineId;

  //Childs counter
  generalWord[4] = childsCounter;

  //CO2 level
  generalWord[5] = CO2level/5;

  console.log(generalWord)

  try{
    await characteristicSensors.writeValue(sensorsWord);
    await characteristicGeneral.writeValue(generalWord);
  }
  catch(error){
    console.log('>> Config save error ' + error);
  }
}




async function resetMosquitoCounter(){
    let statusWord = new Uint8Array(2);

    console.log('>> Reading status');
    statusWord = await readStatus();
    console.log('>> status readed');
    console.log(statusWord);

    statusWord[1] = statusWord[1] | 0b00010000;

    console.log('>> Writing status caracteristic');
    console.log(statusWord);
    try{
        await characteristicStatus.writeValue(statusWord);
    }
    catch(error){
        console.log('/!\ Failed writing actuators caracteristic' + error);
    }

}
/**
 * @ Author: Maxime Aymonin
 * @ Create Time: 2022-07-02 11:56:55
 * @ Modified by: Maxime Aymonin
 * @ Modified time: 2022-09-09 14:06:53
 * @ Description: Global declarations for the web interface to an EcoTrap
 */

 let filters = [];
 filters.push({namePrefix: "EcoTrap"});
 
 var myDevice;
 var GeneralService      = 0x0100; 
 var ConfigService       = 0x0200;       
 var MeasurementsService = 0x0300;
 var InfoService         = 0x0400;
 
 var characteristicStatus;
 var characteristicActuators;
 var characteristicCalendar;
 var characteristicPosition;
 var characteristicSSID;
 var characteristicPassword;
 var characteristicSensors;
 var characteristicAI;
 var characteristicGeneral;
 
 var connectionToggle;
 var fanState;
 var co2State;
 var lightState;
 var modeAuto; // Mode Auto
 var modeAI;
 var modeManual;
 
 var mosquitoNumber=0;
 var minTemp=18;
 var maxTemp=35;
 var minHum=20;
 var maxHum=90;
 var networkId=255;
 var machineId=255;
 var childsCounter=0;
 var measurementsPeriod=5;
 var CO2freq=4;
 var CO2level=100;

 var quizzDemand = false;

 var treshold1Value;
 var treshold2Value;
 var tresholdOnValue;
 var minTreshold2;

 var prevTreshold1;
 var prevTreshold2;
 var prevTresholdON;
 var prevImpactCoeff;
 var prevRandomCoeff;

 var randomCoeffValue;
 var impactCoeffValue;






 
 
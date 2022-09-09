/**
 * @ Author: Joé HATIER
 * @ Create Time: 2022-08-13
 * @ Modified by: Joé HATIER
 * @ Modified time: 2022-08-13 
 * @ Description: Alerts part of the web interface to an EcoTrap
 */



/**
 * Handle measurements notification
 */
 function handleDataAlerts(event) {
    location.href ="#alerts";


    // get the data buffer from the event
    var buf = new Uint8Array(event.target.value.buffer);
    // debug trace
    console.log(">> Alerts data received : ")
    console.log(buf);

    
    strNotAlive = "Trap not detected : ";
    strNotAlive_Nb = "";
    strOutOfCo2 = "Trap out of Co2 : ";
    strOutOfCo2_Nb = "";
    strNotBatteryLow = "Trap not detected : ";
    strNotBatteryLow_Nb = "";
    strFanFault = "Trap out of Co2 : ";
    strFanFault_Nb = "";


    for (let i = 0; i < buf.length; i++) {
        if(buf[i]&0b00000001){ // Not Detected 
            console.log("la trap ", i, " est morte..." );
            strNotAlive_Nb +=  i + "  ";  
            document.getElementById("deadTrap").innerHTML = strNotAlive + strNotAlive_Nb;
        }
        if(buf[i]&0b00000010){ // Out of Co2
            console.log("la trap ", i, " est out of Co2..." );
            strOutOfCo2_Nb +=  i + "  ";  
            document.getElementById("deadCo2").innerHTML = strOutOfCo2 + strOutOfCo2_Nb;
        }
        if(buf[i]&0b00000100){ // Battery HS
            console.log("la trap ", i, " battery low..." );
            strNotAlive_Nb +=  i + "  ";  
            document.getElementById("deadBat").innerHTML = strNotBatteryLow + strNotBatteryLow_Nb;
        }
        if(buf[i]&0b00001000){ // Fan Default
            console.log("la trap ", i, " fan fault..." );
            strOutOfCo2_Nb +=  i + "  ";  
            document.getElementById("deadFan").innerHTML = strFanFault + strFanFault_Nb;
        }
    }

    





    
    // convert bytes to corresponding values
    // temperature = (buf[17]*255+buf[18])/10;
    // humidity = buf[19];
    // mosquito = buf[12];
    // update UI
    // document.getElementById('temperature-value').innerHTML  =   temperature.toFixed(1).toString() + '°C';
    // document.getElementById('humidity-value').innerHTML     =   humidity.toString() + '%';
    // document.getElementById('mosquitoes-value').innerHTML   =   mosquito.toString();
}
var presetVal;
var cycleVal;
var presetSelect = false;

var presetCode

var cycleCode

$(document).ready(function() {
    presetCode = new QRCode(document.getElementById("QRPreset"), {
        text: "", 
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    
    cycleCode = new QRCode(document.getElementById("QRCycle"), {
        text: "",
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    $("#CycleSelect input").change(presetChange)
    $("#PresetSelect").change(presetChange);
    setInterval(() => {
        makeCode()
    }, 500);
})

function presetChange() {
    if(!$(".accordion-collapse").eq(0).hasClass("show")) {
        $(".accordion-button")[0].click()
    }
    presetVal = $("#PresetSelect").find(":selected").data("preset");
    cycleVal =  $("#CycleSelect input:checked").data("cycle")
    if(presetVal != undefined) {
        makeCode()
        presetSelect = true;
    } else {
        presetSelect = false;
        makeCode()
    }
}

function makeCode() {
    if(presetSelect) {
        $("#QRPreset").show();
        $("#QRCycle").show();
        $("#CycleCommand").html("<strong>Command: </strong>" + cycleVal)
        $("#PresetCommand").html("<strong>Command: </strong>" + presetVal + "oT" + getTime())
        presetCode.makeCode(presetVal + "oT" + getTime());
        cycleCode.makeCode(cycleVal);
    } else {
        $("#QRPreset").hide();
        $("#QRCycle").hide();
        $("#PresetCommand").html("<strong>Please select a preset to generate QR-code.</strong>")
        $("#CycleCommand").html("<strong>Please select a preset to generate QR-code.</strong>")
    }
}

function getTime() {
    var date = new Date();
    function pad2(n) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
    }

    return date.getFullYear().toString().substr(-2) +
    pad2(date.getMonth() + 1) + 
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds());
}


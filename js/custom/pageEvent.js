var Status = 0;
var assProgress = 0;
var dialogAnimationProgress = -1;
var bgaudio;
var stainctx, staincanvas;
var stampctx, stampcanvas;
//var cpEventControl = {"cpview":0};
window.onload = function() {
    bgaudio = document.getElementById('audio');
    bgaudio.play();
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    $("#zlview")[0].addEventListener("touchend",zlviewtouch, false);
    $("#zldetail")[0].addEventListener("touchend",zldetailtouch, false);
    $("#gotoar")[0].addEventListener("touchend",gotoartouch, false);
    $("#xinwenpage")[0].addEventListener("touchend",xinwenpagetouch, false);
    $("#cangpin #cpview")[0].addEventListener("touchend",cpviewtouch, false);

    $("#cangpin #cpdetail")[0].addEventListener("touchend",cpdetailtouch, false);

    $("#cangpin #cpdetail")[0].addEventListener("touchmove",cpdetailtouchmove, false);

    $("#cangpin #cpdetail")[0].addEventListener("touchstart",cpdetailtouchstart, false);

    $("#ass0")[0].addEventListener("touchend",ass0touch, false);

    $("#assbtn0")[0].addEventListener("touchend", assbtn0touch, false);
    $("#assbtntext0")[0].addEventListener("touchend", assbtn0touch, false);
    $("#assbtntext1")[0].addEventListener("touchend", assbtn0touch, false);

    $("#dialogAnimation")[0].addEventListener("touchend", assDialogAnimation, false);

    $("#map")[0].addEventListener("touchend", mapTouch, false);
    $("#tab_all_b")[0].addEventListener("touchend", taballbTouch, false);
    $("#tab_dian_b")[0].addEventListener("touchend", tabdianbTouch, false);
    $("#tab_ting_b")[0].addEventListener("touchend", tabtingbTouch, false);
    $("#tab_tang_b")[0].addEventListener("touchend", tabtangbTouch, false);
    $("#tab_ge_b")[0].addEventListener("touchend", tabgebTouch, false);
    $("#tab_gong_b")[0].addEventListener("touchend", tabgongbTouch, false);

    $("#kunninggong")[0].addEventListener("touchend", kngTouch, false);
    $("#qianqinggong")[0].addEventListener("touchend", qqgTouch, false);

    var tabothers = $(".tabother");
    for(var i = 0; i <tabothers.length; i++)
    {
        tabothers[i].addEventListener("touchend", tabotherTouch, false);
    }

    $("#qqdetail")[0].addEventListener("touchend", qqdetailTouch, false);
    $("#kndetail")[0].addEventListener("touchend", kndetailTouch, false);

    $("#qqpage")[0].addEventListener("touchmove", qqpagetouchmove, false);
    $("#qqpage")[0].addEventListener("touchstart", qqpagetouchstart, false);
    $("#qqpage")[0].addEventListener("touchend", qqpagetouchend, false);

    $("#knpage")[0].addEventListener("touchmove", knpagetouchmove, false);
    $("#knpage")[0].addEventListener("touchstart", knpagetouchstart, false);
    $("#knpage")[0].addEventListener("touchend", knpagetouchend, false);


    $("#box1")[0].addEventListener("touchend", qqboxTouchend, false);
    $("#box2")[0].addEventListener("touchend", knboxTouchend, false);

    $("#jiesuo1")[0].addEventListener("touchend", jiesuo1Touchend, false);
    $("#jiesuo2")[0].addEventListener("touchend", jiesuo2Touchend, false);
    $("#js1sumbitbtn")[0].addEventListener("touchend", js1btnTouchend, false);
    $("#js1sumbittext")[0].addEventListener("touchend", js1btnTouchend, false);
    $("#jssumbitbtn")[0].addEventListener("touchend", jsbtnTouchend, false);
    $("#jssumbittext")[0].addEventListener("touchend", jsbtnTouchend, false);

    $("#jiesuo1sucess")[0].addEventListener("touchend", js1sucessTouchend, false);
    $("#jiesuo2sucess")[0].addEventListener("touchend", jssucessTouchend, false);

    $("#jiesuo11")[0].addEventListener("touchmove", r1touchmove, false);
    $("#jiesuo11")[0].addEventListener("touchstart", r1touchstart, false);

    $("#jiesuo12")[0].addEventListener("touchmove", r2touchmove, false);
    $("#jiesuo12")[0].addEventListener("touchstart", r2touchstart, false);

    $("#jiesuo13")[0].addEventListener("touchmove", r3touchmove, false);
    $("#jiesuo13")[0].addEventListener("touchstart", r3touchstart, false);

    $("#js3bg")[0].addEventListener("touchstart", js3bgtouchstart, false);
    $("#js3bg")[0].addEventListener("touchmove", js3bgtouchmove, false);
    $("#js3bg")[0].addEventListener("touchend", js3bgtouchend, false);

    $("#torch")[0].addEventListener("touchend", js3torchtouchend, false);
    $("#knife")[0].addEventListener("touchend", js3knifetouchend, false);

    staincanvas = $("#stain")[0];
    stainctx = $("#stain")[0].getContext('2d');
    $("#stain")[0].addEventListener("touchstart", js3bgtouchstart, false);
    $("#stain")[0].addEventListener("touchmove", js3bgtouchmove, false);
    $("#stain")[0].addEventListener("touchend", js3bgtouchend, false);
    fullfillstain()

    stampcanvas = $("#stamp")[0];
    stampctx = $("#stamp")[0].getContext('2d');
    $("#stamp")[0].addEventListener("touchstart", js3bgtouchstart, false);
    $("#stamp")[0].addEventListener("touchmove", js3bgtouchmove, false);
    $("#stamp")[0].addEventListener("touchend", js3bgtouchend, false);
    fullfillstamp();

    $("#tasksuccess")[0].addEventListener("touchend", js3resulttouchend, false);
    $("#taskfail")[0].addEventListener("touchend", js3resulttouchend, false);

    $("#gotojs3")[0].addEventListener("touchend", gotojs3touchend, false);

    $("#taskreward")[0].addEventListener("touchend", taskrewardtouchend, false);

    $("#wait")[0].addEventListener("touchend", waittouchend, false);
}
function waittouchend(event)
{
    hidePage();
}
function taskrewardtouchend(event)
{
    //console.log(event.changedTouches[0].clientX);
    //console.log(event.changedTouches[0].clientY);
    var x = event.changedTouches[0].clientX;
    var y = event.changedTouches[0].clientY;
    if(Math.abs(x - 513) < 250  &&  Math.abs(y - 816) < 40)
    {
        $("#taskreward").animate({"top": "-300"}, 200);
        $("#taskrewardbg").animate({"top": "400"}, 200);
        $("#assmask").animate({"opacity": "0"}, 200, function(){
            $("#taskreward")[0].removeAttribute("style","display:block");
            $("#taskrewardbg")[0].removeAttribute("style","display:block");
            $("#assmask")[0].removeAttribute("style","display:block");
        });
    }
}
function gotojs3touchend(event)
{
    var sstatus = Status;
    hideOnePage(sstatus);//assignment or jiesuo2
    showPage("jiesuo3");
}
function js3resulttouchend(event)
{
    //console.log(event.changedTouches[0].clientX);
    //console.log(event.changedTouches[0].clientY);
    var x = event.changedTouches[0].clientX;
    var y = event.changedTouches[0].clientY;
    if(Math.abs(x - 513) < 250  &&  Math.abs(y - 816) < 40)
    {
        $("#tasksuccess")[0].removeAttribute("style","display:block");
        $("#tasksuccessbg")[0].removeAttribute("style","display:block");

        $("#taskfail")[0].removeAttribute("style","display:block");
        //$("#jiesuo3")[0].removeAttribute("style","display:block");
        //$("#firstMask")[0].removeAttribute("style","display:block");
        hidePage();
    }
}
function staintouchmove(event)
{
    var cr = staincanvas.getClientRects();
    drawPoint(event.touches[0].clientX - cr[0].left - 60,
        event.touches[0].clientY - cr[0].top - 60);
}
function drawPoint(x,y)
{
    if(x < 0 || x > 68 || y < 0 || y > 82)
    {
        return;
    }
    stainctx.beginPath();
    var radgrad = stainctx.createRadialGradient(x, y, 0, x, y, 30);
    radgrad.addColorStop(0, 'rgba(255,255,255,1)');
    radgrad.addColorStop(1, 'rgba(192, 147, 90, 0)');
    stainctx.fillStyle = radgrad;
    stainctx.arc(x, y, 10, 0, Math.PI * 2, true);
    stainctx.fill();
}
function fullfillstain()
{
    //stainctx.scale(1,1);
    //stainctx.clearRect(0,0,68,82);
    var img = new Image();
    img.src = "./image/task/wuzi.png";
    img.id = "stainimg"
    img.onload = function(){
        //console.log(this);
        staincanvas.width = staincanvas.width;
        stainctx.drawImage(this, 0, 0);//, 150, 150
        stainctx.globalCompositeOperation = 'destination-out';
    };
}
var stamplastmove = {};
function stamptouchmove(event)
{
    var cr = stampcanvas.getClientRects();
    /*if((stamplastmove.x && Math.abs(stamlastmove.x - event.touches[0].clientX) < 10)
        && (stamplastmove.y && Math.abs(stamlastmove.y - event.touches[0].clientY) < 10))
    {
        return;
    }*/
    stampdrawPoint(event.touches[0].clientX - 85 - cr[0].left,//  - 85
        event.touches[0].clientY - 85 - cr[0].top);
}
function stampdrawPoint(x,y)
{
    if(x < 15 || x > stampcanvas.width-15 || y < 15 || y > stampcanvas.height-15)
    {
        return;
    }
    /*
    stampctx.beginPath();
    var radgrad = stampctx.createRadialGradient(x, y, 0, x, y, 30);
    radgrad.addColorStop(0, 'rgba(255,255,255,1)');
    radgrad.addColorStop(1, 'rgba(192, 147, 90, 0)');
    stampctx.fillStyle = radgrad;
    stampctx.arc(x, y, 10, 0, Math.PI * 2, true);
    stampctx.fill();*/

    var imgData = stampctx.getImageData(x-15 , y-15 , 30 , 30);//-35,-35
    //console.log(imageData);
    for (var i = 0 , len = imgData.data.length ; i < len ; i += 4 )
    {
        if(!imgData.data[i] || imgData.data[i] == 0)
        {
            imgData.data[i+3] = 0;
        }
        else
        {
            imgData.data[i+3] = 255;
        }
    }
    stampctx.putImageData(imgData , x-15 , y-15);
}
function fullfillstamp()
{
    var img = new Image();
    img.src = "./image/task/yinzhang.png";
    img.id = "stampimg"
    img.onload = function(){
        console.log(this);
        stampcanvas.width = stampcanvas.width;
        //stampctx.globalAlpha = 0;
        stampctx.drawImage(this, 0, 0);//, 150, 150
        var imgData = stampctx.getImageData(0 , 0 , 39 , 41);
        //console.log(imgData);
        for (var i = 3 , len = imgData.data.length ; i < len ; i += 4 )
        {
           imgData.data[i] = 20;
        }
        //console.log(imgData);
        stampctx.putImageData(imgData , 0 , 0);
        //imgData = stampctx.getImageData(0 , 0 , 39 , 41);
        //console.log(imgData);
        //stampctx.globalCompositeOperation = 'destination-atop';
    };
}
var js3torchFocus = false;
function js3torchtouchend(event)
{
    js3torchFocus = !js3torchFocus;
    if(js3torchFocus)
    {
        js3knifeFocus = false;
        $("#torchshadow")[0].setAttribute("style","display:block");
        $("#knifeshadow")[0].removeAttribute("style","display:block");
    }
    else
    {
        $("#torchshadow")[0].removeAttribute("style","display:block");
    }
}
var js3knifeFocus = false;
function js3knifetouchend(event)
{
    js3knifeFocus = !js3knifeFocus;
    if(js3knifeFocus)
    {
        js3torchFocus = false;
        $("#torchshadow")[0].removeAttribute("style","display:block");
        $("#knifeshadow")[0].setAttribute("style","display:block");
    }
    else
    {
        $("#knifeshadow")[0].removeAttribute("style","display:block");
    }
}
function js3bgtouchstart(event)
{
    //console.log(event.changedTouches[0].clientX);
    //console.log(event.changedTouches[0].clientY);
    var x = event.changedTouches[0].clientX;
    var y = event.changedTouches[0].clientY;
    if(Math.abs(x - 490) < 80  &&  Math.abs(y - 1025) < 40)
    {
        return;
    }
    if(Math.abs(x - 700) < 80  &&  Math.abs(y - 1025) < 40)
    {
        return;
    }
    if (Math.abs(x - 511) < 40 && Math.abs(y - 1200) < 40)//screenX: 281, screenY: 254
    {
        return;
    }
    if(js3torchFocus)
    {
        $("#lazer")[0].setAttribute("style","visibility:visible;left:"
            +(x-110) +"px;top:"+(y-110)+"px;");
        $("#torchmove")[0].setAttribute("style","visibility:visible;left:"
                +(x-60) +"px;top:"+(y-60)+"px;");
        stamptouchmove(event);
    }
    if(js3knifeFocus)
    {
        $("#knifemove")[0].setAttribute("style","visibility:visible;left:"
                +(x - 60) +"px;top:"+(y-60)+"px;");
        staintouchmove(event);
    }
}
function js3bgtouchmove(event)
{
    //console.log(event.changedTouches[0].pageX);
    //console.log(event.changedTouches[0].pageY);

    var x = event.changedTouches[0].clientX;
    var y = event.changedTouches[0].clientY;
   if(js3torchFocus)
   {
       $("#lazer")[0].setAttribute("style","visibility:visible;left:"
           +(x-110) +"px;top:"+(y-100)+"px;");
       $("#torchmove")[0].setAttribute("style","visibility:visible;left:"
                +(x - 60) +"px;top:"+(y-60)+"px;");
       stamptouchmove(event);
   }
    if(js3knifeFocus)
    {
        $("#knifemove")[0].setAttribute("style","visibility:visible;left:"
                +(x - 60) +"px;top:"+(y-60)+"px;");
        staintouchmove(event);
    }
}
function js3bgtouchend(event)
{
    //console.log(event.changedTouches[0].clientX);
    //console.log(event.changedTouches[0].clientY);
    var x = event.changedTouches[0].clientX;
    var y = event.changedTouches[0].clientY;
    if(js3torchFocus)
    {
        $("#lazer")[0].removeAttribute("style","visibility:visible;");
        $("#torchmove")[0].removeAttribute("style","visibility:visible;");
    }
    if(js3knifeFocus)
    {
        $("#knifemove")[0].removeAttribute("style","visibility:visible;");
    }
    if(Math.abs(x - 490) < 80 && Math.abs(y - 1025) < 40)
    {
        //console.log("success");
        assProgress = 4;

        $("#tasksuccess")[0].setAttribute("style","display:block;top:-300px");
        $("#tasksuccessbg")[0].setAttribute("style","display:block;top:-400px");
        $("#tasksuccess").animate({"top":"400px"}, 200);
        $("#tasksuccessbg").animate({"top":"300px"}, 200, function(){
            $("#torchshadow")[0].removeAttribute("style","display:block");
            $("#knifeshadow")[0].removeAttribute("style","display:block");
            js3torchFocus = false;
            js3knifeFocus = false;
            $("#js3bg")[0].removeAttribute("style","display:block");
            $("#stain")[0].removeAttribute("style","display:block");
            $("#stamp")[0].removeAttribute("style","display:block");
            $("#torch")[0].removeAttribute("style","display:block");
            $("#knife")[0].removeAttribute("style","display:block");
            $("#tip")[0].removeAttribute("style","display:block");
        });
    }
    else if(Math.abs(x - 700) < 80 && Math.abs(y - 1025) < 40)
    {
        assProgress = -9;
        $("#taskfail")[0].setAttribute("style","display:block;top:-300px");
        $("#taskfail").animate({"top":"400px"}, 200, function(){
            $("#torchshadow")[0].removeAttribute("style","display:block");
            $("#knifeshadow")[0].removeAttribute("style","display:block");
            js3torchFocus = false;
            js3knifeFocus = false;
            $("#js3bg")[0].removeAttribute("style","display:block");
            $("#stain")[0].removeAttribute("style","display:block");
            $("#stamp")[0].removeAttribute("style","display:block");
            $("#torch")[0].removeAttribute("style","display:block");
            $("#knife")[0].removeAttribute("style","display:block");
            $("#tip")[0].removeAttribute("style","display:block");
        });
    }
    else if (Math.abs(x - 511) < 40 && Math.abs(y - 1200) < 40)//screenX: 281, screenY: 254
    {
        hidePage();
        //$("#firstMask")[0].removeAttribute("style","display:block");
        //$("#jiesuo3")[0].removeAttribute("style","display:block");
    }
}
function showjiesuo3(){
    if(assProgress == 3)
    {
        js3torchFocus = false;
        js3knifeFocus = false;
        $("#torchshadow")[0].removeAttribute("style","display:block");
        $("#knifeshadow")[0].removeAttribute("style","display:block");
        $("#js3bg")[0].setAttribute("style","display:block");
        $("#stain")[0].setAttribute("style","display:block");
        $("#stamp")[0].setAttribute("style","display:block");
        $("#torch")[0].setAttribute("style","display:block");
        $("#knife")[0].setAttribute("style","display:block");
        $("#tip")[0].setAttribute("style","display:block");
    }
}
var r1reg = 0;// -35 325
var r2reg = 0;//110 -250
var r3reg = 0;//73 -287
var r1last = {};
var r2last = {};
var r3last = {};
function r1touchstart(event){
    r1last["x"] = event.touches[ 0 ].screenX;
    r1last["y"] = event.touches[ 0 ].screenY;

}
function r1touchmove(event){
    //console.log(event);
    event.preventDefault();

    r1reg += 0.5*(Math.abs(event.touches[ 0 ].screenX - r1last["x"])+Math.abs(event.touches[ 0 ].screenY - r1last["y"]));
    $("#jiesuo11")[0].style.transform = "rotate(" + r1reg +"deg)";
    r1last["x"] = event.touches[ 0 ].screenX;
    r1last["y"] = event.touches[ 0 ].screenY;
}
function r2touchstart(event){
    r2last["x"] = event.touches[ 0 ].screenX;
    r2last["y"] = event.touches[ 0 ].screenY;
}
function r2touchmove(event){
    //console.log(event);
    event.preventDefault();

    r2reg += 0.5*(Math.abs(event.touches[ 0 ].screenX - r2last["x"])+Math.abs(event.touches[ 0 ].screenY - r2last["y"]));
    $("#jiesuo12")[0].style.transform = "rotate(" + r2reg +"deg)";
    r2last["x"] = event.touches[ 0 ].screenX;
    r2last["y"] = event.touches[ 0 ].screenY;
}
function r3touchstart(event){
    r3last["x"] = event.touches[ 0 ].screenX;
    r3last["y"] = event.touches[ 0 ].screenY;
}
function r3touchmove(event){
    //console.log(event);
    event.preventDefault();

    r3reg += 0.5*(Math.abs(event.touches[ 0 ].screenX - r3last["x"])+Math.abs(event.touches[ 0 ].screenY - r3last["y"]));
    $("#jiesuo13")[0].style.transform = "rotate(" + r3reg +"deg)";
    r3last["x"] = event.touches[ 0 ].screenX;
    r3last["y"] = event.touches[ 0 ].screenY;
}
function js1sucessTouchend(event){
    //console.log(event.changedTouches[0].pageX);
    //console.log(event.changedTouches[0].pageY);

    if (Math.abs(event.changedTouches[0].pageX - 500) < 240 && Math.abs(event.changedTouches[0].pageY - 900) < 50)//screenX: 281, screenY: 254
    {
        $("#sucess1shine").animate({"top":"-483px"}, 200);
        $("#jiesuo1sucess").animate({"top":"-383px"}, 200);
        $("#jiesuomask1").animate({"opacity":"0"}, 200, function(){

            $("#jiesuo1sucess")[0].removeAttribute("style","display:block");
            $("#sucess1shine")[0].removeAttribute("style","display:block");
            $("#jiesuomask1")[0].removeAttribute("style", "display:block");
        });

    }
}
function jssucessTouchend(event)
{
    //console.log(event.changedTouches[0].pageX);
    //console.log(event.changedTouches[0].pageY);

    if (Math.abs(event.changedTouches[0].pageX - 500) < 240 && Math.abs(event.changedTouches[0].pageY - 900) < 50)//screenX: 281, screenY: 254
    {
        $("#sucess2shine").animate({"top":"-483px"}, 200);
        $("#jiesuo2sucess").animate({"top":"-383px"}, 200);
        $("#jiesuomask2").animate({"opacity":"0"}, 200, function(){

            $("#jiesuo2sucess")[0].removeAttribute("style","display:block");
            $("#sucess2shine")[0].removeAttribute("style","display:block");
            $("#jiesuomask2")[0].removeAttribute("style", "display:block");

            gotojs3touchend();
        });


    }
}
function js1btnTouchend(event){
    if((Math.abs(r1reg%360 - 325) < 10 || Math.abs(r1reg%360 + 35) < 10)
        && (Math.abs(r2reg%360 - 110) < 10 || Math.abs(r2reg%360 + 250) < 10)
        && (Math.abs(r3reg%360 - 73) < 10 || Math.abs(r3reg%360 + 287) < 10))
    {
        assProgress = 2;
        $("#jiesuo1sucess")[0].setAttribute("style","display:block;top:-383px");
        $("#sucess1shine")[0].setAttribute("style","display:block;top:-483px");
        $("#jiesuo1sucess").animate({"top":"400px"}, 200);
        $("#sucess1shine").animate({"top":"300px"}, 200, function(){
            $("#shine1")[0].removeAttribute("style", "display:block");
            $("#box1")[0].removeAttribute("style", "display:block");
            $("#jiesuo1")[0].removeAttribute("style", "display:block");
            $("#js1sumbitbtn")[0].removeAttribute("style", "display:block");
            $("#js1sumbittext")[0].removeAttribute("style", "display:block");

            $("#jiesuo1")[0].removeAttribute("style", "display:block");
            $("#jiesuo11")[0].removeAttribute("style", "display:block");
            $("#jiesuo12")[0].removeAttribute("style", "display:block");
            $("#jiesuo13")[0].removeAttribute("style", "display:block");
            $("#jiesuo14")[0].removeAttribute("style", "display:block");
        });


    }
    else{
        $("#jiesuo1fail")[0].setAttribute("style","display:block");
        setTimeout(function(){$("#jiesuo1fail")[0].removeAttribute("style","display:block");}, 2000);
    }
}
function jsbtnTouchend(event){
    if($("#jsi1").val() == "黄" && $("#jsi2").val() == "公" && $("#jsi3").val() == "望")
    {
        assProgress = 3;

        $("#jiesuo2sucess")[0].setAttribute("style","display:block;top:-383px");
        $("#sucess2shine")[0].setAttribute("style","display:block;top:-483px");
        $("#jiesuo2sucess").animate({"top":"400px"}, 200);
        $("#sucess2shine").animate({"top":"300px"}, 200, function(){
            $("#shine2")[0].removeAttribute("style", "display:block");
            $("#box2")[0].removeAttribute("style", "display:block");

            $("#jiesuo2")[0].removeAttribute("style", "display:block");
            $("#jsinput")[0].removeAttribute("style", "display:block");
            $("#jssumbitbtn")[0].removeAttribute("style", "display:block");
            $("#jssumbittext")[0].removeAttribute("style", "display:block");
            //$("#jiesuo2sucess")[0].setAttribute("style","display:block");
            ///$("#sucess2shine")[0].setAttribute("style","display:block");
            $("#jsi1").val("");
            $("#jsi2").val("");
            $("#jsi3").val("");
        });

        //$("#jiesuomask2")[0].removeAttribute("style", "display:block");

    }
    else{
        $("#jiesuo2fail")[0].setAttribute("style","display:block");
        setTimeout(function(){$("#jiesuo2fail")[0].removeAttribute("style","display:block");}, 2000);

    }
}

function jiesuo1Touchend(event)
{
    if (Math.abs(event.changedTouches[0].pageX - 508) < 40 && Math.abs(event.changedTouches[0].pageY - 1244) < 40)//screenX: 281, screenY: 254
    {

        $("#jiesuo11")[0].removeAttribute("style", "display:block");
        $("#jiesuo12")[0].removeAttribute("style", "display:block");
        $("#jiesuo13")[0].removeAttribute("style", "display:block");
        $("#jiesuo14")[0].removeAttribute("style", "display:block");
        $("#js1sumbitbtn")[0].removeAttribute("style", "display:block");
        $("#js1sumbittext")[0].removeAttribute("style", "display:block");
        $("#jiesuomask1").animate({"opacity":"0"}, 300);
        $("#jiesuo1").animate({"top": "1290px"}, 300, function(){
            $("#jiesuomask1")[0].removeAttribute("style", "display:block");
            $("#jiesuo1")[0].removeAttribute("style", "display:block");
        });
    }
}

function jiesuo2Touchend(event)
{
    //console.log(event.changedTouches[0].pageX);
    //console.log(event.changedTouches[0].pageY);

    if (Math.abs(event.changedTouches[0].pageX - 508) < 40 && Math.abs(event.changedTouches[0].pageY - 1244) < 40)//screenX: 281, screenY: 254
    {
        $("#jsinput")[0].removeAttribute("style", "display:block");
        $("#jssumbitbtn")[0].removeAttribute("style", "display:block");
        $("#jssumbittext")[0].removeAttribute("style", "display:block");
        $("#jiesuomask2").animate({"opacity":"0"}, 300);
        $("#jiesuo2").animate({"top": "1290px"}, 300, function(){
            $("#jiesuomask2")[0].removeAttribute("style", "display:block");
            $("#jiesuo2")[0].removeAttribute("style", "display:block");
        });
    }
}

function qqboxTouchend(event)
{
    if(assProgress == 1)
    {
        //assProgress = 2;

        //$("#shine1")[0].removeAttribute("style","display:block");
        //$("#box1")[0].removeAttribute("style","display:block");
        //window.clearInterval(shinerotate1);

        $("#jiesuomask1")[0].setAttribute("style", "display:block;opacity:0");
        $("#jiesuomask1").animate({"opacity":"0.4"}, 300);
        $("#jiesuo1")[0].setAttribute("style", "display:block;top:1290px");
        $("#jiesuo1").animate({"top":"90px"}, 300,function(){
            $("#jiesuo11")[0].setAttribute("style", "display:block");
            $("#jiesuo12")[0].setAttribute("style", "display:block");
            $("#jiesuo13")[0].setAttribute("style", "display:block");
            $("#jiesuo14")[0].setAttribute("style", "display:block");
            $("#js1sumbitbtn")[0].setAttribute("style", "display:block");
            $("#js1sumbittext")[0].setAttribute("style", "display:block");
        });
    }
}

function knboxTouchend(event)
{
    if(assProgress == 2)
    {

        /*
        assProgress = 3;
        $("#shine2")[0].removeAttribute("style","display:block");
        $("#box2")[0].removeAttribute("style","display:block");
        window.clearInterval(shinerotate2);
        */
        //$("#jiesuomask2")[0].setAttribute("style", "display:block");
        //$("#jiesuo2")[0].setAttribute("style", "display:block");


        $("#jiesuomask2")[0].setAttribute("style", "display:block;opacity:0");
        $("#jiesuomask2").animate({"opacity":"0.4"}, 300);
        $("#jiesuo2")[0].setAttribute("style", "display:block;top:1290px");
        $("#jiesuo2").animate({"top":"90px"}, 300,function(){
            $("#jsinput")[0].setAttribute("style", "display:block");
            $("#jssumbitbtn")[0].setAttribute("style", "display:block");
            $("#jssumbittext")[0].setAttribute("style", "display:block");
        });

    }
}

var lastScreenY = 0;
function qqpagetouchstart(event) {
    lastScreenY = event.touches[0].screenY;
    //console.log("start    "+event.touches[ 0 ].screenX);
    //console.log(event.changedTouches[0].pageX);
    //console.log(event.changedTouches[0].pageY);


}
function qqpagetouchmove(event){
    //console.log(event);
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        var nowtop = parseInt($("#qqpage").css("top").split("p")[0]);
        var delta = (event.touches[ 0 ].screenY - lastScreenY)*1
        var nexttops = nowtop + delta;

        var boxnowtop = parseInt($("#box1").css("top").split("p")[0]);
        var shinenowtop = parseInt($("#shine1").css("top").split("p")[0]);

        var boxnexttop = boxnowtop + delta;
        var shinenexttop = shinenowtop + delta;

        if(nexttops > 0){
            nexttops = 0;
        }
        else if(nexttops < -580){
            nexttops = -580;
        }

        if(boxnexttop > 740){
            boxnexttop = 740;
        }
        else if(boxnexttop < 160){
            boxnexttop = 160;
        }

        if(shinenexttop > 620){
            shinenexttop = 620;
        }
        else if(shinenexttop < 40){
            shinenexttop = 40;
        }

        var nexttopstr = nexttops + "px";
        lastScreenY = event.touches[ 0 ].screenY;
        //console.log(nowtop);
        //console.log(nexttops);
        //console.log(nexttopstr);
        //console.log(event.touches[ 0 ].screenX);
        $("#qqpage").css("top", nexttopstr);
        $("#box1").css("top", boxnexttop + "px");
        $("#shine1").css("top", shinenexttop + "px");

        //console.log($("#cangpin #cpdetail img").css("top"));
    }
}
function qqpagetouchend(event){
    if (Math.abs(event.changedTouches[0].pageX - 225) < 40 && Math.abs(event.changedTouches[0].pageY - 152) < 40)//screenX: 281, screenY: 254
    {
        /*
        $("#qianqing")[0].removeAttribute("style","display:block");
        $("#shine1")[0].removeAttribute("style","display:block");
        $("#box1")[0].removeAttribute("style","display:block");
        window.clearInterval(shinerotate1);*/
        hideqqpage();
    }
}
var shinerotate1, shinerotate2;
function knpagetouchstart(event) {
    lastScreenY = event.touches[0].screenY;
    //console.log("start    "+event.touches[ 0 ].screenX);
}
function knpagetouchmove(event){
    //console.log(event);

    if ( event.touches.length == 1 ) {
        event.preventDefault();
        var nowtop = parseInt($("#knpage").css("top").split("p")[0]);
        var delta = (event.touches[ 0 ].screenY - lastScreenY)*1
        var nexttops = nowtop + delta;

        var boxnowtop = parseInt($("#box2").css("top").split("p")[0]);
        var shinenowtop = parseInt($("#shine2").css("top").split("p")[0]);

        var boxnexttop = boxnowtop + delta;
        var shinenexttop = shinenowtop + delta;

        if(nexttops > 0){
            nexttops = 0;
        }
        else if(nexttops < -580){
            nexttops = -580;
        }

        if(boxnexttop > 740){
            boxnexttop = 740;
        }
        else if(boxnexttop < 160){
            boxnexttop = 160;
        }

        if(shinenexttop > 620){
            shinenexttop = 620;
        }
        else if(shinenexttop < 40){
            shinenexttop = 40;
        }

        var nexttopstr = nexttops + "px";
        lastScreenY = event.touches[ 0 ].screenY;
        //console.log(nowtop);
        //console.log(nexttops);
        //console.log(nexttopstr);
        //console.log(event.touches[ 0 ].screenX);
        $("#knpage").css("top", nexttopstr);
        $("#box2").css("top", boxnexttop + "px");
        $("#shine2").css("top", shinenexttop + "px");
        //console.log($("#cangpin #cpdetail img").css("top"));
    }
}
function knpagetouchend(event){
    //console.log(event.changedTouches[0].pageX);
    //console.log(event.changedTouches[0].pageY);

    if (Math.abs(event.changedTouches[0].pageX - 225) < 40 && Math.abs(event.changedTouches[0].pageY - 152) < 40)//screenX: 281, screenY: 254
    {
        /*
        $("#kunning")[0].removeAttribute("style","display:block");
        $("#shine2")[0].removeAttribute("style","display:block");
        $("#box2")[0].removeAttribute("style","display:block");
        window.clearInterval(shinerotate2);*/
        hideknpage();
    }
    /*
    else
    {
        assProgress = 2;
        kndetailTouch();
    }*/
}
function hideknpage()
{
    $("#kunning").animate({"top":"1366px"}, 300, function(){
        $("#kunning")[0].removeAttribute("style","display:block");
        $("#shine2")[0].removeAttribute("style","display:block");
        $("#box2")[0].removeAttribute("style","display:block");
        window.clearInterval(shinerotate2);
    });
}
function hideqqpage()
{
    $("#qianqing").animate({"top":"1366px"}, 300, function(){
        $("#qianqing")[0].removeAttribute("style","display:block");
        $("#shine1")[0].removeAttribute("style","display:block");
        $("#box1")[0].removeAttribute("style","display:block");
        window.clearInterval(shinerotate1);
    });
}

function qqdetailTouch()
{
    $("#qianqing")[0].setAttribute("style","display:block;top:1366px");
    $("#qianqing").animate({"top":"83px"}, 300, function(){
        $("#kunning")[0].removeAttribute("style","display:block");
    });

    if(assProgress == 1)
    {
        $("#shine1")[0].setAttribute("style","display:block");
        $("#box1")[0].setAttribute("style","display:block");
        shinerotate1 = setInterval("shine1rotate()", 50);
    }
    else
    {
        $("#shine1")[0].removeAttribute("style","display:block");
        $("#box1")[0].removeAttribute("style","display:block");
    }

}
var rotateReg1 = 1;
function shine1rotate(){
    var shine1 = $("#shine1")[0];
    shine1.style.transform = "rotate("+rotateReg1*1+"deg)";
    rotateReg1++;
}
var rotateReg2 = 2;
function shine2rotate(){
    var shine2 = $("#shine2")[0];
    shine2.style.transform = "rotate("+rotateReg2*1+"deg)";
    rotateReg2++;
}

function kndetailTouch()
{
    //$("#qianqing")[0].removeAttribute("style","display:block");
    //$("#kunning")[0].setAttribute("style","display:block");
    $("#kunning")[0].setAttribute("style","display:block;top:1366px");
    $("#kunning").animate({"top":"83px"}, 300, function(){
        $("#qianqing")[0].removeAttribute("style","display:block");
    });

    if(assProgress == 2)
    {
        $("#shine2")[0].setAttribute("style","display:block");
        $("#box2")[0].setAttribute("style","display:block");
        shinerotate2 = setInterval("shine2rotate()", 50);
    }
    else
    {
        $("#shine2")[0].removeAttribute("style","display:block");
        $("#box2")[0].removeAttribute("style","display:block");
    }
}
function kngTouch(event)
{
    if($("#kndetail")[0].style.display == "")
    {
        $("#kndetail")[0].setAttribute("style","display:block;top:1366px");
        $("#kndetail").animate({"top":"800px"}, 200, function(){
            $("#qqdetail")[0].removeAttribute("style","display:block");
        });
    }
}
function qqgTouch(event)
{
    if($("#qqdetail")[0].style.display == "")
    {
        $("#qqdetail")[0].setAttribute("style","display:block;top:1366px");
        $("#qqdetail").animate({"top":"800px"}, 200, function(){
            $("#kndetail")[0].removeAttribute("style","display:block");
        });
    }
}
function tabotherTouch(event)
{
    if($("#qqdetail")[0].style.display == "block")
    {
        //$("#qqdetail")[0].setAttribute("style","display:block;top:1366px");
        $("#qqdetail").animate({"top":"1366px"}, 200, function(){
            $("#qqdetail")[0].removeAttribute("style","display:block");
        });
    }
    if($("#kndetail")[0].style.display == "block")
    {
        $("#kndetail").animate({"top":"1366px"}, 200, function(){
            $("#kndetail")[0].removeAttribute("style","display:block");
        });
    }
    //$("#kndetail")[0].removeAttribute("style","display:block");
    //$("#qqdetail")[0].removeAttribute("style","display:block");
}
function taballbTouch(event)
{
    $("#tab_all_b")[0].removeAttribute("style","display:block");
    $("#tab_dian_b")[0].setAttribute("style","display:block");
    $("#tab_ting_b")[0].setAttribute("style","display:block");
    $("#tab_tang_b")[0].setAttribute("style","display:block");
    $("#tab_ge_b")[0].setAttribute("style","display:block");
    $("#tab_gong_b")[0].setAttribute("style","display:block");

    $("#tab_all")[0].setAttribute("style","display:block");
    $("#tab_dian")[0].removeAttribute("style","display:block");
    $("#tab_ting")[0].removeAttribute("style","display:block");
    $("#tab_tang")[0].removeAttribute("style","display:block");
    $("#tab_ge")[0].removeAttribute("style","display:block");
    $("#tab_gong")[0].removeAttribute("style","display:block");

    $("#line1")[0].setAttribute("style","display:block");
    $("#line2")[0].removeAttribute("style","display:block");
    $("#line3")[0].removeAttribute("style","display:block");
    $("#line4")[0].removeAttribute("style","display:block");
    $("#line5")[0].removeAttribute("style","display:block");
    $("#line6")[0].removeAttribute("style","display:block");

    $("#baohedian")[0].setAttribute("style","display:block");
    $("#cininggong")[0].setAttribute("style","display:block");
    $("#dafo")[0].setAttribute("style","display:block");
    $("#fuxiting")[0].setAttribute("style","display:block");
    $("#kunninggong")[0].setAttribute("style","display:block");
    $("#qianqinggong")[0].setAttribute("style","display:block");
    $("#taihedian")[0].setAttribute("style","display:block");
    $("#tirenge")[0].setAttribute("style","display:block");
    $("#wenyuange")[0].setAttribute("style","display:block");
    $("#zhongcuigong")[0].setAttribute("style","display:block");
    $("#zhonghedian")[0].setAttribute("style","display:block");

    $("#kndetail")[0].removeAttribute("style","display:block");
    $("#qqdetail")[0].removeAttribute("style","display:block");
}

function tabdianbTouch(event)
{
    $("#tab_all_b")[0].setAttribute("style","display:block");
    $("#tab_dian_b")[0].removeAttribute("style","display:block");
    $("#tab_ting_b")[0].setAttribute("style","display:block");
    $("#tab_tang_b")[0].setAttribute("style","display:block");
    $("#tab_ge_b")[0].setAttribute("style","display:block");
    $("#tab_gong_b")[0].setAttribute("style","display:block");

    $("#tab_all")[0].removeAttribute("style","display:block");
    $("#tab_dian")[0].setAttribute("style","display:block");
    $("#tab_ting")[0].removeAttribute("style","display:block");
    $("#tab_tang")[0].removeAttribute("style","display:block");
    $("#tab_ge")[0].removeAttribute("style","display:block");
    $("#tab_gong")[0].removeAttribute("style","display:block");

    $("#line1")[0].removeAttribute("style","display:block");
    $("#line2")[0].setAttribute("style","display:block");
    $("#line3")[0].removeAttribute("style","display:block");
    $("#line4")[0].removeAttribute("style","display:block");
    $("#line5")[0].removeAttribute("style","display:block");
    $("#line6")[0].removeAttribute("style","display:block");

    $("#baohedian")[0].setAttribute("style","display:block");
    $("#cininggong")[0].removeAttribute("style","display:block");
    $("#dafo")[0].removeAttribute("style","display:block");
    $("#fuxiting")[0].removeAttribute("style","display:block");
    $("#kunninggong")[0].removeAttribute("style","display:block");
    $("#qianqinggong")[0].removeAttribute("style","display:block");
    $("#taihedian")[0].setAttribute("style","display:block");
    $("#tirenge")[0].removeAttribute("style","display:block");
    $("#wenyuange")[0].removeAttribute("style","display:block");
    $("#zhongcuigong")[0].removeAttribute("style","display:block");
    $("#zhonghedian")[0].setAttribute("style","display:block");

    $("#kndetail")[0].removeAttribute("style","display:block");
    $("#qqdetail")[0].removeAttribute("style","display:block");
}

function tabtingbTouch(event)
{
    $("#tab_all_b")[0].setAttribute("style","display:block");
    $("#tab_dian_b")[0].setAttribute("style","display:block");
    $("#tab_ting_b")[0].removeAttribute("style","display:block");
    $("#tab_tang_b")[0].setAttribute("style","display:block");
    $("#tab_ge_b")[0].setAttribute("style","display:block");
    $("#tab_gong_b")[0].setAttribute("style","display:block");

    $("#tab_all")[0].removeAttribute("style","display:block");
    $("#tab_dian")[0].removeAttribute("style","display:block");
    $("#tab_ting")[0].setAttribute("style","display:block");
    $("#tab_tang")[0].removeAttribute("style","display:block");
    $("#tab_ge")[0].removeAttribute("style","display:block");
    $("#tab_gong")[0].removeAttribute("style","display:block");

    $("#line1")[0].removeAttribute("style","display:block");
    $("#line2")[0].removeAttribute("style","display:block");
    $("#line3")[0].setAttribute("style","display:block");
    $("#line4")[0].removeAttribute("style","display:block");
    $("#line5")[0].removeAttribute("style","display:block");
    $("#line6")[0].removeAttribute("style","display:block");

    $("#baohedian")[0].removeAttribute("style","display:block");
    $("#cininggong")[0].removeAttribute("style","display:block");
    $("#dafo")[0].removeAttribute("style","display:block");
    $("#fuxiting")[0].setAttribute("style","display:block");
    $("#kunninggong")[0].removeAttribute("style","display:block");
    $("#qianqinggong")[0].removeAttribute("style","display:block");
    $("#taihedian")[0].removeAttribute("style","display:block");
    $("#tirenge")[0].removeAttribute("style","display:block");
    $("#wenyuange")[0].removeAttribute("style","display:block");
    $("#zhongcuigong")[0].removeAttribute("style","display:block");
    $("#zhonghedian")[0].removeAttribute("style","display:block");

    $("#kndetail")[0].removeAttribute("style","display:block");
    $("#qqdetail")[0].removeAttribute("style","display:block");
}

function tabtangbTouch(event)
{
    $("#tab_all_b")[0].setAttribute("style","display:block");
    $("#tab_dian_b")[0].setAttribute("style","display:block");
    $("#tab_ting_b")[0].setAttribute("style","display:block");
    $("#tab_tang_b")[0].removeAttribute("style","display:block");
    $("#tab_ge_b")[0].setAttribute("style","display:block");
    $("#tab_gong_b")[0].setAttribute("style","display:block");

    $("#tab_all")[0].removeAttribute("style","display:block");
    $("#tab_dian")[0].removeAttribute("style","display:block");
    $("#tab_ting")[0].removeAttribute("style","display:block");
    $("#tab_tang")[0].setAttribute("style","display:block");
    $("#tab_ge")[0].removeAttribute("style","display:block");
    $("#tab_gong")[0].removeAttribute("style","display:block");

    $("#line1")[0].removeAttribute("style","display:block");
    $("#line2")[0].removeAttribute("style","display:block");
    $("#line3")[0].removeAttribute("style","display:block");
    $("#line4")[0].setAttribute("style","display:block");
    $("#line5")[0].removeAttribute("style","display:block");
    $("#line6")[0].removeAttribute("style","display:block");

    $("#baohedian")[0].removeAttribute("style","display:block");
    $("#cininggong")[0].removeAttribute("style","display:block");
    $("#dafo")[0].setAttribute("style","display:block");
    $("#fuxiting")[0].removeAttribute("style","display:block");
    $("#kunninggong")[0].removeAttribute("style","display:block");
    $("#qianqinggong")[0].removeAttribute("style","display:block");
    $("#taihedian")[0].removeAttribute("style","display:block");
    $("#tirenge")[0].removeAttribute("style","display:block");
    $("#wenyuange")[0].removeAttribute("style","display:block");
    $("#zhongcuigong")[0].removeAttribute("style","display:block");
    $("#zhonghedian")[0].removeAttribute("style","display:block");

    $("#kndetail")[0].removeAttribute("style","display:block");
    $("#qqdetail")[0].removeAttribute("style","display:block");
}

function tabgebTouch(event)
{
    $("#tab_all_b")[0].setAttribute("style","display:block");
    $("#tab_dian_b")[0].setAttribute("style","display:block");
    $("#tab_ting_b")[0].setAttribute("style","display:block");
    $("#tab_tang_b")[0].setAttribute("style","display:block");
    $("#tab_ge_b")[0].removeAttribute("style","display:block");
    $("#tab_gong_b")[0].setAttribute("style","display:block");

    $("#tab_all")[0].removeAttribute("style","display:block");
    $("#tab_dian")[0].removeAttribute("style","display:block");
    $("#tab_ting")[0].removeAttribute("style","display:block");
    $("#tab_tang")[0].removeAttribute("style","display:block");
    $("#tab_ge")[0].setAttribute("style","display:block");
    $("#tab_gong")[0].removeAttribute("style","display:block");

    $("#line1")[0].removeAttribute("style","display:block");
    $("#line2")[0].removeAttribute("style","display:block");
    $("#line3")[0].removeAttribute("style","display:block");
    $("#line4")[0].removeAttribute("style","display:block");
    $("#line5")[0].setAttribute("style","display:block");
    $("#line6")[0].removeAttribute("style","display:block");

    $("#baohedian")[0].removeAttribute("style","display:block");
    $("#cininggong")[0].removeAttribute("style","display:block");
    $("#dafo")[0].removeAttribute("style","display:block");
    $("#fuxiting")[0].removeAttribute("style","display:block");
    $("#kunninggong")[0].removeAttribute("style","display:block");
    $("#qianqinggong")[0].removeAttribute("style","display:block");
    $("#taihedian")[0].removeAttribute("style","display:block");
    $("#tirenge")[0].setAttribute("style","display:block");
    $("#wenyuange")[0].setAttribute("style","display:block");
    $("#zhongcuigong")[0].removeAttribute("style","display:block");
    $("#zhonghedian")[0].removeAttribute("style","display:block");

    $("#kndetail")[0].removeAttribute("style","display:block");
    $("#qqdetail")[0].removeAttribute("style","display:block");
}

function tabgongbTouch(event)
{
    $("#tab_all_b")[0].setAttribute("style","display:block");
    $("#tab_dian_b")[0].setAttribute("style","display:block");
    $("#tab_ting_b")[0].setAttribute("style","display:block");
    $("#tab_tang_b")[0].setAttribute("style","display:block");
    $("#tab_ge_b")[0].setAttribute("style","display:block");
    $("#tab_gong_b")[0].removeAttribute("style","display:block");

    $("#tab_all")[0].removeAttribute("style","display:block");
    $("#tab_dian")[0].removeAttribute("style","display:block");
    $("#tab_ting")[0].removeAttribute("style","display:block");
    $("#tab_tang")[0].removeAttribute("style","display:block");
    $("#tab_ge")[0].removeAttribute("style","display:block");
    $("#tab_gong")[0].setAttribute("style","display:block");

    $("#line1")[0].removeAttribute("style","display:block");
    $("#line2")[0].removeAttribute("style","display:block");
    $("#line3")[0].removeAttribute("style","display:block");
    $("#line4")[0].removeAttribute("style","display:block");
    $("#line5")[0].removeAttribute("style","display:block");
    $("#line6")[0].setAttribute("style","display:block");

    $("#baohedian")[0].removeAttribute("style","display:block");
    $("#cininggong")[0].setAttribute("style","display:block");
    $("#dafo")[0].removeAttribute("style","display:block");
    $("#fuxiting")[0].removeAttribute("style","display:block");
    $("#kunninggong")[0].setAttribute("style","display:block");
    $("#qianqinggong")[0].setAttribute("style","display:block");
    $("#taihedian")[0].removeAttribute("style","display:block");
    $("#tirenge")[0].removeAttribute("style","display:block");
    $("#wenyuange")[0].removeAttribute("style","display:block");
    $("#zhongcuigong")[0].setAttribute("style","display:block");
    $("#zhonghedian")[0].removeAttribute("style","display:block");

    $("#kndetail")[0].removeAttribute("style","display:block");
    $("#qqdetail")[0].removeAttribute("style","display:block");
}
function mapTouch(event)
{
    //console.log(event.changedTouches[ 0 ].pageX);
    //console.log(event.changedTouches[ 0 ].pageY);
    //taballbTouch();
    //assProgress = 1;

    if(Math.abs(event.changedTouches[ 0 ].pageX - 220)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 144) < 40)//screenX: 281, screenY: 254
    {
        $("#kndetail")[0].removeAttribute("style","display:block");
        $("#qqdetail")[0].removeAttribute("style","display:block");
        hidePage();
    }
}

function assDialogAnimation(event)
{
    if(event && Math.abs(event.changedTouches[ 0 ].pageX - 963)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 1011)< 40)
    {
        //console.log(event.changedTouches[ 0 ].pageX);
        //console.log(event.changedTouches[ 0 ].pageY);
        dialogAnimationProgress = -1;
    }
    switch(dialogAnimationProgress){
        case -1:
            assDialog();
            $("#dialogAnimation")[0].removeAttribute("style", "display:block");
            bgaudio = document.getElementById('audio');
            bgaudio.play();
            break;
        case 0:
            $("#dialogAnimation")[0].setAttribute("style","display:block");
            bgaudio.pause();
            dialogAnimationProgress = 1;
            assDialog();
            break;
        case 1:
            dialogAnimationProgress = 2;
            assDialog();
            break;
        case 2:
            dialogAnimationProgress = 3;
            assDialog();
            break;
        case 3:
            dialogAnimationProgress = 4;
            assDialog();
            break;
        case 4:
            dialogAnimationProgress = 5;
            assDialog();
            break;
        case 5:
            dialogAnimationProgress = 6;
            assDialog();
            break;
        case 6:
            dialogAnimationProgress = 7;
            assDialog();
            break;
        case 7:
            dialogAnimationProgress = -1;
            assDialog();
            $("#dialogAnimation")[0].removeAttribute("style", "display:block");
            bgaudio.play();
            break;
        default:
            break;
    }
}

function assDialog()
{
    for(var i = 1; i <= 7; i++)
    {
        if(i != dialogAnimationProgress)
        {
            $("#dia"+i)[0].removeAttribute("style", "display:block");
            var audio = $("#diam"+i)[0];
            audio.pause();
            audio.currentTime = 0;
        }
        else
        {
            $("#dia"+i)[0].setAttribute("style", "display:block");
            var audio = $("#diam"+i)[0];
            audio.play();
        }
    }
}

function assbtn0touch(event)
{
    //console.log("ass btn 0");
    switch (assProgress){
        case undefined:
            assProgress = 0;
            showAssProgress();
            break;
        case 0:
            assProgress = 1;
            showAssProgress();
            break;
        case 4:
            assProgress = 5;
            showAssProgress();
            $("#assmask")[0].setAttribute("style","opacity:0; display:block");
            $("#taskreward")[0].setAttribute("style","top:-300px;display:block");
            $("#taskrewardbg")[0].setAttribute("style","top:-400px;display:block");
            $("#assmask").animate({"opacity":"0.4"}, 200);
            $("#taskreward").animate({"top":"400"}, 200);
            $("#taskrewardbg").animate({"top":"300"}, 200, function(){
                scene.add(userText["assred"]);
            });
            break;
    }
}

function ass0touch(event){
    //console.log(event.changedTouches[ 0 ].pageX);
    //console.log(event.changedTouches[ 0 ].pageY);

    if(Math.abs(event.changedTouches[ 0 ].pageX - 230)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 220) < 40)//screenX: 281, screenY: 254
    {
        if(!bgaudio || bgaudio.paused)
        {
            bgaudio = document.getElementById('audio');
            bgaudio.play();
        }
        hidePage();
    }
    else if(Math.abs(event.changedTouches[ 0 ].pageX - 344)< 30 && Math.abs(event.changedTouches[ 0 ].pageY - 397) < 30)
    {
        console.log("start play animation");
        dialogAnimationProgress = 0;
        assDialogAnimation();
        //$("");
    }
}

function xinwenpagetouch(event){
    if(Math.abs(event.changedTouches[ 0 ].pageX - 220)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 200) < 40)//screenX: 281, screenY: 254
    {
        hidePage();
    }
}

function zlviewtouch(event){
    if(Math.abs(event.changedTouches[ 0 ].pageX - 220)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 200) < 40)//screenX: 281, screenY: 254
    {
        hidePage();
    }
    else{
        $("#zlview")[0].setAttribute("style","display:none");
        $("#zldetail")[0].setAttribute("style","display:block");
        $("#gotoar")[0].setAttribute("style","display:block");
    }
}
function gotoartouch(event)
{
    console.log("open camera");
}
function zldetailtouch(event)
{
    if(Math.abs(event.changedTouches[ 0 ].pageX -220)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 200) < 40)//screenX: 281, screenY: 254
    {
        $("#gotoar")[0].removeAttribute("style","display:block");
        $("#zldetail")[0].removeAttribute("style","display:block");
        $("#zlview")[0].setAttribute("style","display:block");
    }
}
function cpviewtouch(event){
    //console.log(event);
    if(Math.abs(event.changedTouches[ 0 ].pageX - 220)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 200) < 40)//screenX: 281, screenY: 254
    {
        hidePage();
    }
    else{
        $("#cangpin #cpview")[0].setAttribute("style","display:none");
        $("#cangpin #cpdetail")[0].setAttribute("style","display:block");
    }
}

function cpdetailtouch(event){
    if(Math.abs(event.changedTouches[ 0 ].pageX -220)< 40 && Math.abs(event.changedTouches[ 0 ].pageY - 200) < 40)//screenX: 281, screenY: 254
    {
        $("#cangpin #cpdetail")[0].setAttribute("style","display:none");
        $("#cangpin #cpview")[0].setAttribute("style","display:block");
    }
}

//var lastScreenY = 0;
function cpdetailtouchstart(event){
    lastScreenY =event.touches[ 0 ].screenY;
    //console.log("start    "+event.touches[ 0 ].screenX);
}

function cpdetailtouchmove(event){
    //console.log(event);

    if ( event.touches.length == 1 ) {
        event.preventDefault();
        var nowtop = parseInt($("#cangpin #cpdetail img").css("top").split("p")[0]);
        var nexttops = nowtop + (event.touches[ 0 ].screenY - lastScreenY)*1;
        if(nexttops > 0){
            nexttops = 0;
        }
        else if(nexttops < -580){
            nexttops = -580;
        }
        var nexttopstr = nexttops + "px";
        lastScreenY = event.touches[ 0 ].screenY;
        //console.log(nowtop);
        //console.log(nexttops);
        //console.log(nexttopstr);
        //console.log(event.touches[ 0 ].screenX);
        $("#cangpin #cpdetail img").css("top", nexttopstr);
        //console.log($("#cangpin #cpdetail img").css("top"));
    }
}
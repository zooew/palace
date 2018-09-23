/**
 * Created by waqth on 2017/4/14.
 */

var raycaster = new THREE.Raycaster();
var intersects;
var mouse = new THREE.Vector2();
var closest_distance;

function showAssProgress(){
    switch (assProgress){
        case undefined:
            assProgress = 0;
            break;
        case -9:
            assingbtn();
            var hint1 = document.getElementById("hint1");
            hint1.setAttribute("style","display:block");
            var hint2 = document.getElementById("hint2");
            hint2.setAttribute("style","display:block");
            var assp1 = document.getElementById("ass1");
            assp1.removeAttribute("style","display:block");
            var assp2 = document.getElementById("ass2");
            assp2.setAttribute("style","display:block");
            var assp3 = document.getElementById("ass3");
            assp3.removeAttribute("style","display:block");
            $("#taskfailstamp")[0].setAttribute("style","display:block");
            $("#gotojs3")[0].removeAttribute("style","display:block");
            assProgress = 0;
            break;
        case 0:
            $("#taskfailstamp")[0].removeAttribute("style","display:block");
            $("#gotojs3")[0].removeAttribute("style","display:block");
            assstartbtn();
            break;
        case 1://part1
            assingbtn();
            var hint1 = document.getElementById("hint1");
            hint1.setAttribute("style","display:block");
            var hint2 = document.getElementById("hint2");
            hint2.removeAttribute("style","display:block");
            var assp1 = document.getElementById("ass1");
            assp1.removeAttribute("style","display:block");
            var assp2 = document.getElementById("ass2");
            assp2.removeAttribute("style","display:block");
            var assp3 = document.getElementById("ass3");
            assp3.removeAttribute("style","display:block");
            $("#gotojs3")[0].removeAttribute("style","display:block");
            break;
        case 2://part1 done, part2
            assingbtn();
            var hint1 = document.getElementById("hint1");
            hint1.setAttribute("style","display:block");
            var hint2 = document.getElementById("hint2");
            hint2.setAttribute("style","display:block");
            var assp1 = document.getElementById("ass1");
            assp1.setAttribute("style","display:block");
            var assp2 = document.getElementById("ass2");
            assp2.removeAttribute("style","display:block");
            var assp3 = document.getElementById("ass3");
            assp3.removeAttribute("style","display:block");
            $("#gotojs3")[0].removeAttribute("style","display:block");
            break;
        case 3://part2 done, part3
            assingbtn();
            var hint1 = document.getElementById("hint1");
            hint1.setAttribute("style","display:block");
            var hint2 = document.getElementById("hint2");
            hint2.setAttribute("style","display:block");
            var assp1 = document.getElementById("ass1");
            assp1.removeAttribute("style","display:block");
            var assp2 = document.getElementById("ass2");
            assp2.setAttribute("style","display:block");
            var assp3 = document.getElementById("ass3");
            assp3.removeAttribute("style","display:block");
            $("#gotojs3")[0].setAttribute("style","display:block");
            break;
        case 4:
            assdonebtn();
            var hint1 = document.getElementById("hint1");
            hint1.setAttribute("style","display:block");
            var hint2 = document.getElementById("hint2");
            hint2.setAttribute("style","display:block");
            var assp1 = document.getElementById("ass1");
            assp1.removeAttribute("style","display:block");
            var assp2 = document.getElementById("ass2");
            assp2.removeAttribute("style","display:block");
            var assp3 = document.getElementById("ass3");
            assp3.setAttribute("style","display:block");
            $("#gotojs3")[0].removeAttribute("style","display:block");
            break;
        case 5:
            var hint1 = document.getElementById("hint1");
            hint1.setAttribute("style","display:block");
            var hint2 = document.getElementById("hint2");
            hint2.setAttribute("style","display:block");
            var assp1 = document.getElementById("ass1");
            assp1.removeAttribute("style","display:block");
            var assp2 = document.getElementById("ass2");
            assp2.removeAttribute("style","display:block");
            var assp3 = document.getElementById("ass3");
            assp3.setAttribute("style","display:block");
            $("#gotojs3")[0].removeAttribute("style","display:block");
            assrewardget();
            assProgress = 0;
            break;
        default:
            break;
    }
}
function assstartbtn(){
    var assp1 = document.getElementById("ass1");
    assp1.removeAttribute("style","display:block");
    var assp2 = document.getElementById("ass2");
    assp2.removeAttribute("style","display:block");
    var assp3 = document.getElementById("ass3");
    assp3.removeAttribute("style","display:block");

    var hint1 = document.getElementById("hint1");
    hint1.removeAttribute("style","display:block");
    var hint2 = document.getElementById("hint2");
    hint2.removeAttribute("style","display:block");

    var btn0 = document.getElementById("assbtn0");
    btn0.setAttribute("style","display:block");
    var btn1 = document.getElementById("assbtn1");
    btn1.removeAttribute("style","display:block");
    var btntext0 = document.getElementById("assbtntext0");
    btntext0.setAttribute("style","display:block");
    var btntext1 = document.getElementById("assbtntext1");
    btntext1.removeAttribute("style","display:block");
    var btntext2 = document.getElementById("assbtntext2");
    btntext2.removeAttribute("style","display:block");
}
function assingbtn(){
    var btn0 = document.getElementById("assbtn0");
    btn0.removeAttribute("style","display:block");
    var btn1 = document.getElementById("assbtn1");
    btn1.setAttribute("style","display:block");
    var btntext0 = document.getElementById("assbtntext0");
    btntext0.removeAttribute("style","display:block");
    var btntext1 = document.getElementById("assbtntext1");
    btntext1.setAttribute("style","display:block");
    var btntext2 = document.getElementById("assbtntext2");
    btntext2.removeAttribute("style","display:block");
}
function assdonebtn(){
    var btn0 = document.getElementById("assbtn0");
    btn0.setAttribute("style","display:block");
    var btn1 = document.getElementById("assbtn1");
    btn1.removeAttribute("style","display:block");
    var btntext0 = document.getElementById("assbtntext0");
    btntext0.removeAttribute("style","display:block");
    var btntext1 = document.getElementById("assbtntext1");
    btntext1.setAttribute("style","display:block");
    var btntext2 = document.getElementById("assbtntext2");
    btntext2.removeAttribute("style","display:block");
}
function assrewardget()
{
    var btntext0 = document.getElementById("assbtntext0");
    btntext0.removeAttribute("style","display:block");
    var btntext1 = document.getElementById("assbtntext1");
    btntext1.removeAttribute("style","display:block");
    var btntext2 = document.getElementById("assbtntext2");
    btntext2.setAttribute("style","display:block");
    var btn0 = document.getElementById("assbtn0");
    btn0.removeAttribute("style","display:block");
    var btn1 = document.getElementById("assbtn1");
    btn1.setAttribute("style","display:block");
}

var touch_timer = 0;
function onDocumentTouchStart( event ) {
    /*
    chargingFlag = true;
    var thunderaudio = document.getElementById('thunderaudio');
    thunderaudio.play();
    updateUI();
    setTimeout("stopThunder()",500);//12 frames
    */
    if(Status && Status > 0)
    {
        return;
    }
    console.log("touch start");
    if ( event.touches.length == 1 ) {
        console.log("one touch");
        event.preventDefault();

        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

        /*
        mouse.x = ( event.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.touches[ 0 ].pageY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );*/


    }
    else if(event.touches.length == 2) {
        event.preventDefault();
        console.log("double touch");
        //startWindBlow();
        if(!document.webkitIsFullScreen)
        {
            document.documentElement.webkitRequestFullScreen();
        }
        else
        {
            document.webkitExitFullscreen();
        }
    }
    else if(event.touches.length == 3)
    {
        //startthunder();
    }

    if(touch_timer == 0){
        touch_timer = 1;
        touch_timer == setTimeout(function(){touch_timer = 0;}, 600);
    }
    else {
        touch_timer = 0;
        if(!document.webkitIsFullScreen)
        {
            document.documentElement.webkitRequestFullScreen();
        }
        else
        {
            document.webkitExitFullscreen();
        }
    }
}

function onDocumentTouchMove( event ) {
    if(Status && Status > 0)
    {
        return;
    }
    console.log("touch move");
    touchMoveFlag = true;
    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
    }

}

function onDocumentTouchEnd( event )
{
    if(Status && Status > 0)
    {
        switch(Status){
            case 1:
                hidePage();
                return;
            case 2:
                //hidePage();
                return;
            default:
                return;
        }
    }
    console.log("touch end");
    targetRotation = palace.rotation.z;
    touchMoveFlag = false;

    /*
    mouse.x = ( event.touches[ 0 ].pageX / windowWidth ) * 2 - 1;
    mouse.y = - ( event.touches[ 0 ].pageY / windowHeight ) * 2 + 1;
    */

    mouse.x = ( event.changedTouches[ 0 ].pageX / windowWidth ) * 2 - 1;
    mouse.y = - ( event.changedTouches[ 0 ].pageY / windowHeight ) * 2 + 1;

    //console.log(mouse);
    raycaster.setFromCamera( mouse, camera );
    //console.log(camera);

    closest_distance = Infinity;
    intersects = raycaster.intersectObject( scene, true);
    if(intersects.length > 0)
    {
        closest_distance = intersects[0].distance;
    }
    else
    {
        return;
    }

    //xinwen
    intersects = raycaster.intersectObject( palacesArray["xinwen"], true);
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5) {
        var birdaudio = document.getElementById('birdaudio');
        birdaudio.play();
        //var clickaudio = document.getElementById('clickaudio');
        //clickaudio.play();
        console.log("bird");
        if(birdObj)
        {
            //console.log(intersects[0].point);
            birdObj.position.set(intersects[0].point.x - 0.2, intersects[0].point.y + 0.1 , intersects[0].point.z + 0.3);
            var flyL2R = new TWEEN.Tween(birdObj.position).to({
                "x" : intersects[0].point.x,
                "y" : intersects[0].point.y,
                "z" : intersects[0].point.z + 0.1}, 125);
            var flyR2L = new TWEEN.Tween(birdObj.position)
                .to({"x" : intersects[0].point.x + 0.4,
                    "y" : intersects[0].point.y + 0.3,
                    "z" : intersects[0].point.z + 0.3}, 225);
            flyR2L.onComplete(function(){
                scene.remove(birdObj);
            });
            flyL2R.chain(flyR2L);
            scene.add(birdObj);
            flyL2R.start();
        }
        setTimeout("showPage('xinwen')", 400);
    }
    //bird
    intersects = raycaster.intersectObject( gujianUnion, true);
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5) {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        //console.log("gujian");
        var tween10 = new TWEEN.Tween(palaceGujianArray[1].position)
            .to({"x" : 0, "y" : 0, "z": 300}, 500) //100
            .easing(TWEEN.Easing.Exponential.Out);
        var tween11 = new TWEEN.Tween(palaceGujianArray[1].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween11.delay(200);
        tween10.chain(tween11);
        var tween20 = new TWEEN.Tween(palaceGujianArray[2].position)
            .to({"x" : 0, "y" : 0, "z": 300}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        var tween21 = new TWEEN.Tween(palaceGujianArray[2].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween21.delay(200);
        tween20.chain(tween21);
        var tween30 = new TWEEN.Tween(palaceGujianArray[3].position)
            .to({"x" : -140, "y" : 0, "z": 0}, 500) //300
            .easing(TWEEN.Easing.Exponential.Out);
        var tween31 = new TWEEN.Tween(palaceGujianArray[3].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween31.delay(200);
        tween30.chain(tween31);
        var tween40 = new TWEEN.Tween(palaceGujianArray[4].position)
            .to({"x" : 140, "y" : 0, "z": 0}, 500) //300
            .easing(TWEEN.Easing.Exponential.Out);
        var tween41 = new TWEEN.Tween(palaceGujianArray[4].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween41.delay(200);
        tween40.chain(tween41);
        var tween50 = new TWEEN.Tween(palaceGujianArray[5].position)
            .to({"x" : 0, "y" : 0, "z": 200}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        var tween51 = new TWEEN.Tween(palaceGujianArray[5].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween51.delay(200);
        tween50.chain(tween51);
        var tween60 = new TWEEN.Tween(palaceGujianArray[6].position)
            .to({"x" : 200, "y" : 0, "z": 300}, 500)//450
            .easing(TWEEN.Easing.Exponential.Out);
        var tween61 = new TWEEN.Tween(palaceGujianArray[6].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween61.delay(200);
        tween60.chain(tween61);
        var tween70 = new TWEEN.Tween(palaceGujianArray[7].position)
            .to({"x" : 0, "y" : 0, "z": 350}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        var tween71 = new TWEEN.Tween(palaceGujianArray[7].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween71.delay(200);
        tween70.chain(tween71);
        var tween80 = new TWEEN.Tween(palaceGujianArray[8].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)//-250
            .easing(TWEEN.Easing.Exponential.Out);
        var tween81 = new TWEEN.Tween(palaceGujianArray[8].position)
            .to({"x" : 0, "y" : 0, "z": 0}, 500)
            .easing(TWEEN.Easing.Exponential.Out);
        tween81.delay(200);
        tween80.chain(tween81);
        tween10.start();
        tween20.start();
        tween30.start();
        tween40.start();
        tween50.start();
        tween60.start();
        tween70.start();
        tween80.start();
        setTimeout("showPage('gujian')", 500);
    }
    //shiting
    intersects = raycaster.intersectObject( shitingUnion, true);
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5) {
        console.log("shiting");
        var stween20 = new TWEEN.Tween(pshiting2.rotation)
            .to({"x": 0.7, "y":0, "z": 0}, 150);
        stween20.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween21 = new TWEEN.Tween(pshiting2.rotation)
        stween21.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": -0.7, "y":0, "z": 0}, 300);
        var stween22 = new TWEEN.Tween(pshiting2.rotation)
        stween22.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween20.chain(stween21);
        stween21.chain(stween22);
        //stween22.chain(stween20);

        var stween20s = new TWEEN.Tween(pshiting2.rotation)
            .to({"x": 0.5, "y":0, "z": 0}, 150);
        stween20s.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween21s = new TWEEN.Tween(pshiting2.rotation)
        stween21s.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": -0.5, "y":0, "z": 0}, 300);
        var stween22s = new TWEEN.Tween(pshiting2.rotation)
        stween22s.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween20s.chain(stween21s);
        stween21s.chain(stween22s);
        stween22.chain(stween20s);

        var stween20ss = new TWEEN.Tween(pshiting2.rotation)
            .to({"x": 0.3, "y":0, "z": 0}, 150);
        stween20ss.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween21ss = new TWEEN.Tween(pshiting2.rotation)
        stween21ss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": -0.3, "y":0, "z": 0}, 300);
        var stween22ss = new TWEEN.Tween(pshiting2.rotation)
        stween22ss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween20ss.chain(stween21ss);
        stween21ss.chain(stween22ss);
        stween22s.chain(stween20ss);

        var stween20sss = new TWEEN.Tween(pshiting2.rotation)
            .to({"x": 0.1, "y":0, "z": 0}, 150);
        stween20sss.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween21sss = new TWEEN.Tween(pshiting2.rotation)
        stween21sss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": -0.1, "y":0, "z": 0}, 300);
        var stween22sss = new TWEEN.Tween(pshiting2.rotation)
        stween22sss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween20sss.chain(stween21sss);
        stween21sss.chain(stween22sss);
        stween22ss.chain(stween20sss);
        stween20sss.repeat(2);

        var stween30 = new TWEEN.Tween(pshiting3.rotation)
            .to({"x": -0.7, "y":0, "z": 0}, 150);
        stween30.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween31 = new TWEEN.Tween(pshiting3.rotation)
        stween31.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0.7, "y":0, "z": 0}, 300);
        var stween32 = new TWEEN.Tween(pshiting3.rotation)
        stween32.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween30.chain(stween31);
        stween31.chain(stween32);

        var stween30s = new TWEEN.Tween(pshiting3.rotation)
            .to({"x": -0.5, "y":0, "z": 0}, 150);
        stween30s.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween31s = new TWEEN.Tween(pshiting3.rotation)
        stween31s.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0.5, "y":0, "z": 0}, 300);
        var stween32s = new TWEEN.Tween(pshiting3.rotation)
        stween32s.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween30s.chain(stween31s);
        stween31s.chain(stween32s);
        stween32.chain(stween30s);

        var stween30ss = new TWEEN.Tween(pshiting3.rotation)
            .to({"x": -0.3, "y":0, "z": 0}, 150);
        stween30ss.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween31ss = new TWEEN.Tween(pshiting3.rotation)
        stween31ss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0.3, "y":0, "z": 0}, 300);
        var stween32ss = new TWEEN.Tween(pshiting3.rotation)
        stween32ss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween30ss.chain(stween31ss);
        stween31ss.chain(stween32ss);
        stween32s.chain(stween30ss);

        var stween30sss = new TWEEN.Tween(pshiting3.rotation)
            .to({"x": -0.1, "y":0, "z": 0}, 150);
        stween30sss.easing(TWEEN.Easing.Sinusoidal.Out)
        var stween31sss = new TWEEN.Tween(pshiting3.rotation)
        stween31sss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0.1, "y":0, "z": 0}, 300);
        var stween32sss = new TWEEN.Tween(pshiting3.rotation)
        stween32sss.easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({"x": 0, "y":0, "z": 0}, 150);
        stween30sss.chain(stween31sss);
        stween31sss.chain(stween32sss);
        stween32ss.chain(stween30sss);
        stween30sss.repeat(2);
        /*
         var stween30ssss = new TWEEN.Tween(pshiting3.rotation)
         .to({"x": -0.1, "y":0, "z": 0}, 150);
         stween30ssss.easing(TWEEN.Easing.Sinusoidal.Out)
         var stween31ssss = new TWEEN.Tween(pshiting3.rotation)
         stween31ssss.easing(TWEEN.Easing.Sinusoidal.InOut)
         .to({"x": 0.1, "y":0, "z": 0}, 300);
         var stween32ssss = new TWEEN.Tween(pshiting3.rotation)
         stween32ssss.easing(TWEEN.Easing.Sinusoidal.InOut)
         .to({"x": 0, "y":0, "z": 0}, 150);
         stween30ssss.chain(stween31ssss);
         stween31ssss.chain(stween32ssss);
         stween32sss.chain(stween30ssss);*/

        //stween32.chain(stween30);
        var bellaudio = document.getElementById('bellaudio');
        bellaudio.play();
        stween20.start();
        stween30.start();

        setTimeout('startWait()', 1000);
    }
    //timeline
    intersects = raycaster.intersectObject( userText["ddate"],true);
    if(DayOrNight && intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5){
        showPage("timeline");
    }
    intersects = raycaster.intersectObject( userText["ndate"],true);
    if(!DayOrNight && intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5){
        showPage("timeline");
    }
    //assignment
    intersects = raycaster.intersectObject( userText["dassignment"],true);
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        //console.log("click");
        if(assProgress &&(assProgress == -9))
        {
            //assProgress = 0;
            scene.add(userText["assred"]);
        }
        else
        {
            scene.remove(userText["assred"]);
        }
        showPage("assignment");
    }
    intersects = raycaster.intersectObject( userText["nassignment"],true);
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        if(assProgress &&(assProgress == -9))
        {
            //assProgress = 0;
            scene.add(userText["assred"]);
        }
        else
        {
            scene.remove(userText["assred"]);
        }
        showPage("assignment");
    }

    intersects = raycaster.intersectObject(palacesArray["guanzhongfuwu"], true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        startWait();
    }
    intersects = raycaster.intersectObject(palacesArray["tushu"], true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        startWait();
    }
    intersects = raycaster.intersectObject(palacesArray["wenchuang"], true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        startWait();
    }
    intersects = raycaster.intersectObject(palacesArray["xuanjiao"], true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        startWait();
    }
    intersects = raycaster.intersectObject(palacesArray["xueshu"], true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        startWait();
    }
    intersects = raycaster.intersectObject(palacesArray["youxi"], true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        startWait();
    }
    intersects = raycaster.intersectObject(palacesArray["zhanlan"], true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        showPage("zhanlan");
    }
    intersects = raycaster.intersectObject(palaceCangpin, true)
    if(intersects.length > 0 && (intersects[0].distance - closest_distance) <= 0.5)
    {
        var clickaudio = document.getElementById('clickaudio');
        clickaudio.play();
        console.log("cangpin");
        showPage("cangpin");
    }
}

function onDocumentDbClick(event){
    console.log("double click");
    event.preventDefault();
    if(!document.webkitIsFullScreen)
    {
        document.documentElement.webkitRequestFullScreen();
    }
    else
    {
        document.webkitExitFullscreen();
    }
}

setInterval(function(){ checkTriggers();}, 3000);
function checkTriggers(){
    var nowseconds = new Date().getSeconds();
    if(nowseconds % 30 < 15) {
        DayOrNight = false;
    }
    else
    {
        DayOrNight = true;
        //DayOrNight = false;
    }

    updateUI();

/*
     var nowHour = new Date().getHours();
     console.log(nowHour);
     if(nowtime >= 7 && nowtime < 19)
    {
        DayOrNight = true;
     }
     else
    {
        DayOrNight = false;
    }*/
}


function onDeviceOrientation(event){
    //var alpha = event.alpha;//手机平放0，平面逆时针旋转0-360-0
    //var beta = event.beta;//手机垂直90，平面朝下旋转90-180(水平，屏幕朝地)/(-180)-(-90)(倒立)-0(水平屏幕朝上)-90
    //var gamma = event.gamma;//手机平放0，左旋转-90，右旋转90，旋转一圈0(水平)-90/(-90)(垂直地面）-0-90/(-90)(垂直地面）-0
    //scene.remove(shitingUnion);
}

function startthunder(){
    chargingFlag = true;
    var thunderaudio = document.getElementById('thunderaudio');
    thunderaudio.play();
    updateUI();
    setTimeout("stopThunder()",500);//12 frames
}
battery.then(function(battery) {
    //batteryIsCharging = battery.charging;

    battery.addEventListener('chargingchange', function() {
        console.warn("电池充电状态变化: ", battery.charging);

        if(battery.charging)
        {
            chargingFlag = battery.charging;
            updateUI();
            setTimeout("stopThunder()",500);//12 frames
        }
    });
});

function stopThunder(){
    chargingFlag = false;
    updateUI();
}

window.addEventListener("DOMContentLoaded", function() {
    // 获取元素
    /*var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { "audio": true },
        errBack = function(error) {
            console.log("Video capture error: ", error.code);
        };

    // 设置video监听器
    if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
            //video.src = stream;
           // video.play();
            scene.remove(palace);
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream){
            //video.src = window.webkitURL.createObjectURL(stream);
            //video.play();
            scene.remove(palace);
            scene.remove(gujianUnion);

        }, errBack);
    }

    window.AudioContext = window.AudioContext ||
        window.webkitAudioContext;

    var context = new AudioContext();

    function onSuccess(stream) {
        var audioInput = context.createMediaStreamSource(stream);
        audioInput.connect(context.destination);
        console.log(stream);
    }

    function onError(error) {
        //var audioInput = context.createMediaStreamSource(stream);
        //audioInput.connect(context.destination);
        console.log(error);
    }
    navigator.webkitGetUserMedia({audio:true}, onSuccess, onError);*/
}, false);

function showPage(id)
{
    switch(id){
        case "timeline":
            Status = 1;
            break;
        case "cangpin":
            Status = 2;
            break;
        case "assignment":
            Status = 3;
            showAssProgress();
            break;
        case "gujian":
            Status = 4;
            taballbTouch();
            break;
        case "jiesuo3":
            Status = 5;
            showjiesuo3();
            break;
        case "xinwen":
            Status = 6;
            break;
        case "zhanlan":
            Status = 7;
            break;
        case "wait":
            Status = 8;
            break;
        default:
            Status = 0;
            break;
    }

    $("#firstMask")[0].setAttribute("style","display:block;opacity:0");
    $("#firstMask").animate({'opacity':'1'},300);

    $("#"+id)[0].setAttribute("style","display:block;margin-top:1366px");//top:1366px
    $("#"+id).animate({'margin-top':'0px'},300);

    if(Status > 0)
    {
        cancelAnimationFrame(frameID);
    }
}

function hidePage()
{
    var id;
    if(Status && Status > 0){
        switch (Status){
            case 1:
                id = "timeline";
                break;
            case 2:
                id = "cangpin";
                break;
            case 3:
                id = "assignment";
                break;
            case 4:
                id = "gujian";
                hideknpage();
                hideqqpage();
                break;
            case 5:
                id = "jiesuo3";
                break;
            case 6:
            id = "xinwen";
            break;
            case 7:
                id = "zhanlan";
                break;
            case 8:
                id = "wait";
                break;
            default:
                break;
        }
    }
    if(id){
        if(!assProgress || assProgress == 0){
            scene.add(userText["assred"]);
        }
        //var mask = document.getElementById("firstMask");
        $("#firstMask").animate({'opacity':'0'},300,function(){
            $("#firstMask")[0].removeAttribute("style","display:block");
        });
        //var nowpage = document.getElementById(id);
        $("#"+id).animate({'margin-top':'1366'},300,function(){
            $("#"+id)[0].removeAttribute("style","display:block");
            Status = 0;
            if(frameID != undefined){
                requestAnimationFrame(animate);
            }
        });
        Status = 0;
    }

}

function prehideOnePage(sstatus)
{
    var id;
    if(sstatus && sstatus > 0){
        switch (sstatus){
            case 1:
                id = "timeline";
                break;
            case 2:
                id = "cangpin";
                break;
            case 3:
                id = "assignment";
                break;
            case 4:
                id = "gujian";
                hideknpage();
                hideqqpage();
                break;
            case 5:
                id = "jiesuo3";
                break;
            case 6:
                id = "xinwen";
                break;
            case 7:
                id = "zhanlan";
                break;
            case 8:
                id = "wait";
                break;
            default:
                break;
        }
    }
    if(id){
        if(!assProgress || assProgress == 0){
            scene.add(userText["assred"]);
        }

        //$("#firstMask")[0].removeAttribute("style","display:block");
        $("#"+id)[0].setAttribute("style","position:absolute;left:0px;top:0px;");
    }
}

function hideOnePage(sstatus)
{
    var id;
    if(sstatus && sstatus > 0){
        switch (sstatus){
            case 1:
                id = "timeline";
                break;
            case 2:
                id = "cangpin";
                break;
            case 3:
                id = "assignment";
                break;
            case 4:
                id = "gujian";
                hideknpage();
                hideqqpage();
                break;
            case 5:
                id = "jiesuo3";
                break;
            case 6:
                id = "xinwen";
                break;
            case 7:
                id = "zhanlan";
                break;
            case 8:
                id = "wait";
                break;
            default:
                break;
        }
    }
    if(id){
        if(!assProgress || assProgress == 0){
            scene.add(userText["assred"]);
        }

        //$("#firstMask")[0].removeAttribute("style","display:block");
        //$("#"+id)[0].removeAttribute("style","display:block");
        $("#"+id)[0].removeAttribute("style","position:absolute;left:0px;top:0px;");
        $("#"+id)[0].removeAttribute("style","display:block");
    }
}


function startWindBlow()
{
    for(var i = 0; i < 12; i++)
    {
        cloudAnimation[CloudName[i]].stop();
    }

    for(var i = 0; i < 12; i++)
    {
        var mmesh = Cloud[CloudName[i]];
        if(i%2 == 0)
        {
            var tween_float_right_to_left = new TWEEN.Tween( mmesh.position ).to( {
                x: -1.6,
                y: mmesh.position.y,
                z: mmesh.position.z }, 3000 );
            tween_float_right_to_left.easing(TWEEN.Easing.Exponential.Out);
            tween_float_right_to_left.start();
        }
        else
        {
            var tween_float_left_to_right = new TWEEN.Tween( mmesh.position ).to( {
                x:  1.6,
                y: mmesh.position.y,
                z: mmesh.position.z }, 3000);
            tween_float_left_to_right.easing(TWEEN.Easing.Exponential.Out);
            tween_float_left_to_right.start();
        }

    }

    setTimeout("endWindBlow()", 2000);
}
function endWindBlow()
{
    for(var i = 0; i < 12; i++)
    {
        cloudAnimation[CloudName[i]].start();
    }
}

function startWait()
{
    if(waitPlane)
    {
        //waitPlane.position.set(0,1.6,0);
        waitPlane.material.opacity = 0;

        var waittween = new TWEEN.Tween(waitPlane.material).to({
            opacity:1.4
        }, 300);
        //waittween.easing(TWEEN.Easing.Exponential.In);
        scene.add(waitPlane);
        waittween.start();
        setTimeout("endWait()", 2000);
    }

}

function endWait()
{
    var waittween = new TWEEN.Tween(waitPlane.material).to({
        opacity:0
    }, 300).onComplete(function(){
        scene.remove(waitPlane);
    });
    waittween.start();
}
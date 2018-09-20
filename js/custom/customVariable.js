/**
 * Created by waqth on 2017/4/18.
 */
var container, stats;
var frameID;


var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var windowHalfX = windowWidth / 2;
var windowHalfY = windowHeight / 2;

var camera, scene, renderer;

var myDate = new Date();
var DayOrNight; //true for day, false for night
var nowtime = myDate.getHours();
if(nowtime >= 7 && nowtime < 19)
{
    DayOrNight = true;
}
else
{
    DayOrNight = false;
}
var bg_day = new THREE.TextureLoader().load( "./image/bg_daytime.png" );
var bg_night = new THREE.TextureLoader().load( "./image/bg_night.png" );

var touchMoveFlag = false;

var palace;
var palacesArray = {};
var moun_scale = 0.015;//0.015
var palace_scale = 0.015;//0.015
var palaceNames = ["guanzhongfuwu", "tushu", "wenchuang", "xinwen", "xuanjiao", "xueshu", "youxi", "zhanlan"];
var palaceGujian;
var palaceGujianArray = new Array(9, new THREE.Object3D());
var gujian_scale = 0.001;
var gujianFloat = new Array(2);
var gujianUnion = new THREE.Group();
var palaceCangpin;
var cangpin_scale = 0.001;
var cangpinFloat = new Array(2);
var cangpinUnion = new THREE.Group();
var palaceShiting, pshiting1, pshiting2, pshiting3;
var shiting_scale = 0.001;//0.001
var shitingFloat = new Array(3);
var shitingUnion = new THREE.Group();

var circleRadius = 2.6 / Math.sqrt(3);
var rightX = 1.3;
var leftX = -rightX;
var frontZ = -4 + circleRadius;
var backZ = -4 - circleRadius;
var leftZ = -4 - circleRadius * 0.5;
var rightZ = leftZ;

var CloudName = ["dcloud_left_bottom", "dcloud_left_middle", "dcloud_left_top",
                 "dcloud_right_bottom", "dcloud_right_middle", "dcloud_right_top",
                 "ncloud_left_bottom", "ncloud_left_middle", "ncloud_left_top",
                 "ncloud_right_bottom", "ncloud_right_middle", "ncloud_right_top"];
var Cloud = {};
var CloudStartPosition = {    "dcloud_left_bottom" : [ -0.8, -1.3, 0],
                              "dcloud_left_middle" : [-1.3, -0.4, 0],
                              "dcloud_left_top" : [-0.8, 1, 0 ],
                              "dcloud_right_bottom" : [ 1, -1.1, 0 ],
                              "dcloud_right_middle" : [ 0.8, 0.4, 0 ],
                              "dcloud_right_top" : [ 0.3, 1.4, 0 ],
                              "ncloud_left_bottom": [ -0.8, -1.3, 0],
                              "ncloud_left_middle" : [-1.3, -0.4, 0],
                              "ncloud_left_top" : [-0.6, 1, 0 ],
                              "ncloud_right_bottom" : [ 1, -1.1, 0 ],
                              "ncloud_right_middle" : [ 0.8, 0.4, 0 ],
                              "ncloud_right_top" : [ 0.4, 1.23, 0 ]
                         };
var CloudScale = {
    "dcloud_left_bottom" : 0.005,
    "dcloud_left_middle" : 0.4,
    "dcloud_left_top" : 0.34,
    "dcloud_right_bottom" : 0.4,
    "dcloud_right_middle" : 0.4,
    "dcloud_right_top" : 0.4,
    "ncloud_left_bottom": 0.4,
    "ncloud_left_middle" : 0.4,
    "ncloud_left_top" : 0.1,
    "ncloud_right_bottom" : 0.4,
    "ncloud_right_middle" : 0.4,
    "ncloud_right_top" : 0.1
};
var cloudAnimation;
var mengbanObj;
var mbscale = 2.5;//2.7
var mbpos = [0, -3.5, -7];//0, -2.5, -7

var moonstarObj = {};
var msname = ["moon",
              "star_left",
              "star_middle",
              "star_right",
              "ncloud_fix"];
var moonpos = {
    "moon":[-1.4,2.75,-6],
    "star_left":[-1.5,0.9,-6],
    "star_middle":[1.1,1.4,-6],
    "star_right":[1.8,2,-6],
    "ncloud_fix":[0,-1.2,0]
};
var moonscale = {
    "moon":0.3,
    "star_left":4,
    "star_middle":4,
    "star_right":2,
    "ncloud_fix":0.5
};
/*for(var i = 0; i < 6; i++)
{
    Cloud[CloudName[i]] = new THREE.Object3D();
}*/

var palaceTitleName = ["guanzhong","zhanlan",
                  "tushu", "wenchuang",
                  "xinwen", "xuanjiao",
                  "xueshu", "youxi",
                  "cangpin","gujian", "shiting"
                  ];

var titleStartPosition = { //Math.PI,Radius
    "cangpin":[2/3+0.8, 1.5, -1],
    "guanzhong":[1.05 + 0.8 ,1.2, 0.2],
    "gujian":[-2/3+0.8, 1.8, -1],
    "shiting":[-0.05+0.8, 1.8, -1],
    "tushu":[0.71 + 0.8, 1.2, 0.8],
    "wenchuang":[0.45 + 0.8, 1.2, 0.1],
    "xinwen":[-0.13 + 0.8,1.1, 0.2],
    "xuanjiao":[0.04+0.8, 1.1, 0.8],
    "xueshu":[-0.4 + 0.8, 0.2, 2],
    "youxi":[-0.55 + 0.8 ,1.1, 0.95],
    "zhanlan":[-0.57 + 0.8 ,1.2, 0]
};
var titleScale = {
    "cangpin":0.3,
    "guanzhong":0.3,
    "gujian":0.3,
    "shiting":0.3,
    "tushu":0.3,
    "wenchuang":0.3,
    "xinwen":0.3,
    "xuanjiao":0.3,
    "xueshu":0.3,
    "youxi":0.3,
    "zhanlan":0.3
};
var titlePlane = {};
for(var i = 0; i < 11; i++)
{
    titlePlane["d"+palaceTitleName[i]] = new THREE.Object3D();
    titlePlane["n"+palaceTitleName[i]] = new THREE.Object3D();
}

var enterCity;
var enterCityScale = 0.1;
var enterCityStartPosition = [-0.9,-1.4,0];

var cityTime;
var cityTimeScale = 0.06;
var cityTimeStartPosition = [-0.45,-1.4,0];

var userText = {}
var userTextName = ["user","assignment","other", "date"];
var userTextPosition = {
    "user": [-1,1.38,0],
    "assignment": [0.8,1.38,0],
    "other": [1,1.38,0],
    "date": [-0.6,1.41,0]
};
var userTextScale = {
    "user": 0.2,
    "assignment": 0.2,
    "other": 0.2,
    "date": 0.06
};
var assignmentStatus = 0;

var dynamicTextObj = new Array(3, 0);
var dynamicText = new Array(3, 0);
updateDynamicDate();
function updateDynamicDate()
{
    dynamicText[0] = myDate.getFullYear();
    dynamicText[1] = myDate.getMonth()+1;
    dynamicText[2] = myDate.getDate();
}

var dynamicTextPosition = [-0.6,1.41,0];
var dyTextStyle = {
    size: 50,
    height: 0,
    //curveSegments: curveSegments,
    material: 0,
    extrudeMaterial: 1,
    ncolor: 0xc7a190,
    dcolor: 0x408a9d
};

var meshVertical;
var groundScale = 5;

var targetRotation =  -Math.PI * 0.8;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

//var part3Rotation = -1;

var battery = navigator.getBattery();

var chargingFlag = false;
var dlthunMaterial;
var dlthunderPlane;
var dlthpos;// = [0,1.35,-5.5]
var dlthscale = 4;
//var dlthannie;

var drthunMaterial;
var drthunderPlane;
var drthpos;//0.2,1.4,-5.5
var drthscale = 3.8;
//var drthannie;

var nlthunMaterial;
var nlthunderPlane;
var nlthpos;//0,1.35,-5.5
var nlthscale = 4;
//var nlthannie;

var nrthunMaterial;
var nrthunderPlane;
var nrthpos;//0.2,1.4,-5.5
var nrthscale = 3.8;
//var nrthannie;

var dlightn_bg;
var dlightn_bg_mat;
var dlightn_scale = 6.7;
var dlightn_pos = [0,0,0];//0,0,-5.6

var nlightn_bg;
var nlightn_bg_mat;
var nlightn_scale = 6.7;//6.7
var nlightn_pos = [0,0,0];//0,0,-5.6

var birdObj;
var birdannie;

var waitPlane;

var particleSys, particleSys1, particleSys2, particleSys3;
var particles, particles1, particles2, particles3;
var waterclock;
var gAccel; /* g = 9.81 m/s^2.  */
var particleCount;
var waterfall;
var globlPart;
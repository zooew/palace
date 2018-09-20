/**
 * Created by waqth on 2017/4/18.
 */
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var dlthannie;
var drthannie;
var nlthannie;
var nrthannie;

/*

 */
init();
animate();
function init() {

    container = document.getElementById("container");
    //document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set( 0, 0, 5 );

    scene = new THREE.Scene();

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
        alert(xhr);
    };

    if(DayOrNight)
    {
        scene.background = bg_day;
    }
    else
    {
        scene.background = bg_night;
    }

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( './models/obj/output/' );

    //ground
    var loader = new THREE.TextureLoader();
    loader.load( "./image/city2.png",function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        var groundMaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );//, transparent: true, opacity: 0.5
        meshVertical = new THREE.Mesh( new THREE.PlaneBufferGeometry( ttexture.image.width / ttexture.image.height, 1 ), groundMaterial );
        meshVertical.position.set(0,-4.8,-6);
        meshVertical.receiveShadow = false;
        meshVertical.scale.set(groundScale,groundScale,groundScale);
        scene.add(meshVertical);
    });

    //night mengban
    loader.load( "./image/mengban.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        var mbMaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );//, transparent: true, opacity: 0.5
        mengbanObj = new THREE.Mesh( new THREE.PlaneBufferGeometry( mbscale * ttexture.image.width / ttexture.image.height, mbscale), mbMaterial );
        mengbanObj.position.set(mbpos[0],mbpos[1],mbpos[2]);
        mengbanObj.receiveShadow = false;
        if(!DayOrNight)
        {
            scene.add(mengbanObj);
        }
    });

    //moon&star
    function moonstarLoader(name, x, y, z, scale)
    {
        loader.load( "./image/" + name + ".png", function(ttexture){
            ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
            ttexture.format = THREE.RGBAFormat;
            ttexture.repeat.set( 1, 1 );
            var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
            var mmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( scale * ttexture.image.width / ttexture.image.height, scale), mmaterial );
            mmesh.receiveShadow = false;
            mmesh.position.set(x,y,z);
            moonstarObj[name] = mmesh;
            if(!DayOrNight)
            {
                scene.add(moonstarObj[name]);
            }
        });
    }
    for(var i = 0; i < 5; i++)
    {
        moonstarLoader(msname[i], moonpos[msname[i]][0], moonpos[msname[i]][1], moonpos[msname[i]][2], moonscale[msname[i]]);
    }

    //cloud
    cloudAnimation = {};
    for(var i = 0; i < 12; i++)
    {
        cloudLoader(CloudName[i],
            CloudStartPosition[CloudName[i]][0],
            CloudStartPosition[CloudName[i]][1],
            CloudStartPosition[CloudName[i]][2],
            CloudScale[CloudName[i]],
            i
        );
    }
    function cloudLoader(name, x, y, z, scale, index)
    {
        loader.load( "./image/" + name + ".png", function(ttexture){
            ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
            ttexture.format = THREE.RGBAFormat;
            ttexture.repeat.set( 1, 1 );
            var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
            var mmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( scale * ttexture.image.width / ttexture.image.height, scale), mmaterial );
            mmesh.receiveShadow = false;
            mmesh.position.set(x, y, z);
            Cloud[name] = mmesh;
            if(name[0] == "d" && DayOrNight)
            {
                scene.add(mmesh);
            }
            else if(name[0] == "n" && !DayOrNight)
            {
                scene.add(mmesh);
            }

            if(index%2 == 0)
            {
                var tween_float_right_to_left = new TWEEN.Tween( mmesh.position ).to( {
                    x: mmesh.position.x + 3,
                    y: mmesh.position.y,
                    z: mmesh.position.z }, 25000 );
                var tween_float_leftEdge_to_rightEdge = new TWEEN.Tween( mmesh.position ).to( {
                    x: mmesh.position.x - 3,
                    y: mmesh.position.y,
                    z: mmesh.position.z }, 1 );
                tween_float_right_to_left.chain(tween_float_leftEdge_to_rightEdge);
                tween_float_leftEdge_to_rightEdge.chain(tween_float_right_to_left);
                //tween_float_right_to_left.start();
                cloudAnimation[name] = tween_float_right_to_left;
                cloudAnimation[name].start();
            }
            else
            {
                var tween_float_left_to_right = new TWEEN.Tween( mmesh.position ).to( {
                    x: mmesh.position.x - 3,
                    y: mmesh.position.y,
                    z: mmesh.position.z }, 25000 );
                var tween_float_rightEdge_to_leftEdge = new TWEEN.Tween( mmesh.position ).to( {
                    x: mmesh.position.x + 3,
                    y: mmesh.position.y,
                    z: mmesh.position.z }, 1 );
                tween_float_left_to_right.chain(tween_float_rightEdge_to_leftEdge);
                tween_float_rightEdge_to_leftEdge.chain(tween_float_left_to_right);
                //tween_float_left_to_right.start();
                cloudAnimation[name] = tween_float_left_to_right;
                cloudAnimation[name].start();
            }

        });
    }

    //text
    function textLoader(name, x, y, z, scale, stateOfDay)
    {
        loader.load( "./image/" + name + ".png", function(ttexture){
            ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
            ttexture.format = THREE.RGBAFormat;
            ttexture.repeat.set( 1, 1 );
            var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
            var mmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( scale * ttexture.image.width / ttexture.image.height, scale), mmaterial );
            mmesh.receiveShadow = false;
            mmesh.position.set(x,y,z);
            userText[name] = mmesh;
            if(stateOfDay == DayOrNight || name == "assred")
            {
                scene.add(userText[name]);
            }
        });
    }
    for(var i = 0; i < 4; i++)
    {
        textLoader("d"+userTextName[i], userTextPosition[userTextName[i]][0],
            userTextPosition[userTextName[i]][1], userTextPosition[userTextName[i]][2], userTextScale[userTextName[i]], true);
        textLoader("n"+userTextName[i], userTextPosition[userTextName[i]][0],
            userTextPosition[userTextName[i]][1], userTextPosition[userTextName[i]][2], userTextScale[userTextName[i]], false);
    }
    textLoader("assred", 0.85, 1.46, 0, 0.04,  true);

    var fontLoader = new THREE.FontLoader();
    loader.load( "./image/dtextcolor.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
        dyTextStyle["dmaterial"] = mmaterial;
        fontLoader.load("./font/droid_serif_regular.typeface.json",function ( font ) {
            dyTextStyle["font"] = font;
            var ytextGeo = new THREE.TextGeometry( dynamicText[0], dyTextStyle);
            ytextGeo.computeBoundingBox();
            ytextGeo.computeVertexNormals();
            var ytextMesh = new THREE.Mesh( ytextGeo, mmaterial );
            ytextMesh.position.set(-0.69, 1.39, 0);
            ytextMesh.rotation.set(0, Math.PI * 2, 0);
            dynamicTextObj[0] = ytextMesh;
            dynamicTextObj[0].scale.set(0.0006, 0.0008, 0.0008);

            var mtextGeo = new THREE.TextGeometry( dynamicText[1], dyTextStyle);
            mtextGeo.computeBoundingBox();
            mtextGeo.computeVertexNormals();
            var mtextMesh = new THREE.Mesh( mtextGeo, mmaterial );
            mtextMesh.position.set(-0.53, 1.39, 0);
            mtextMesh.rotation.set(0, Math.PI * 2, 0);
            dynamicTextObj[1] = mtextMesh;
            dynamicTextObj[1].scale.set(0.0006, 0.0008, 0.0008);

            var dtextGeo = new THREE.TextGeometry( dynamicText[2], dyTextStyle);
            dtextGeo.computeBoundingBox();
            dtextGeo.computeVertexNormals();
            var dtextMesh = new THREE.Mesh( dtextGeo, mmaterial );
            dtextMesh.position.set(-0.45, 1.39, 0);
            dtextMesh.rotation.set(0, Math.PI * 2, 0);
            dynamicTextObj[2] = dtextMesh;
            dynamicTextObj[2].scale.set(0.0006, 0.0008, 0.0008);
            if(DayOrNight)
            {
                scene.add( dynamicTextObj[0] );
                scene.add( dynamicTextObj[1] );
                scene.add( dynamicTextObj[2] );
            }
        });
    });
    loader.load( "./image/ntextcolor.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
        dyTextStyle["nmaterial"] = mmaterial;
        if(dyTextStyle["font"]){
            var ytextGeo = new THREE.TextGeometry( dynamicText[0], dyTextStyle);
            ytextGeo.computeBoundingBox();
            ytextGeo.computeVertexNormals();
            var ytextMesh = new THREE.Mesh( ytextGeo, mmaterial );
            ytextMesh.position.set(-0.69, 1.39, 0);
            ytextMesh.rotation.set(0, Math.PI * 2, 0);
            dynamicTextObj[3] = ytextMesh;
            dynamicTextObj[3].scale.set(0.0006, 0.0008, 0.0008);

            var mtextGeo = new THREE.TextGeometry( dynamicText[1], dyTextStyle);
            mtextGeo.computeBoundingBox();
            mtextGeo.computeVertexNormals();
            var mtextMesh = new THREE.Mesh( mtextGeo, mmaterial );
            mtextMesh.position.set(-0.53, 1.39, 0);
            mtextMesh.rotation.set(0, Math.PI * 2, 0);
            dynamicTextObj[4] = mtextMesh;
            dynamicTextObj[4].scale.set(0.0006, 0.0008, 0.0008);

            var dtextGeo = new THREE.TextGeometry( dynamicText[2], dyTextStyle);
            dtextGeo.computeBoundingBox();
            dtextGeo.computeVertexNormals();
            var dtextMesh = new THREE.Mesh( dtextGeo, mmaterial );
            dtextMesh.position.set(-0.45, 1.39, 0);
            dtextMesh.rotation.set(0, Math.PI * 2, 0);
            dynamicTextObj[5] = dtextMesh;
            dynamicTextObj[5].scale.set(0.0006, 0.0008, 0.0008);
            if(!DayOrNight)
            {
                scene.add( dynamicTextObj[3] );
                scene.add( dynamicTextObj[4] );
                scene.add( dynamicTextObj[5] );
            }
        }
        else{
            fontLoader.load("./font/droid_serif_regular.typeface.json",function ( font ) {
                dyTextStyle["font"] = font;
                var ytextGeo = new THREE.TextGeometry( dynamicText[0], dyTextStyle);
                ytextGeo.computeBoundingBox();
                ytextGeo.computeVertexNormals();
                var ytextMesh = new THREE.Mesh( ytextGeo, mmaterial );
                ytextMesh.position.set(-0.69, 1.39, 0);
                ytextMesh.rotation.set(0, Math.PI * 2, 0);
                dynamicTextObj[3] = ytextMesh;
                dynamicTextObj[3].scale.set(0.0006, 0.0008, 0.0008);

                var mtextGeo = new THREE.TextGeometry( dynamicText[1], dyTextStyle);
                mtextGeo.computeBoundingBox();
                mtextGeo.computeVertexNormals();
                var mtextMesh = new THREE.Mesh( mtextGeo, mmaterial );
                mtextMesh.position.set(-0.53, 1.39, 0);
                mtextMesh.rotation.set(0, Math.PI * 2, 0);
                dynamicTextObj[4] = mtextMesh;
                dynamicTextObj[4].scale.set(0.0006, 0.0008, 0.0008);

                var dtextGeo = new THREE.TextGeometry( dynamicText[2], dyTextStyle);
                dtextGeo.computeBoundingBox();
                dtextGeo.computeVertexNormals();
                var dtextMesh = new THREE.Mesh( dtextGeo, mmaterial );
                dtextMesh.position.set(-0.45, 1.39, 0);
                dtextMesh.rotation.set(0, Math.PI * 2, 0);
                dynamicTextObj[5] = dtextMesh;
                dynamicTextObj[5].scale.set(0.0006, 0.0008, 0.0008);
                if(!DayOrNight)
                {
                    scene.add( dynamicTextObj[3] );
                    scene.add( dynamicTextObj[4] );
                    scene.add( dynamicTextObj[5] );
                }
            });
        }
    });
    //enter city
    loader.load( "./image/enter_city.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
        var mmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( enterCityScale * ttexture.image.width / ttexture.image.height, enterCityScale), mmaterial );
        mmesh.receiveShadow = false;
        mmesh.position.set(enterCityStartPosition[0],enterCityStartPosition[1], enterCityStartPosition[2]);
        enterCity = mmesh;
        scene.add(enterCity);
    });

    //city time
    loader.load( "./image/citytime.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
        var mmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( cityTimeScale * ttexture.image.width / ttexture.image.height, cityTimeScale), mmaterial );
        mmesh.receiveShadow = false;
        mmesh.position.set(cityTimeStartPosition[0],cityTimeStartPosition[1], cityTimeStartPosition[2]);
        cityTime = mmesh;
        scene.add(cityTime);
    });

    //palace title
    for(var i = 0; i < 11; i++)
    {
        titleLoader("d" + palaceTitleName[i],
            titleStartPosition[palaceTitleName[i]][0],
            titleStartPosition[palaceTitleName[i]][1],
            titleStartPosition[palaceTitleName[i]][2],
            titleScale[palaceTitleName[i]]
        );
        titleLoader("n" + palaceTitleName[i],
            titleStartPosition[palaceTitleName[i]][0],
            titleStartPosition[palaceTitleName[i]][1],
            titleStartPosition[palaceTitleName[i]][2],
            titleScale[palaceTitleName[i]]
        );
    }
    function titleLoader(name, angle, radius, y, scale)
    {
        loader.load( "./image/name/" + name + ".png", function(ttexture){
            ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
            ttexture.format = THREE.RGBAFormat;
            ttexture.repeat.set( 1, 1 );
            var mmaterial = new THREE.MeshPhongMaterial( {  map: ttexture, transparent: true} );
            var mmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( scale * ttexture.image.width / ttexture.image.height, scale), mmaterial );
            mmesh.receiveShadow = false;
            mmesh.position.set(radius * Math.sin(angle),y,-4+radius*Math.cos(angle));
            mmesh.rotation.set(Math.PI * 0.1, 0, 0);
            titlePlane[name] = mmesh;
            if(DayOrNight)
            {
                if(name[0] == "d"){
                    switch (name){
                        case "dgujian":
                            gujianUnion.add(titlePlane[name]);
                            break;
                        case "dcangpin":
                            cangpinUnion.add(titlePlane[name]);
                            break;
                        case "dshiting":
                            shitingUnion.add(titlePlane[name]);
                            break;
                        default:
                            scene.add(titlePlane[name]);
                            break;
                    }
                }
            }
            else
            {
                if(name[0] == "n"){
                    switch (name){
                        case "ngujian":
                            gujianUnion.add(titlePlane[name]);
                            break;
                        case "ncangpin":
                            cangpinUnion.add(titlePlane[name]);
                            break;
                        case "nshiting":
                            shitingUnion.add(titlePlane[name]);
                            break;
                        default:
                            scene.add(titlePlane[name]);
                            break;
                    }
                }
            }
        });
    }


    //Gu Jian
    palaceGujian = new THREE.Group();

    for(var i = 1; i<=8; i++)
    {
        gujianLoader(i);
    }
    function gujianLoader(part)
    {
        mtlLoader.load("gujian"+ part + '.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( './models/obj/output/' );
            objLoader.load( "gujian"+ part + '.obj', function ( object ) {
                palaceGujianArray[part] = object;
                palaceGujian.add(palaceGujianArray[part]);
            }, onProgress, onError );
        });
    }

    palaceGujian.scale.set( gujian_scale, gujian_scale, gujian_scale );
    palaceGujian.position.set(leftX, -1.3 ,leftZ);
    palaceGujian.rotation.set(- Math.PI / 2, 0, 0 );
    scene.add(palaceGujian);
    gujianUnion.add(palaceGujian);
    scene.add(gujianUnion);
    gujianFloat[0] = new TWEEN.Tween(gujianUnion.position).to({
        x:gujianUnion.position.x,
        y:gujianUnion.position.y + 0.07,
        z:gujianUnion.position.z
    }, 3000);
    gujianFloat[1] = new TWEEN.Tween(gujianUnion.position).to({
        x:gujianUnion.position.x,
        y:gujianUnion.position.y - 0.07,
        z:gujianUnion.position.z
    }, 3000);
    gujianFloat[0].chain(gujianFloat[1]);
    gujianFloat[1].chain(gujianFloat[0]);
    gujianFloat[0].start();

    //Shiting
    palaceShiting = new THREE.Group();

    mtlLoader.load( 'shiting1.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( './models/obj/output/' );
        objLoader.load( 'shiting1.obj', function ( object ) {
            pshiting1 = object;
            palaceShiting.add( pshiting1 );

        }, onProgress, onError );
    });

    mtlLoader.load( 'shiting2.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( './models/obj/output/' );
        objLoader.load( 'shiting2.obj', function ( object ) {
            pshiting2 = object;
            palaceShiting.add( pshiting2 );
            pshiting2.position.z = 0;

        }, onProgress, onError );

        objLoader.load( 'shiting2.obj', function ( object ) {
            pshiting3 = object;
            palaceShiting.add( pshiting3 );
            pshiting3.position.z = -60;

        }, onProgress, onError );
    });

    palaceShiting.scale.set(shiting_scale,shiting_scale,shiting_scale);
    palaceShiting.rotation.set(- Math.PI / 2, 0, 0);
    palaceShiting.position.set(0, -1.3 ,frontZ);
    //palaceShiting.position.set(0, 0 ,frontZ);

    scene.add(palaceShiting);
    shitingUnion.add(palaceShiting);
    scene.add(shitingUnion);

    //Cangpin
    //palaceCangpin = new THREE.Object3D();
    palaceCangpin = new THREE.Group();
    mtlLoader.load( 'cangpin2.mtl', function( materials ) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( './models/obj/output/' );
        objLoader.load( 'cangpin2.obj', function ( object ) {
            palaceCangpin.add(object);
            palaceCangpin.scale.set(cangpin_scale,cangpin_scale,cangpin_scale);
            palaceCangpin.rotation.set(- Math.PI / 2, 0, -Math.PI * 0.2);
            palaceCangpin.position.set(rightX, -1.3 ,rightZ);
            scene.add( palaceCangpin );
            cangpinUnion.add(palaceCangpin);
            scene.add(cangpinUnion);
            cangpinFloat[0] = new TWEEN.Tween(cangpinUnion.position).to({
                x:cangpinUnion.position.x - 0.07,
                y:cangpinUnion.position.y + 0.07,
                z:cangpinUnion.position.z
            }, 3000);
            cangpinFloat[1] = new TWEEN.Tween(cangpinUnion.position).to({
                x:cangpinUnion.position.x + 0.07,
                y:cangpinUnion.position.y - 0.07,
                z:cangpinUnion.position.z
            }, 3000);
            cangpinFloat[0].chain(cangpinFloat[1]);
            cangpinFloat[1].chain(cangpinFloat[0]);
            cangpinFloat[0].start();
        }, onProgress, onError );
    });


    //palace
    palace = new THREE.Group();
    mtlLoader.load( 'mountain.mtl', function( materials ) {
        materials.lights = false;
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( './models/obj/output/' );
        objLoader.load( 'mountain.obj', function ( object ) {
            object.scale.set( moun_scale, moun_scale, moun_scale );
            palace.add( object );
            scene.add( palace );
        }, onProgress, onError );

    });
    for(pindex in palaceNames)
    {
        palaceLoader(palaceNames[pindex]);
    }
    function palaceLoader(palaceName)
    {
        mtlLoader.load( palaceName + '.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( './models/obj/output/' );
            objLoader.load( palaceName + '.obj', function ( object ) {
                object.scale.set( palace_scale, palace_scale, palace_scale );
                palacesArray[palaceName] = object;
                palace.add( palacesArray[palaceName] );
                //scene.add(palacesArray[palaceName]);
            }, onProgress, onError );
        });
    }

    palace.position.set(0, -0.8 ,-4);
    palace.rotation.set(- Math.PI * 0.4, 0, - Math.PI * 0.8 );

    //day lightning
    loader.load( "./image/lightning_left.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1/6, 1 );
        dlthannie = new TextureAnimator(ttexture,6,1,6, 40);
        dlthunMaterial = new THREE.MeshBasicMaterial( {  map: ttexture, transparent: true, side:THREE.DoubleSide} );
        dlthscale = 4;
        dlthunderPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( dlthscale * ttexture.image.width / ttexture.image.height / 6, dlthscale), dlthunMaterial );
        dlthunderPlane.receiveShadow = false;
        dlthpos = [0,1.35,-5.5];
        dlthunderPlane.position.set(dlthpos[0],dlthpos[1],dlthpos[2]);
        //scene.add(dlthunderPlane);
    });
    loader.load( "./image/lightning_right.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1/7, 1 );
        drthannie = new TextureAnimator(ttexture,7,1,7, 40);
        drthunMaterial = new THREE.MeshBasicMaterial( {  map: ttexture, transparent: true, side:THREE.DoubleSide} );
        drthscale = 3.8;
        drthunderPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( drthscale * ttexture.image.width / ttexture.image.height / 7, drthscale), drthunMaterial );
        drthunderPlane.receiveShadow = false;
        drthpos = [0.2,1.4,-5.5];
        drthunderPlane.position.set(drthpos[0],drthpos[1],drthpos[2]);
        //scene.add(drthunderPlane);
    });
    loader.load( "./image/dlightn_bg.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        //drthannie = new TextureAnimator(ttexture,7,1,7, 40);
        dlightn_bg_mat = new THREE.MeshBasicMaterial( {  map: ttexture, transparent: true, opacity:0.6} );
        dlightn_scale = 6.7;
        dlightn_bg = new THREE.Mesh( new THREE.PlaneBufferGeometry(ttexture.image.width / ttexture.image.height * dlightn_scale, dlightn_scale), dlightn_bg_mat );
        dlightn_bg.receiveShadow = false;
        dlightn_bg.position.set(dlightn_pos[0],dlightn_pos[1],dlightn_pos[2]);
        //dlightn_bg.scale.set(dlightn_scale,dlightn_scale,dlightn_scale);
    });
    //night lightning
    loader.load( "./image/nlightning_left.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1/7, 1 );
        nlthannie = new TextureAnimator(ttexture,7,1,7, 40);
        nlthunMaterial = new THREE.MeshBasicMaterial( {  map: ttexture, transparent: true, side:THREE.DoubleSide} );
        nlthscale = 4;
        nlthunderPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( nlthscale * ttexture.image.width / ttexture.image.height / 7, nlthscale), nlthunMaterial );
        nlthunderPlane.receiveShadow = false;
        nlthpos = [0,1.35,-5.5];
        nlthunderPlane.position.set(nlthpos[0],nlthpos[1],nlthpos[2]);
        //scene.add(nlthunderPlane);
    });
    loader.load( "./image/nlightning_right.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1/7, 1 );
        nrthannie = new TextureAnimator(ttexture,7,1,7, 40);
        nrthunMaterial = new THREE.MeshBasicMaterial( {  map: ttexture, transparent: true, side:THREE.DoubleSide} );
        nrthscale = 3.8;
        nrthunderPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( nrthscale * ttexture.image.width / ttexture.image.height / 7, nrthscale), nrthunMaterial );
        nrthunderPlane.receiveShadow = false;
        nrthpos = [0.2,1.4,-5.5];
        nrthunderPlane.position.set(nrthpos[0],nrthpos[1],nrthpos[2]);
        //scene.add(nrthunderPlane);
    });
    loader.load( "./image/nlightn_bg.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        //drthannie = new TextureAnimator(ttexture,7,1,7, 40);
        nlightn_bg_mat = new THREE.MeshBasicMaterial( {  map: ttexture, transparent: true, opacity:0.4} );
        nlightn_scale = 6.7;
        nlightn_bg = new THREE.Mesh( new THREE.PlaneBufferGeometry(ttexture.image.width / ttexture.image.height * nlightn_scale, nlightn_scale), nlightn_bg_mat );
        nlightn_bg.receiveShadow = false;
        nlightn_bg.position.set(nlightn_pos[0],nlightn_pos[1],nlightn_pos[2]);
        //nlightn_bg.scale.set(,nlightn_scale,nlightn_scale);
        //scene.add(nlightn_bg);
    });
    //var fog = new THREE.Fog( 0xffffff, 11, 12 );
    //scene.fog = fog;

    //bird
    loader.load( "./image/bird.png", function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1/10, 1 );
        birdannie = new TextureAnimator(ttexture,10,1,10, 45);
        var birdMaterial = new THREE.MeshBasicMaterial( {  map: ttexture, transparent: true, side:THREE.DoubleSide} );
        var birdscale = 0.1;
        birdObj = new THREE.Mesh( new THREE.PlaneBufferGeometry( birdscale * ttexture.image.width / ttexture.image.height / 10, birdscale), birdMaterial );
        birdObj.receiveShadow = false;
    });

    loader.load( "./image/waiting.png", function(ttexture) {
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set(1, 1);
        var mmaterial = new THREE.MeshPhongMaterial({map: ttexture, transparent: true});
        var scale = 0.14;
        var mmesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(scale * ttexture.image.width / ttexture.image.height, scale), mmaterial);
        mmesh.receiveShadow = false;
        mmesh.position.set(0,0.2,0);//0.25

        waitPlane = mmesh;
        waitPlane.material.opacity = 1.4;
        //scene.add(waitPlane);
    });

    particleSys = new THREE.Group();
    particleSys1 = new THREE.Group();//xuanjiao
    particleSys2 = new THREE.Group();//gujian
    particleSys3 = new THREE.Group();//shiting
    waterclock = new THREE.Clock ();
    loader.load( "./image/water/drop.png",function(ttexture){
        particles = [];
        particles1 = [];
        particles2 = [];
        particles3 = [];
        gAccel = -9.81; /* g = 9.81 m/s^2.  */
        particleCount = 400;
        waterfall = {
            w: 0.5, /* Real width.  */
            h: 2, /* Upper start point.  */
            l: -4 /* Lower maximum (stop) point.  */
        }
        waterfall.height = waterfall.h -waterfall.l;
        var particlesize = waterfall.w/4;

        globlPart ={
            pXVar: waterfall.w,
            pXMean: 0-waterfall.w/2,

            pZVar: waterfall.w,
            pZMean: 0-waterfall.w/2,

            initVel: 0,
            visible: false
        };

        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        for (var p = 0; p < particleCount; p++)
        {
            var material = new THREE.MeshPhongMaterial( {
                color: 0x68a8ce,
                side: THREE.DoubleSide,
                map: ttexture,
                transparent: true,
                size: 1,
                sizeAttenuation: true,
                opacity:0.6
            } );
            var geometry = new THREE.PlaneGeometry(ttexture.image.width / ttexture.image.height, 1);
            particles[p] = new THREE.Mesh( geometry, material );
            particles[p].scale.set(Math.random()*particlesize + particlesize,Math.random()*particlesize + particlesize,Math.random()*particlesize + particlesize);
            particles[p].rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
            particles[p].position.set(
                (Math.random() * globlPart.pXVar) + globlPart.pXMean,
                waterfall.h,
                (Math.random() * globlPart.pZVar) + globlPart.pZMean
            );
            particles[p].velocity = new THREE.Vector3 (0, (1-p/particleCount)*gAccel*3, 0);
            particles[p].receiveShadow = false;

            particles1[p] = new THREE.Mesh( geometry, material );
            particles1[p].scale.set(Math.random()*particlesize + particlesize,Math.random()*particlesize + particlesize,Math.random()*particlesize + particlesize);
            particles1[p].rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
            particles1[p].position.set(
                (Math.random() * globlPart.pXVar) + globlPart.pXMean,
                waterfall.h,
                (Math.random() * globlPart.pZVar) + globlPart.pZMean
            );
            particles1[p].velocity = new THREE.Vector3 (0, (1-p/particleCount)*gAccel*3, 0);
            particles1[p].receiveShadow = false;

            particles2[p] = new THREE.Mesh( geometry, material );
            particles2[p].scale.set(Math.random()*particlesize + particlesize,Math.random()*particlesize + particlesize,Math.random()*particlesize + particlesize);
            particles2[p].rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
            particles2[p].position.set(
                (Math.random() * globlPart.pXVar) + globlPart.pXMean,
                waterfall.h,
                (Math.random() * globlPart.pZVar) + globlPart.pZMean
            );
            particles2[p].velocity = new THREE.Vector3 (0, (1-p/particleCount)*gAccel*3, 0);
            particles2[p].receiveShadow = false;

            particleSys.add(particles[p]);
            particleSys1.add(particles1[p]);
            particleSys2.add(particles2[p]);
        }
    });

    palace.add (particleSys);
    particleSys.rotation.set(Math.PI / 2, 0, 0);
    particleSys.position.set(-0.6,0.9,0.5);
    particleSys.scale.set(0.2,0.2,0.2);

    palace.add (particleSys1);
    particleSys1.rotation.set(Math.PI / 2, 0, 0);
    particleSys1.position.set(0.3, 0.9, 1.25);
    particleSys1.scale.set(0.1,0.1,0.1);

    palaceCangpin.add(particleSys2);
    particleSys2.rotation.set(Math.PI / 2, 0, 0);
    particleSys2.position.set(0,0,-400);
    particleSys2.scale.set(120,120,120);

    waterclock.start ();


    // Lights

    scene.add( new THREE.AmbientLight( 0x333333 ) );
    scene.add( new THREE.HemisphereLight( 0xbbbbbb, 0x111111, 1.1 ) );

    //addShadowedLight( 0,10, 0, 0xFFFFFF, 1.35 );
    addShadowedLight( 0, 0, 1, 0x777777, 0.7 );
    addShadowedLight( -5, 1.5, 0.2, 0xffffff, 0.9 );
    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;

    container.appendChild( renderer.domElement );


    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    // stats

    //stats = new Stats();//show fps
    //container.appendChild( stats.dom );

    //document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    document.addEventListener( 'touchend', onDocumentTouchEnd, false);
    //document.removeEventListener( 'mousemove', onDocumentMouseMove, false);
    //document.addEventListener( 'dblclick', onDocumentDbClick, false);

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener('deviceorientation', onDeviceOrientation, false);

}

function addShadowedLight( x, y, z, color, intensity ) {

    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );

    directionalLight.castShadow = false;
}

function addSmallAreaLight( x, y, z, color, intensity ) {

    var light = new THREE.PointLight( 0xffffff, 1, 5 );
    light.position.set( 2, -1 ,-4  );
    light.castShadow = false;
    scene.add( light );

}

function onWindowResize() {
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
    windowHalfX = windowWidth / 2;
    windowHalfY = windowHeight / 2;

    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( windowWidth, windowHeight );

}

function animate() {

    frameID = requestAnimationFrame( animate );

    render();
    updateAni();
    //stats.update();

}

function render() {
    if(!touchMoveFlag)
    {
        TWEEN.update();
        palace.rotation.z += 0.002;
    }
    else
    {
        palace.rotation.z += ( targetRotation - palace.rotation.z ) * 0.009;
    }

    if(particles && particles1 && particles2 && particles[particleCount-1] && particles1[particleCount-1] && particles2[particleCount-1]){
        fallingParticlesMgr ();
    }

    //palaceShiting.rotation.x += (targetRotation - palaceShiting.rotation.x)*0.009;

    palaceGujian.position.z = -4 + circleRadius * Math.cos(palace.rotation.z - Math.PI * 2 / 3 + Math.PI * 0.8);
    palaceGujian.position.x = circleRadius * Math.sin(palace.rotation.z - Math.PI * 2 / 3 + Math.PI * 0.8);

    palaceShiting.position.z = -4 + circleRadius * Math.cos(palace.rotation.z + Math.PI * 0.8);
    palaceShiting.position.x = circleRadius * Math.sin(palace.rotation.z + Math.PI * 0.8);

    palaceCangpin.position.z = -4 + circleRadius * Math.cos(palace.rotation.z + Math.PI * 2 / 3 + Math.PI * 0.8);
    palaceCangpin.position.x = circleRadius * Math.sin(palace.rotation.z + Math.PI * 2 / 3 + Math.PI * 0.8);

    for(var i = 0; i < 11; i++)
    {
        titlePlane["d" + palaceTitleName[i]].position.z = -4 + titleStartPosition[palaceTitleName[i]][1] * Math.cos(palace.rotation.z + Math.PI * titleStartPosition[palaceTitleName[i]][0]);
        titlePlane["d" + palaceTitleName[i]].position.x = titleStartPosition[palaceTitleName[i]][1] * Math.sin(palace.rotation.z + Math.PI * titleStartPosition[palaceTitleName[i]][0]);
        titlePlane["n" + palaceTitleName[i]].position.z = -4 + titleStartPosition[palaceTitleName[i]][1] * Math.cos(palace.rotation.z + Math.PI * titleStartPosition[palaceTitleName[i]][0]);
        titlePlane["n" + palaceTitleName[i]].position.x = titleStartPosition[palaceTitleName[i]][1] * Math.sin(palace.rotation.z + Math.PI * titleStartPosition[palaceTitleName[i]][0]);
    }

    renderer.render( scene, camera);
}

function fallingParticlesMgr ()
{
    var pCount = particleCount;

    while (pCount--)
    {
        var elapsed = 1/50;

        if (particles[pCount].position.y < waterfall.l)
        {
            elapsed = pCount/particleCount * 3;
            particles[pCount].position.y = waterfall.h;
            particles[pCount].velocity.y = elapsed * gAccel;
            particles[pCount].material.opacity = 0.6;

            particles1[pCount].position.y = waterfall.h;
            particles1[pCount].velocity.y = elapsed * gAccel;
            particles1[pCount].material.opacity = 0.6;

            particles2[pCount].position.y = waterfall.h;
            particles2[pCount].velocity.y = elapsed * gAccel;
            particles2[pCount].material.opacity = 0.6;
        }
        else
        {
            particles[pCount].velocity.y += gAccel * elapsed;
            particles[pCount].position.y += (1/2) * particles[pCount].velocity.y * elapsed;
            particles[pCount].material.opacity = 1 - (waterfall.h - particles[pCount].position.y)/waterfall.height;
            particles[pCount].material.opacity *= 0.6;

            particles1[pCount].velocity.y += gAccel * elapsed;
            particles1[pCount].position.y += (1/2) * particles1[pCount].velocity.y * elapsed;
            particles1[pCount].material.opacity = particles[pCount].material.opacity;

            particles2[pCount].velocity.y += gAccel * elapsed;
            particles2[pCount].position.y += (1/2) * particles2[pCount].velocity.y * elapsed;
            particles2[pCount].material.opacity = particles[pCount].material.opacity

        }
    }

}

function updateUI(){
    if(DayOrNight)
    {
        scene.background = bg_day;
        for(var i = 0; i < 4; i++)
        {
            scene.add(userText["d"+userTextName[i]]);
            scene.remove(userText["n"+userTextName[i]]);
        }
        for(var i = 0; i < 3; i++)
        {
            scene.add(dynamicTextObj[i]);
            scene.remove(dynamicTextObj[i+3]);
        }
        scene.remove(mengbanObj);
        for(var i = 0; i < 8; i++)
        {
            scene.remove(titlePlane["n"+palaceTitleName[i]]);
            scene.add(titlePlane["d"+palaceTitleName[i]]);
        }
        gujianUnion.remove(titlePlane["ngujian"]);
        gujianUnion.add(titlePlane["dgujian"]);
        cangpinUnion.remove(titlePlane["ncangpin"]);
        cangpinUnion.add(titlePlane["dcangpin"]);
        shitingUnion.remove(titlePlane["nshiting"]);
        shitingUnion.add(titlePlane["dshiting"]);
        for(var i = 0; i < 5; i++)
        {
            scene.remove(moonstarObj[msname[i]]);
        }
        for(var i = 0; i < 6; i++)
        {
            scene.add(Cloud[CloudName[i]]);
            scene.remove(Cloud[CloudName[i+6]]);
        }
        if(chargingFlag){
            chargingFlag = false;
            scene.add(dlthunderPlane);
            scene.remove(nlthunderPlane);
            scene.remove(nrthunderPlane);
            //addDrthunder();
            setTimeout("addDrthunder()", 40);
            addDligtnBg();
        }
        else{
            scene.remove(nlthunderPlane);
            scene.remove(nrthunderPlane);
            scene.remove(dlthunderPlane);
            scene.remove(drthunderPlane);
        }
    }
    else
    {
        scene.background = bg_night;
        for(var i = 0; i < 4; i++)
        {
            scene.add(userText["n"+userTextName[i]]);
            scene.remove(userText["d"+userTextName[i]]);
        }
        for(var i = 0; i < 3; i++)
        {
            scene.remove(dynamicTextObj[i]);
            scene.add(dynamicTextObj[i+3]);
        }
        scene.add(mengbanObj);
        for(var i = 0; i < 8; i++)
        {
            scene.remove(titlePlane["d"+palaceTitleName[i]]);
            scene.add(titlePlane["n"+palaceTitleName[i]]);
        }
        gujianUnion.remove(titlePlane["dgujian"]);
        gujianUnion.add(titlePlane["ngujian"]);
        cangpinUnion.remove(titlePlane["dcangpin"]);
        cangpinUnion.add(titlePlane["ncangpin"]);
        shitingUnion.remove(titlePlane["dshiting"]);
        shitingUnion.add(titlePlane["nshiting"]);
        for(var i = 0; i < 5; i++)
        {
            scene.add(moonstarObj[msname[i]]);
        }
        for(var i = 0; i < 6; i++)
        {
            scene.remove(Cloud[CloudName[i]]);
            scene.add(Cloud[CloudName[i+6]]);
        }
        if(chargingFlag){
            chargingFlag = false;
            scene.add(nlthunderPlane);
            scene.remove(dlthunderPlane);
            scene.remove(drthunderPlane);
            setTimeout("addNrthunder()", 40);
            addNlightnBg();
            //addNrthunder();
        }
        else{
            scene.remove(nlthunderPlane);
            scene.remove(nrthunderPlane);
            scene.remove(dlthunderPlane);
            scene.remove(drthunderPlane);
        }
    }
}

function updateAni()
{
    var delta = 1;
    if(DayOrNight)
    {
        if(dlthannie)
        {
            dlthannie.update(delta*1000);
        }
        if(drthannie)
        {
            drthannie.update(delta*1000);
        }
    }
    else
    {
        if(nlthannie)
        {
            nlthannie.update(delta*1000);
        }
        if(nrthannie)
        {
            nrthannie.update(delta*1000);
        }
    }
    if(birdannie)
    {
        birdannie.update(delta*1000);
    }
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    this.text = texture;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = numTiles;
    //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //texture.repeat.set( this.tilesVertical / this.tilesHorizontal, 1  );

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;

    this.update = function( milliSec )
    {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
}

function addDrthunder(){
    scene.add(drthunderPlane);
}
function addDligtnBg(){
    addDLbg();
    //setTimeout("addDLbg()", 80);
    setTimeout("removeDLbg()", 200);
    setTimeout("addDLbg()", 400);
    setTimeout("removeDLbg()", 580);
}
function addDLbg(){
    //console.log("Twice");
    scene.add(dlightn_bg);
}
function removeDLbg(){
    //console.log("Twice remove");
    scene.remove(dlightn_bg);
}
function addNrthunder(){
    scene.add(nrthunderPlane);
}
function addNlightnBg(){
    addNLbg();
    //setTimeout("addNLbg()", 40);
    setTimeout("removeNLbg()", 200);
    setTimeout("addNLbg()", 400);
    setTimeout("removeNLbg()", 580);
}
function addNLbg(){
    console.log("Twice");
    scene.add(nlightn_bg);
}
function removeNLbg(){
    console.log("Twice remove");
    scene.remove(nlightn_bg);
}
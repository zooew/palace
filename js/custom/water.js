/* Global variables.  */
var scene, camera, renderer;

/* Constants.  */
var scr = /* Screen dimensions.  */
    {
        w: window.innerWidth,
        h: window.innerHeight
    }

var gAccel = -9.81; /* g = 9.81 m/s^2.  */

var particleCount = 400;
var waterfall = {
    w: 0.5, /* Real width.  */
    h: 1, /* Upper start point.  */
    l: -1 /* Lower maximum (stop) point.  */
}

var globlPart =
    {
        pXVar: waterfall.w,
        pXMean: 0-waterfall.w/2,

        pZVar: 2,
        pZMean: -1,

        initVel: 0,
        visible: false
    };

var falltime = Math.sqrt(-(waterfall.h - waterfall.l)*2/gAccel);
console.log(falltime);

var particles = [];

var particleSys;

var time = [];

var waterclock = new THREE.Clock ();


function main()
{

    init ();

    defineParticles ();

    render ();

}

function init ()
{

    scene = new THREE.Scene();

    var bg_night = new THREE.TextureLoader().load( "./image/bg_night.png" );
    scene.background = bg_night;

    renderer = new THREE.WebGLRenderer ({ antialias: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setClearColor (new THREE.Color (0xffffff, 1.0));
    renderer.setSize (scr.w, scr.h);

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set(0, 0, 5);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    scene.add( new THREE.AmbientLight( 0x333333 ) );
    scene.add( new THREE.HemisphereLight( 0xbbbbbb, 0x111111, 1.1 ) );

}

function defineParticles ()
{
    var loader = new THREE.TextureLoader();

    particleSys = new THREE.Group();
    particleSys.position.set(0,0,0);
    var particlesize = waterfall.w / 4;
    loader.load( "./image/water/drop.png",function(ttexture){
        ttexture.wrapS = ttexture.wrapT = THREE.RepeatWrapping;
        ttexture.format = THREE.RGBAFormat;
        ttexture.repeat.set( 1, 1 );
        for (var p = 0; p < particleCount; p++)
        {
            var material = new THREE.MeshPhongMaterial( {
                color: 0x99daf0,
                //color: 0x000000,
                side: THREE.DoubleSide,
                map: ttexture,
                transparent: true,
                size: 1,
                sizeAttenuation: true
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
            //particles[p].position.set(0,0,0);
            particles[p].velocity = new THREE.Vector3 (0, (1-p/particleCount)*gAccel*3, 0);
            particles[p].receiveShadow = false;
            particleSys.add(particles[p]);
        }
    });

    //particleSys.visible = true;
    scene.add (particleSys);
    waterclock.start ();
}

function render ()
{
    if(particles[0]){
        fallingParticlesMgr ();
    }
    renderer.render (scene, camera);

    requestAnimationFrame (render);

}

function fallingParticlesMgr ()
{
    var pCount = particleCount;

    while (pCount--)
    {
        var elapsed = 1/300;

        if (particles[pCount].position.y < waterfall.l)
        {
            elapsed = pCount/particleCount * 3;
            //var newNum = new Number(elapsed);
            //newNum.toFixed(1);
            //elapsed = elapsed - newNum;
            particles[pCount].position.y = waterfall.h;
            particles[pCount].velocity.y = elapsed * gAccel;
            particles[pCount].material.opacity = 1;
        }
        else
        {
            particles[pCount].velocity.y += gAccel * elapsed;
            particles[pCount].position.y += (1/2) * particles[pCount].velocity.y * elapsed;
            particles[pCount].material.opacity =  1 - (waterfall.h - particles[pCount].position.y)
            /(waterfall.h -  waterfall.l);
        }
    }

}

function applyTex (location, wrappingX, wrappingY)
{

    var texName;


    texName = THREE.ImageUtils.loadTexture (location);
    texName.wrapS = texName.wrapT = THREE.RepeatWrapping;
    texName.repeat.set (wrappingX, wrappingY);

    return texName;

}

